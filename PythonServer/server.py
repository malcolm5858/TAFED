from flask import Flask, request
from flask_restful import Api, Resource, reqparse
import psycopg2
from PythonServer.main_api import *

app = Flask(__name__)
api = Api(app)

stations = []
users = []
matches = []

conn = None


def fillInUsers():
    try:
        print("Connecting to the PostGreSQL database...")
        conn = psycopg2.connect("dbname=tafed user=tafed password=tafed")
        cur = conn.cursor()
        sql = "SELECT * FROM users"
        cur.execute(sql)
        row = cur.fetchall()
        #while row is not None:
        #    print(row)
        add_user(users, row)
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

            # Connect to server
            print("Connecting to the PostGreSQL database...")
            conn = psycopg2.connect("dbname=tafed user=tafed password=tafed")

            cur = conn.cursor()
            sql = "SELECT * FROM USERS WHERE email =%s and password =%s"
            print(email)
            cur.execute(sql, (str(email), str(password)))
            row = cur.fetchone()
            print(str(email))
            # print(row[0])
            if row is not None:
                found = True
                rowTuple = row
            fillInUsers()
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

            # Connect to server
            print("Connecting to the PostGreSQL database...")
            conn = psycopg2.connect("dbname=tafed user=tafed password=tafed")
            cur = conn.cursor()
            sql = "SELECT email FROM users WHERE email =%s"
            cur.execute(sql, (email))
            row = cur.fetchone()
            if row is not None:
                exists = 1

            # Find the id
            idVal = 1
            sql = "SELECT * FROM users"
            cur.execute(sql)
            row = cur.fetchone()
            while row is not None:
                idVal = idVal + 1
                row = cur.fetchone()

            sql = "INSERT INTO users VALUES (%s,%s,%s,%s,%s,%s)"
            cur.execute(sql, (str(idVal), str(name), str(email), str(
                password), str(ishelper), str(needsaccessibility)))
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


class Status_handler(Resource):
    def get(self):
        helper = request.args.getlist('helper')
        if helper == "1":
            email = "joe@example.com"
            match_found = False
            for m in matches:
                if m[1] == search_user_email(users, email):
                    match_found = True
                    search_user_email(users, email).match = m[0]
            if match_found:
                pass #TODO fuck
            else:
                pass #TODO fuck
        else:
            email = "george@example.com"
            match = match_helper(users, search_user_email(users, email))
            if match is None:
                pass #TODO fuck
            else:
                matches.append((search_user_email(users, email), match))
                search_user_email(users, email).match = match
                #TODO fuck


class Matched_handler(Resource):
    def get(self):
        helper = request.args.getlist('helper')
        if helper == "1":
            email = "joe@example.com"
            for m in matches:
                if m[0] == search_user_email(users, email):
                    match = m[1]
            #TODO fuck
        else:
            email = "george@example.com"
            for m in matches:
                if m[1] == search_user_email(users, email):
                    match = m[0]
            #TODO fuck


api.add_resource(User_handler, "/user")
api.add_resource(Status_handler, "/status")
api.add_resource(Matched_handler, "/matched")

initialize_stations(stations)

conn = None
try:
    conn = psycopg2.connect("dbname=tafed user=tafed password=tafed")
    cur = conn.cursor()
    sql = "SELECT * FROM users"
    cur.execute(sql)
    rows = cur.fetchall()
    read_users(users, rows)
    cur.close()
except(Exception, psycopg2.DatabaseError) as error:
    print(error)
finally:
    if conn is not None:
        conn.close()
        print("Database Connection Closed.")

app.run(debug=True)
