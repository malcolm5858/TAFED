from flask import Flask, request
from flask_restful import Api, Resource, reqparse
import psycopg2
#from main_api import *

app = Flask(__name__)
api = Api(app)

stations = []
users = []

conn = None
def fillInUsers():
    try:
        print("Connecting to the PostGreSQL database...")
        conn = psycopg2.connect("dbname=tafed user=tafed password=tafed")
        users = []
        cur = conn.cursor()
        sql = "SELECT * FROM users"
        cur.execute(sql)
        row = cur.fetchone()
        while row is not None:
            print(row)
            users.append(row)
        cur.close()

    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print("Database Connection Closed.")    

class User_handler(Resource):
    def get(self):
        rowTuple = None
        email = request.args.getlist('email')
        password = request.args.getlist('password')
        try:
            found = False

            #Connect to server
            print("Connecting to the PostGreSQL database...")
            conn = psycopg2.connect("dbname=tafed user=tafed password=tafed")

            cur = conn.cursor()
            sql = "SELECT * FROM USERS WHERE email =%s and password =%s"
            cur.execute(sql, (str(email), str(password)))
            row = cur.fetchone()
            print(str(email))
            print(row[0])
            if row is not None:
                found = True
                rowTuple = row
            #fillInUsers()
            print(users)
            cur.close()
        except(Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()
                print("Database Connection Closed.")
            if found == True:
                return rowTuple, 200
            else:
                return "User not found", 404

    def post(self):
        rowTuple = None
        email = request.args.getlist('email')
        password = request.args.getlist('password')
        name = request.args.getlist('name')
        ishelper = request.args.getlist('ishelper')
        needsaccessibility = request.args.getlist('needsaccessibility')
        try:
            exists = 0

            #Connect to server
            print("Connecting to the PostGreSQL database...")
            conn = psycopg2.connect("dbname=tafed user=tafed password=tafed")
            cur = conn.cursor()
            sql = "SELECT email FROM users WHERE email =%s"
            cur.execute(sql, (email))
            row = cur.fetchone()
            if row is not None:
                exists = 1
                

            #Find the id
            idVal = 1
            sql = "SELECT * FROM users"
            cur.execute(sql)
            row = cur.fetchone()
            while row is not None:
                idVal = idVal + 1
                row = cur.fetchone()

            sql = "INSERT INTO users VALUES (%s,%s,%s,%s,%s,%s)"
            cur.execute(sql, (str(idVal), str(name), str(email), str(password), str(ishelper), str(needsaccessibility)))
            print(email)
            conn.commit()
            sql = "SELECT * FROM users WHERE email = %s"
            cur.execute(sql, (email))
            row = cur.fetchone()
            rowTuple = row
            cur.close()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()
                print("Database Connection Closed.")
            if exists == 0:
                return rowTuple, 201
            else:
                return "User with name {} already exists".format(name), 400



api.add_resource(User_handler, "/user")


app.run(debug=True)
