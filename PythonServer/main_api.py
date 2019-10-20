import math
from PythonServer.station import Station
from PythonServer.user import User

def initialize_stations(stations):
    f = open("CTA_-_System_Information_-_List_of__L__Stops.csv", "r")
    f_lines = f.readlines()

    for f_line in f_lines[1:]:
        f_line_items = f_line.split(",")
        stations.append(Station(int(f_line_items[0]), f_line_items[1], f_line_items[2], f_line_items[3], f_line_items[6] == "true", f_line_items[7] == "true", f_line_items[8] == "true", f_line_items[9] == "true", f_line_items[10] == "true", f_line_items[11] == "true", f_line_items[12] == "true", f_line_items[13] == "true", f_line_items[14] == "true", f_line_items[15] == "true", float(f_line_items[16].split(",")[0][2:]), float(f_line_items[16].split(" ")[1][:-2])))

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

def read_users():
    # TODO Read users from database into users
    return

def add_user(row):
    # TODO figure out how to parse this shit
    return

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
