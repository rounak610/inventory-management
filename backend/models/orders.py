from sqlalchemy import Column, Integer, String, Boolean, DateTime
from main import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    item_id = Column(String)
    student_id = Column(String)
    student_name = Column(Boolean)
    issue_date = Column(DateTime)
    return_date = Column(DateTime)
