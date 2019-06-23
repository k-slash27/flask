from flask import Flask, render_template, abort, request, jsonify
from flaski.models import Fatigue
from flaski.db import db_session
from datetime import datetime
import json

app = Flask(__name__)
app.config['DEBUG'] = True


@app.route("/")
def hello():
    return render_template("index.html")

@app.route('/fetchPos', methods=['POST'])
def lower_conversion():
    data = request.json['enra']
    if data is None:
        abort(404)
    # fetch last index
    recent_data = Fatigue.query.order_by(Fatigue.id.desc()).first()
    # insert enra data
    db_session.add(Fatigue(data))
    db_session.commit()
    # calc degree (mock)
    degree = (data - recent_data.degree) * 100
    return_data = {"result":degree}
    return jsonify(ResultSet=json.dumps(return_data))

if __name__ == "__main__":
    # start web server
    app.run()
