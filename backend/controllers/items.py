from fastapi import APIRouter
from fastapi import HTTPException
from fastapi_sqlalchemy import db
from pydantic import BaseModel
from backend.models.items import Item

router = APIRouter()

class ItemData(BaseModel):
    item_id: str
    item_name: str
    status: bool
    order_id: str

@router.post("/create_item")
def add_item(item_data:ItemData):
    item = Item(item_id=item_data.item_id, item_name=item_data.item_name, status=item_data.status, order_id=item_data.order_id)
    db.session.add(item)
    db.session.commit()
    return {"message": "Item created successfully"}

@router.get("/fetch_item_by_id/{item_id}")
def fetch_item_by_id(item_id: str):
    item = db.session.query(Item).filter(Item.item_id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        return {"item_id": item.item_id, "item_name": item.item_name, "status": item.status, "order_id": item.order_id}


