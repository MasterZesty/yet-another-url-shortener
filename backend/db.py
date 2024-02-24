# Database connection and configuration

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

class DB:
    def __init__(self, db_url):
        Base = declarative_base()
        self.engine = create_engine(db_url)
        Base.metadata.create_all(self.engine)
        Session = sessionmaker(bind=self.engine)
        self.session = Session()

    def close_connection(self):
        self.session.close()