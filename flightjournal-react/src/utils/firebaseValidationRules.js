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
                          'maxsink',
                          'startingtime',
                          'distance',
                          'description',
              						'imgUrl',
                          'imgName',
                          'paraglider',
                          'syrideLink',
                          'xcontestLink',
                          'airtribuneLink',
                          'weatherDescription',
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
            "paraglider": {
                ".validate": "newData.val().length == 0 || newData.isString() && newData.val().length < 100"
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
              "maxsink": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 10"
            },
            "startingtime": {
                ".validate": "newData.val() > 0 || newData.isNumber()"
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
            "weatherDescription": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 5000"
            },
            "rating": {
                ".validate": "newData.val().length == null || newData.isString() && newData.val().length < 10"
            },
          }
        }
    }
  }