from fastapi import APIRouter
from fastapi import HTTPException
from fastapi_sqlalchemy import db
from pydantic import BaseModel
from backend.models.items import Item
from backend.models.orders import Order

router = APIRouter()

class ItemData(BaseModel):
    item_id: str
    item_name: str
    total_quantity: int

class UpdateItem(BaseModel):
    old_item_name: str
    new_item_name: str
    new_total_quantity: int

@router.post("/create_item")
def add_item(item_data:ItemData):
    item = Item(item_id=item_data.item_id, item_name=item_data.item_name, status=False, order_id="-1", total_quantity=item_data.total_quantity, available=item_data.total_quantity)
    db.session.add(item)
    db.session.commit()
    return {"message": "Item created successfully"}

@router.get("/fetch_item_by_name/{item_name}")
def fetch_item_by_name(item_name: str):
    item = db.session.query(Item).filter(Item.item_name == item_name).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found in database.")
    elif item.status == True:
        order_id = item.order_id
        order = db.session.query(Order).filter(Order.id == order_id).first()
        raise HTTPException(status_code=404, detail=f"Item already issued to {order.student_name} (ID: {order.student_id}) on {order.issue_date}")
    else:
        return {"item_id": item.item_id, "item_name": item.item_name, "status": "Not issued to anyone."}

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

@router.post("/update_item")
def update_item(data: UpdateItem):
    item = db.session.query(Item).filter(Item.item_name == data.old_item_name).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        item.item_name = data.new_item_name
        item.total_quantity = data.new_total_quantity
        item.available = data.new_total_quantity
        db.session.commit()
        return {"message": "Item updated successfully"}

@router.post("/delete_item")
def delete_item(data: ItemData):
    item = db.session.query(Item).filter(Item.item_id == data.item_id, Item.item_name==data.item_name).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        db.session.delete(item)
        db.session.commit()
        return {"message": "Item deleted successfully"}