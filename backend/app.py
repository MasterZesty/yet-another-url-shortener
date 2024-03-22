from flask import Flask, request, jsonify
from db import DB
from models import ShortenedURL
from sqlalchemy.exc import IntegrityError
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)
CORS(app)

# swagger stuff

SWAGGER_URL="/swagger"
API_URL="/static/swagger.json"
BACKEND_HOSTNAME = "http://127.0.0.1"
BACKEND_PORT = "5000"
FRONTEND_HOSTNAME = "http://127.0.0.1"
FRONTEND_PORT = "3000"


swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': 'Access API'
    }
)

app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)



DB_URI = "sqlite:///url_shortner.db"
db = DB(DB_URI)

@app.route("/api/v1/shorten", methods=['POST'])
def shorten_url():
    """shortens a url.
    """

    data = request.get_json()

    url = data.get("original_url")
    alias = data.get("custom_alias")

    if url and alias:
        try:
            new_url = ShortenedURL(original_url=url, short_code=alias)
            db.session.add(new_url)
            db.session.commit()
        except IntegrityError as e:
            # print(f"Error: {e}")
            db.session.rollback()
            shorten_url = {
                "status": "error",
                "data": "null",
                "message": "please provide another custom_alias. this one already taken"
                }

            return jsonify(shorten_url), 406

        except Exception as e:
            # print(f"Error: {e}")
            db.session.rollback()
            shorten_url = {
                "status": "error",
                "data": "null",
                "message": "unknown error please contact support"
                }

            return jsonify(shorten_url), 503

        shorten_url = {
            "status": "success",
            "data": {
                "url": f"{FRONTEND_HOSTNAME}:{FRONTEND_PORT}/{alias}",
                "alias": alias
            },
            "message": "null"
            }

        return jsonify(shorten_url), 201

    shorten_url = {
        "status": "error",
        "data": "null",
        "message": "please provide original_url and custom_alias parameters"
    }

    return jsonify(shorten_url), 400

@app.route("/api/v1/alias_available/<custom_alias>", methods=['GET'])
def alias_available(custom_alias: str):
    """custom alias availability check
    """

    res = db.session.query(ShortenedURL).filter_by(short_code=custom_alias).first()

    if res:
        is_alias_available = {
            "status": "success",
            "data": {
                "is_alias_available" : "true"
            },
            "message": "null"
        }

        return jsonify(is_alias_available), 200

    is_alias_available = {
        "status": "success",
        "data": {
            "is_alias_available" : "false"
        },
        "message": "null"
    }

    return jsonify(is_alias_available), 200

@app.route("/api/v1/expand", methods=["GET"])
def expand_url():
    """"expand custom alias to original url
    """
    
    alias = request.args.get('custom_alias')
    
    result = db.session.query(ShortenedURL).filter_by(short_code=alias).first()
    
    if result:
        resdict = {column.name: getattr(result, column.name) for column in result.__table__.columns}
        
        expand_url = {
            "status": "success",
            "data": {
                "redirct_url" : resdict.get("original_url")
            },
            "message": "null"
        }

        return jsonify(expand_url), 200

    expand_url = {
        "status": "error",
        "data": {
            "redirect_url" : ""
        },
        "message": "url with magic code does not exist"
    }

    return jsonify(expand_url), 404



if __name__ == "__main__":
    app.run(debug=True)