##School Management API

A minimalist Node.js and Express.js API designed to manage school data, focusing on adding new schools and retrieving a list of schools sorted by distance to a given location.

##Features

Add School: Create a new school entry with details like name, address and geographic coordinates.

List Schools by distance: Retrieve a list of all schools, sorted by their distance from a specified latitude and longitude.


##Technologies Used

Backend: Node.js, Express.js

Database: MySql

Environment Variables: Managed using .env files

##API ENDPOINTS 
###Add a New School

Endpoint: POST /addschool

Description: Adds a new school to the database.

Request Body:

{
  "name": "Sample School",
  "address":"abc"
  "latitude": 12.9716,
  "longitude": 77.5946
}

Response:

{
  "message": "School added successfully",
  "id": "1"
  
}


###List Schools by PROXIMITY

Endpoint: GET /listSchools?latitude=12.9716&longitude=77.5946

Description: Retrieves a list of all schools, sorted by their distance from the provided latitude and longitude.

Response:

[
  {
    "name": "Nearby School",
    "address":"abc"
    "latitude": 12.9718,
    "longitude": 77.5940,
    "distance": 0.07
  },
  {
    "name": "Farther School",
    "address":"abc"
    "latitude": 12.9616,
    "longitude": 77.5846,
    "distance": 1.5
  }
]

app.js : Entry point 
