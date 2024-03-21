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

@router.get("/fetch_item_by_name/{item_name}")
def fetch_item_by_id(item_name: str):
    item = db.session.query(Item).filter(Item.item_name == item_name).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        return {"item_id": item.item_id, "item_name": item.item_name, "status": item.status, "order_id": item.order_id}

@router.get("/fetch_all_left_items")
def fetch_all_left_items():
    items = db.session.query(Item).filter(Item.status == False).all()
    if items is None:
        raise HTTPException(status_code=404, detail="No items found")
    else:
        item_list = []
        for item in items:
            if item.status == False:
                item_list.append({"item_id": item.item_id, "item_name": item.item_name, "status": item.status, "order_id": item.order_id})
        return item_list

@router.post("/update_item/{item_id}")
def update_item(item_id: str, item_data: ItemData):
    item = db.session.query(Item).filter(Item.item_id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        item.item_name = item_data.item_name
        item.status = item_data.status
        item.order_id = item_data.order_id
        db.session.commit()
        return {"message": "Item updated successfully"}

@router.delete("/delete_item/{item_id}")
def delete_item(item_id: str):
    item = db.session.query(Item).filter(Item.item_id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        db.session.delete(item)
        db.session.commit()
        return {"message": "Item deleted successfully"}