from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_sqlalchemy import DBSessionMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import yaml


with open("config.yaml", "r") as f:
    config = yaml.safe_load(f)

db_user_name = config["db_user_name"]
db_user_password = config["db_user_password"]
db_name = config["db_name"]
SQLALCHEMY_DATABASE_URL = f"postgresql://{db_user_name}:{db_user_password}@localhost/{db_name}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

from backend.controllers.items import router as item_router
from backend.controllers.orders import router as order_router

app = FastAPI()

app.add_middleware(DBSessionMiddleware, db_url=SQLALCHEMY_DATABASE_URL)
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(item_router, prefix="/items")
app.include_router(order_router, prefix="/orders")

@app.get("/")
def read_root():
    return "Server is running....."

# ---------------------To run-------------------------
# uvicorn main:app --host 0.0.0.0 --port 3000 --reload