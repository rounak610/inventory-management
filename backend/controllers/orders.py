from datetime import datetime
from fastapi import APIRouter
from fastapi import HTTPException
from fastapi_sqlalchemy import db
from pydantic import BaseModel
from sqlalchemy import func
from backend.models.items import Item
from backend.models.orders import Order

router = APIRouter()

class OrdersData(BaseModel):
    item_name: str
    student_id: str
    student_name: str


@router.post("/issue_item")
def issue_item(data: OrdersData):
    print(data.item_name)
    item = db.session.query(Item).filter(func.lower(Item.item_name) == data.item_name.lower()).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        if item.status == True:
            order_id = item.order_id
            order = db.session.query(Order).filter(Order.id == order_id).first()
            raise HTTPException(status_code=404, detail=f"Item already issued by {order.student_name} (ID: {order.student_id}) on {order.issue_date}")
        else:
            order = Order(item_id=item.item_id, student_id=data.student_id, student_name=data.student_name, issue_date=datetime.now())
            db.session.add(order)
            db.session.commit()

            item.status = True
            item.order_id = order.id
            db.session.commit()
            return {"message": "Item issued successfully"}
        
@router.post("/return_item")
def return_item(data: OrdersData):
    item = db.session.query(Item).filter(Item.item_name == data.item_name).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    else:
        if item.status == False:
            raise HTTPException(status_code=404, detail="Item already in stock")
        else:
            order_id = item.order_id
            order = db.session.query(Order).filter(Order.id == order_id).first()
            if order.student_id != data.student_id or order.student_name != data.student_name:
                raise HTTPException(status_code=404, detail="Item not issued to this student")
            order.return_date = datetime.now()
            item.status = False
            item.order_id = "-1"
            db.session.commit()
            return {"message": "Item returned successfully"}