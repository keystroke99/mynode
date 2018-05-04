
db.users.find( { "preferences.id": "Sports"} );

db.users.find( { "preferences.id": "Sports", "preferences.Cricket" : "Indian Premier League"} );

db.users.find( { "preferences.id": "Sports", "preferences.Football" : "National"} );

Source : "https://docs.mongodb.com/manual/tutorial/query-array-of-documents/"