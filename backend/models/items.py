from sqlalchemy import Column, Integer, String, Boolean
from main import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True)
    item_id = Column(String)
    item_name = Column(String)
    status = Column(Boolean)
    order_id = Column(String)
