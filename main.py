from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from backend.models.base_model import DBBaseModel

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:new_password@localhost/inventory_management"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


from backend.controllers.items import router as item_router
from backend.controllers.orders import router as order_router

app = FastAPI()
app.add_middleware(DBSessionMiddleware, db_url=SQLALCHEMY_DATABASE_URL)


app.include_router(item_router, prefix="/items")
app.include_router(order_router, prefix="/orders")

@app.get("/")
def read_root():
    return "Server is running....."

# # __________________TO RUN____________________________
# # uvicorn main:app --host 0.0.0.0 --port 3000 --reload
