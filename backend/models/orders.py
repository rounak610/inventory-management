from sqlalchemy import Column, Integer, String, Boolean, DateTime
from backend.models.base_model import DBBaseModel

class Order(DBBaseModel):
    __tablename__ = 'orders'

    id = Column(Integer, primary_key=True)
    item_id = Column(String)
    student_id = Column(String)
    student_name = Column(String) 
    issue_date = Column(DateTime)
    return_date = Column(DateTime)
