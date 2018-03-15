from flask import Flask
from flask_cors import CORS
from flask_restful import Resource, Api, reqparse
import json

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('city')
parser.add_argument('year')
parser.add_argument('month')


class HelloWorld(Resource):
    def get(self):
        args = parser.parse_args()
        city = args['city']
        year = args['year']
        month = args['month']
        try:
            with open('./data/{}.json'.format(city.lower()), 'r') as f:
                data = json.load(f)
            return {
                'city': city,
                'data': data[year][month]
                }
        except:
            return {}

api.add_resource(HelloWorld, '/api/aqi')

if __name__ == '__main__':
    app.run(debug=True)
