# Building Inventory Tracking System for Ventilators
This is Micro Project where **CRUD** operations are executed on _Ventilators' status_ in Hospitals 

### TECH STACK
![Nodejs](https://img.shields.io/badge/nodejs-v12.18.4-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-v4.4.1-yellow.svg)

### PREREQUISITES
* Installation of Node.js and MongoDB
* Importing the Express server
* Executing using Postman API

### WHAT EACH FILE DOES
1. server.js  
  * validates the user's login credentials
  * If these credentials are correct, then the user can access index.js
2. middleware.js  
  * authenticates user while accessing the site.
3. index.js
  * It is the body of the rest api
4. config.js
  * It has a secret key

### GO AHEAD TO TEST THE REST API
* Run the index.js in that folder destination in **cmd** where you have cloned these files using ```node index.js```
* Open the postman
* In server.js, I kept default username and password. Give those credentials to the body part of postman
* Copy the JWT token given by the server
* JWT token is provided only when you give the correct login credentials
* While you visit any page, make sure that you had added the JWT token for Authorization in the headers part.  Add the token in this form "Bearer _JWTtoken_"
* Then start executing the *CRUD* operations
