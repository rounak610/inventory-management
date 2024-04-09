from sqlalchemy import Column, Integer, String, Boolean
from backend.models.base_model import DBBaseModel

class Item(DBBaseModel):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True)
    item_id = Column(String)
    item_name = Column(String)
    status = Column(Boolean)
    order_id = Column(String)
    total_quantity = Column(Integer)
    available = Column(Integer)
