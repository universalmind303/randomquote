from flask import Flask, send_file, jsonify, request, render_template
from flask_cors import CORS, cross_origin
from flask_pymongo import PyMongo
import os
import pprint
import random
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
app = Flask(__name__)
mongo = PyMongo(app)

@app.route("/")
def send_index():
  return render_template("static/dist/index.html")

@app.route("/api/addquote", methods=['POST'],)
def add_quote():
  try:
    title = request.json['title']
    content = request.json['content']
    mongo.db.quotes.insert_one({
      'title':title, 'content': content
      })
    return jsonify(status="OK", message="inserted successfully")
  except Exception,e:
    return jsonify(status="ERROR", message=str(e))

@app.route("/api/getquotes", methods=["GET"])
@cross_origin()
def get_quotes():
  try:
    qouteColl = []
    for quotes in mongo.db.quotes.find():
      qouteColl.append({"id": str(quotes['_id']), "title": quotes['title']}) 

    if(request.query_string == 'random'):
      return jsonify(random.choice(qouteColl))
    return jsonify(qouteColl)
  except Exception as e:
    return jsonify(status="ERROR", message=str(e))

@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, nothing at this URL.', 404


# make sure this gets disabled before deploying
if __name__ == '__main__':
  app.run(host='0.0.0.0', debug=True)


STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')   















randomlist = [
{'title':"Will Estes", 'content': "I'm into all that sappy stuff - a surprise picnic, nice dinner, or traveling. I'm kind of an old romantic."},
{'title':"Dr. Seuss", 'content': "Don't cry because it's over, smile because it happened."},
{'title':"Marilyn Monroe", 'content': "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. \
But if you can't handle me at my worst, then you sure as hell don't deserve me at my best." },
{"title": "Oscar Wilde", "content": "Be yourself; everyone else is already taken."},
{"title": "Albert Einstein", "content": "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe."},
{"title": "Bernard M. Baruch", "content": "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind."},
{"title": "Frank Zappa", "content": "So many books, so little time."},
{"title": "William W. Purkey", "content": "You've gotta dance like there's nobody watching, \
Love like you'll never be hurt,\
Sing like there's nobody listening,\
And live like it's heaven on earth."},
{"title": "Marcus Tullius Cicero", "content": "A room without books is like a body without a soul."},
{"title": "Dr. Seuss", "content": "You know you're in love when you can't fall asleep because reality is finally better than your dreams."},
{"title": "Mae West", "content": "You only live once, but if you do it right, once is enough."},
{"title": "Mahatma Gandhi", "content": "Be the change that you wish to see in the world."},
{"title": "Robert Frost", "content": "In three words I can sum up everything I've learned about life: it goes on."},
{"title": "J.K. Rowling, Harry Potter and the Goblet of Fire", "content": "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals."},
{"title": "Daniel Readon", "content": "In the long run, the pessimist may be proven right, but the optimist has a better time on the trip."},
{"title": "-Maureen Reagan", "content": "I will feel equality has arrived when we can elect to office women who are as unqualified as some of the men who are already there."},
{"title": "Unknown", "content": "Life is not a journey to the grave with the intention of arriving safely in a pretty and well preserved body, but rather to skid in broadside, thoroughly used up, totally worn out, and loudly proclaiming "},
{"title": "Unknown", "content": "Enjoy life. There's plenty of time to be dead."},
{"title": "Proverb", "content": "A light heart lives long."},
]
