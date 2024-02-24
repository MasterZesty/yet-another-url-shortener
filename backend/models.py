# Defines database models

from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class ShortenedURL(Base):
    __tablename__ = 'shortened_urls'

    id = Column(Integer, primary_key=True)
    original_url = Column(String(255), nullable=False)
    short_code = Column(String(255), nullable=False, unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, original_url, short_code):
        self.original_url = original_url
        self.short_code = short_code

    def __repr__(self):
        return f"<ShortenedURL(short_code='{self.short_code}', original_url='{self.original_url}')>"


# class URLAnalytics(Base):
#     __tablename__ = 'url_analytics'


# class User(Base):
#     __tablename__ = 'users'