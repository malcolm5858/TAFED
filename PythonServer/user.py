class User:
    def __init__(self, user_id, email, password, name, is_helper, need_accessibility, latitude, longitude):
        self.user_id = user_id
        self.email = email
        self.password = password
        self.name = name
        self.is_helper = is_helper
        self.need_accessibility = need_accessibility
        self.latitude = latitude
        self.longitude = longitude
