import math

from flask import Flask, request
from flask_restful import Api, Resource, reqparse
import psycopg2

app = Flask(__name__)
api = Api(app)

stations = []
users = []
matches = []

conn = None


class Station:
    def __init__(self, station_id, direction, stop_name, station_name, accessible, red, blue, green, brown, purple, purple_exp, yellow, pink, orange, latitude, longitude):
        self.station_id = station_id
        self.direction = direction
        self.stop_name = stop_name
        self.station_name = station_name
        self.accessible = accessible
        self.red = red
        self.blue = blue
        self.green = green
        self.brown = brown
        self.purple = purple
        self.purple_exp = purple_exp
        self.yellow = yellow
        self.pink = pink
        self.orange = orange
        self.latitude = latitude
        self.longitude = longitude


class User:
    def __init__(self, user_id, name, email, password, is_helper, need_accessibility):
        self.user_id = user_id
        self.email = email
        self.password = password
        self.name = name
        self.is_helper = is_helper
        self.need_accessibility = need_accessibility
        self.latitude = None
        self.longitude = None
        self.match = None


def initialize_stations(stations):
    f = open("CTA_-_System_Information_-_List_of__L__Stops.csv", "r")
    f_lines = f.readlines()

    for f_line in f_lines[1:]:
        f_line_items = f_line.split(",")
        stations.append(Station(int(f_line_items[0]), f_line_items[1], f_line_items[2], f_line_items[3], f_line_items[6] == "true", f_line_items[7] == "true", f_line_items[8] == "true", f_line_items[9] == "true", f_line_items[10] == "true",
                                f_line_items[11] == "true", f_line_items[12] == "true", f_line_items[13] == "true", f_line_items[14] == "true", f_line_items[15] == "true", float(f_line_items[16].split(",")[0][2:]), float(f_line_items[16].split(",")[1][1:-2])))


def get_station_distance(station, latitude, longitude):
    return math.sqrt((latitude - station.latitude) ** 2 + (longitude - station.longitude) ** 2)


def get_user_distance(user1, user2):
    return math.sqrt((user1.latitude - user2.latitude) ** 2 + (user1.longitude - user2.longitude) ** 2)


def get_closest_station(stations, latitude, longitude):
    closest = stations[0]
    for station in stations:
        if get_station_distance(station, latitude, longitude) < get_station_distance(closest, latitude, longitude):
            closest = station
    return closest


def read_users(users, rows):
    for row in rows:
        add_user(users, row)


def add_user(users, row):
    users.append(User(int(row[0]), row[1], row[2],
                      row[3], row[5] == "1", row[6] == "1"))


def find_nearest_helper(users, helpee, excluded):
    closest = None
    for user in users:
        if user not in excluded and user.is_helper:
            if closest is None:
                closest = user
            elif get_user_distance(user, helpee) < get_user_distance(closest, helpee):
                closest = user
    return closest


def match_helper(users, helpee):
    if helpee.is_helper:
        print("Not a helpee!")
        return

    helper = None
    confirm = False
    excluded = []
    while not confirm:
        helper = find_nearest_helper(users, helpee, excluded)
        # TODO ask helper if they want to help and store the result in confirm
        confirm = True
        if not confirm:
            excluded.append(helper)

    return helper


def search_user_email(users, email):
    for user in users:
        if user.email == email:
            return user


def fillInUsers():
    try:
        print("Connecting to the PostGreSQL database...")
        conn = psycopg2.connect("dbname=tafed user=tafed password=tafed")
        cur = conn.cursor()
        sql = "SELECT * FROM users"
        cur.execute(sql)
        row = cur.fetchall()
        # while row is not None:
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
                pass  # TODO fuck
            else:
                pass  # TODO fuck
        else:
            email = "george@example.com"
            match = match_helper(users, search_user_email(users, email))
            if match is None:
                pass  # TODO fuck
            else:
                matches.append((search_user_email(users, email), match))
                search_user_email(users, email).match = match
                # TODO fuck


class Matched_handler(Resource):
    def get(self):
        helper = request.args.getlist('helper')
        if helper == "1":
            email = "joe@example.com"
            for m in matches:
                if m[0] == search_user_email(users, email):
                    match = m[1]
            # TODO fuck
        else:
            email = "george@example.com"
            for m in matches:
                if m[1] == search_user_email(users, email):
                    match = m[0]
            # TODO fuck


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
