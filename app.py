from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route("/api/v1/shorten", methods=['POST'])
def shorten_url():
    '''
    shortens a url.
    '''
    data = request.get_json()

    url = data.get("original_url")
    alias = data.get("custom_alias")

    if url and alias:
        shorten_url = {
            "status": "success",
            "data": {
                "url": url,
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
    '''
    custom alias availability check
    '''

    is_alias_available = {
        "status": "success",
        "data": {
            "is_alias_available" : "true"
        },
        "message": "null"
    }

    return jsonify(is_alias_available), 200