from flask import Flask, request, render_template, make_response, jsonify
from flask_pymongo import PyMongo
from requests import Requests
import json

app = Flask(__name__, static_folder="../static/dist",
            template_folder="../static")
app.config['MONGO_DBNAME'] = 'songs'
app.config['MONGO_URI'] = 'mongodb://yousician:thereal1@ds137650.mlab.com:37650/songs'
mongo = PyMongo(app)
requests = Requests(mongo=mongo)


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.route('/')
def index():
    try:
        # with open('songs.json', 'r') as f:
        #     comments = json.loads(f.read())
        #     songs = mongo.db.songs_collection.insert_many(comments)
        return render_template('index.html')
    except Exception:
        abort(404)


@app.route('/songs')
def get():
    return requests.get()


@app.route('/songs/rating/song_id', methods=['POST'])
def update_songs_rating():
    return requests.update_songs_rating()


@app.route('/songs/avg/difficulty', methods=['GET'])
def getDifficultyAverage():
    return requests.getDifficultyAverage()


if __name__ == "__main__":
    app.run(debug=True)
