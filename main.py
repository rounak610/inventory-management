from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from backend.models.base_model import DBBaseModel

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:new_password@localhost/inventory_management"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
DBBaseModel.metadata.create_all(bind=engine)
app = FastAPI()


# # __________________TO RUN____________________________
# # uvicorn main:app --host 0.0.0.0 --port 3001 --reload
