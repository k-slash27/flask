from sqlalchemy import Column, Integer, Float, String, Text, DateTime
from flaski.db import Base
from datetime import datetime

class Fatigue(Base):
    __tablename__ = 'fatigue'
    id = Column(Integer, primary_key=True)
    degree = Column(Float)
    date = Column(DateTime, default=datetime.now())

    def __init__(self, degree=None, date=None):
        self.degree = degree
        self.date = date

    def __repr__(self):
        return '<degree %r>' % (self.degree)
