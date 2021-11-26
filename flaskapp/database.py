from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:ywtg.9819@localhost/robot'
# SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:ywtg.9819@localhost:5434/robot'

engine = create_engine(
    SQLALCHEMY_DATABASE_URI
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()