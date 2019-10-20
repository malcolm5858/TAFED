from flask import Flask
from flask_restful import Api, Resource, reqparse
import psycopg2

app = Flask(__name__)
api = Api(app)

conn = None
def connect(connection):
    """Connect to the PostGreSQL Database Server"""
    
    try:
        #Connect to server
        print("Connecting to the PostGreSQL database...")
        connection = psycopg2.connect("dbname=tafed user= password=60616")

        #create cursor
        cur = connection.cursor()

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


def disconnect(connection):
    if connection is not None:
        connection.close()
        print("Database Connection Closed.")


class HTTP_handler(Resource):
    def get(self, email, password, connection):
        try:
            found = False
            connect(conn)
            cur = connection.cursor()
            sql = "SELECT * FROM USERS WHERE email =%s and password =%s"
            cur.execute(sql, (email, password))
            row = cur.fetchone()
            if row is not None:
                found = True
            cur.close()
        except(Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            disconnect(conn)
            if found == True:
                return row, 200
            else:
                return "User not found", 404

    def post(self, email, password, name, connection):
        connect(conn)
        cur = connection.cursor()
        sql = "SELECT email FROM users WHERE email =%s"
        cur.execute(sql, email)
        row = cur.fetchone()
        if row is not None:
            cur.close()
            disconnect(conn)
            return "User with name {} already exists".format(name), 400

        #Find the id
        idVal = 1
        sql = "SELECT * FROM users"
        cur.execute(sql)
        row = cur.fetchone()
        while row is not None:
            idVal = idVal + 1
            row = cur.fetchone()

        sql = "INSERT INTO users(ID, email, password, name) VALUES (%d,%s,%s,%s)"
        cur.execute(sql, (id, email, password, name))

        sql = "SELECT * FROM users WHERE email = %s"
        cur.execute(sql, email)
        row = cur.fetchone()

        cur.close()
        disconnect(conn)
        return row, 201



api.add_resource(HTTP_handler, "/user/<string:name>")

app.run(debug=True)
