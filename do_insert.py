from flaski.db import init_db
from flaski.db import db_session
from flaski.models import Fatigue

arr = [0.154, 0.20, 0.50, 0.35, 0.6]

for a in arr:
    data = Fatigue(a)
    db_session.add(data)

db_session.commit()
