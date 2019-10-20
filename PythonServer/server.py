from flask import Flask
from flask_restful import Api, Resource, reqparse
import psycopg2
from PythonServer.main import *

app = Flask(__name__)
api = Api(app)

conn = None
def connect():
    """Connect to the PostGreSQL Database Server"""
    
    try:
        #Connect to server
        print("Connecting to the PostGreSQL database...")
        conn = psycopg2.connect("dbname=tafed user= password=60616")

        #create cursor
        cur = conn.cursor()

        #execute a statement
        print("PostgreSQL database version:")
        cur.execute("SELECT version()")

        #Display the PostgreSQL database server version
        db_version = cur.fetchone()
        print(db_version)

        #close the communication with the PostgreSQL
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)


def disconnect():
    if conn is not None:
        conn.close()
        print("Database Connection Closed.")


class User_handler(Resource):
    def get(self, email, password):
        try:
            found = False
            connect()
            cur = conn.cursor()
            sql = "SELECT * FROM USERS WHERE email =%s and password =%s"
            cur.execute(sql, (email, password))
            row = cur.fetchone()
            if row is not None:
                found = True
            cur.close()
        except(Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            disconnect()
            if found == True:
                return row, 200
            else:
                return "User not found", 404

    def post(self, email, password, name, ishelper, needsaccessibility):
        connect()
        cur = conn.cursor()
        sql = "SELECT email FROM users WHERE email =%s"
        cur.execute(sql, email)
        row = cur.fetchone()
        if row is not None:
            cur.close()
            disconnect()
            return "User with name {} already exists".format(name), 400

        #Find the id
        idVal = 1
        sql = "SELECT * FROM users"
        cur.execute(sql)
        row = cur.fetchone()
        while row is not None:
            idVal = idVal + 1
            row = cur.fetchone()

        #are they a helper or helpee, if helper, they do not need accessibility

        sql = "INSERT INTO users(ID, email, password, name, ishelper, needsaccessibility) VALUES (%d,%s,%s,%s)"
        cur.execute(sql, (id, email, password, name, ishelper, needsaccessibility))

        sql = "SELECT * FROM users WHERE email = %s"
        cur.execute(sql, email)
        row = cur.fetchone()

        cur.close()
        disconnect()
        return row, 201



api.add_resource(User_handler, "/user/<string:email><string:password><string:name><int:ishelper><int:needsaccessibility>")

class location_handler(Resource):
    def get(self, email, latitude, longitude):


app.run(debug=True)
