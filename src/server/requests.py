from flask import Flask, request, render_template, Response, jsonify, abort
from flask_pymongo import PyMongo
from bson.json_util import dumps, loads
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from pymongo.errors import ServerSelectionTimeoutError, OperationFailure


class Requests:
    def __init__(self, mongo=None):
        self.mongo = mongo

    def get(self):
        array = []
        try:
            songs_collection = self.mongo.db.songs_collection.find()
            for song in songs_collection:
                array.append({
                    'title': song['title'],
                    'level': song['level'],
                    'artist': song['artist'],
                    '_id': str(song['_id']),
                    'rating': song['rating'],
                    'released': song['released'],
                    'difficulty': song['difficulty']
                })
            return Response(dumps(array), status=200,
                            mimetype='application/json')
        except Exception:
            abort(500)

    def update_songs_rating(self):
        try:
            songs_collection = self.mongo.db.songs_collection
            song = songs_collection.find_one_and_update(
                {'_id': ObjectId(request.args['_id'])}, {
                    "$set": {'rating': float(request.args.get('rating'))}},
                return_document=ReturnDocument.AFTER, upsert=False
            )
            return Response({}, 204)
        except Exception:
            abort(500)

    def getDifficultyAverage(self):
        array = []
        songs_collection = self.mongo.db.songs_collection
        levelSongs = songs_collection.find(
            {'level': int(request.args['level'])})
        for doc in levelSongs:
            array.append(doc['difficulty'])

        average = round(sum(array) / len(array), 2)
        return Response(dumps(average), status=200,
                        mimetype='application/json')
