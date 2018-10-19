module.exports = {

	"db":
    {
        "name": "photographer_tracker",
        "database": "heroku_vv81tdw3",
        "connector": "mongodb",
        "url": process.env.MONGOLAB_URI || "mongodb://heroku_vv81tdw3:84opvdkvt4cdupi430c20v0qlq@ds137003.mlab.com:37003/heroku_vv81tdw3",
        "host": "ds137003.mlab.com",
        "port": process.env.PORT || 3000,
        "username": "heroku_vv81tdw3",
        "user": "heroku_vv81tdw3",
        "password": "84opvdkvt4cdupi430c20v0qlq"
    }
}
