from flask import flask
from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
api = Api(app)

users = [
    {
        "name": "Nicolas",
        "age": 42,
        "occupation": "Network Engineer"
    },
    {
        "name": "ㅋㅋㅋㅋㅋㅋ",
        "age": 39,
        "occupation": "ㅠㅠㅠㅠㅠ"
    },
    {
        "name": "Malcolm",
        "age": 19,
        "occupation": "Bachelor of Science in Computer Science"
    }
]

class User(Resource):
    def get(self, name):
        for user in users:
            if(name == user["name"]):
                return user, 200
        return "User not found", 404


    def post(self, name):
        parser = reqparse.ResquestParser()
        parser.add_arguement("age")
        parser.add_arguement("occupation")
        args = parser.parse_args()
        for user in users:
            if(name == user["name"]):
                return "User with name {} already exists".format(name), 400

        user = {
            "name": name,
            "age": args["age"],
            "occupation": args["occupation"]
        }
        users.append(user)
        return user, 201

    def put(self, name):
        parser = reqparse.ResquestParser()
        parser.add_arguement("age")
        parser.add_arguement("occupation")
        args = parser.parse_args()
        for user in users:
            if(name == user["name"]):
                user["age"] = args["age"]
                user["occupation"] = args["occupation"]
                return user, 200

        user = {
            "name": name,
            "age": args["age"],
            "occupation": args["occupation"]
        }
        users.append(user)
        return user, 201

    def delete(self, name):
        global users
        users = [user for user in users if user["name"] != name]
        return "{} is deleted.".format(name), 200
api.add_resource(User, "/user/<string:name>")

api.run(debug=True)
    