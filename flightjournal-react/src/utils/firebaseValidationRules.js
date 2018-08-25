{
    "rules": {
      ".read": "auth != null",
      ".write": "auth != null",
        
        "Flights": {
					"$Flights":{
            ".validate": "newData.hasChildren(['pilot',
                          'pilotId',
                          'date',
                          'startplace',
                          'landingplace',
                          'flighttime',
                          'xcdistance',
                          'maxaltitude',
                          'heightgain',
                          'maxclimb',
                          'startingtime',
                          'distance',
                          'description',
              						'imgUrl',
                          'imgName',
                          'syrideLink',
                          'xcontestLink',
                          'airtribuneLink',
                          'weatherFoehndiagramm',
                          'weatherWindBoden',
                          'weatherWind800m',
                          'weatherWind1500m',
                          'weatherWind3000m',
                          'weatherRegtherm',
                          'weatherFronten',
                          'weatherSoaringmeteo',
                          'weatherBisendiagramm',
                          'rating'])",
           "date": {
               ".validate": "newData.val().length > 0 && newData.val().length <= 10 "
            },
            "startplace": {
                ".validate": "newData.val().length > 0 && newData.isString() && newData.val().length < 100"
            },
            "landingplace": {
                ".validate": "newData.val().length > 0 && newData.isString()"
            },
            "flighttime": {
                ".validate": "newData.val() > 0 && newData.isNumber()"
            },
            "description": {
                ".validate": "newData.val().length > 0 && newData.isString() && newData.val().length < 5000"
            },
            "xcdistance": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 10"
            },
            "pilotId": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 100"
            },
            "maxaltitude": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 10"
            },
            "heightgain": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 10"
            },
            "maxclimb": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 10"
            },
            "startingtime": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 100"
            },
            "distance": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 50"
            },
            "syrideLink": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 100"
            },
            "xcontestLink": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 100"
            },
            "airtribuneLink": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 100"
            },
            "weatherFoehndiagramm": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 100"
            },
            "weatherWindBoden": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 100"
            },
            "weatherWind800m": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 100"
            },
            "weatherWind1500m": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 100"
            },
            "weatherWind3000m": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 100"
            },
            "weatherRegtherm": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 100"
            },
            "weatherFronten": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 100"
            },
            "weatherSoaringmeteo": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 100"
            },
            "weatherBisendiagramm": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 100"
            },
            "rating": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 10"
            },
          }
        }
    }
  }