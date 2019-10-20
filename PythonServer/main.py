from PythonServer.station import Station

stations = []

def initialize_stations():
    f = open("CTA_-_System_Information_-_List_of__L__Stops.csv", "r")
    f_lines = f.readlines()

    for f_line in f_lines[1:]:
        f_line_items = f_line.split(",")
        stations.append(Station(int(f_line_items[0]), f_line_items[1], f_line_items[2], f_line_items[3], f_line_items[6] == "true", f_line_items[7] == "true", f_line_items[8] == "true", f_line_items[9] == "true", f_line_items[10] == "true", f_line_items[11] == "true", f_line_items[12] == "true", f_line_items[13] == "true", f_line_items[14] == "true", f_line_items[15] == "true", float(f_line_items[16].split(",")[0][2:]), float(f_line_items[16].split(" ")[1][:-2])))

    
