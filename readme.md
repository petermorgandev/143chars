# 143chars

143chars is a Twitter-like website built on Node.js/Express and MongoDB.

## Table of Contents

  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
  - [Technologies](#technologies)
  - [Acknowledgments](#acknowledgments)


## Features
* Server and Client interface
* User registration/deletion and authentication
* Registered users can send and delete messages
* Basic REST API functions are available with more currently in development

## Getting Started

Want to check out 143chars? Here is what you will need:

### Prerequisites
1. Node.js
2. MongoDB

### Installing

Clone the GitHub repository
```
git clone https://github.com/PeterMorganGH/143chars.git
```

Change to the directory of the cloned respository
```
cd 143chars
```
Install the required packages with npm
```
npm install
```
Change the MongoDB connection settings in app.js if you are using MongoDB with customized settings
```
mongoose.connect('mongodb://<your_custom_server_address>:<your_custom_port_used>/143chars', { useNewUrlParser: true });
```
With MongoDB running, start the application
```
node app.js
```
Visit localhost:3000 in your web browser

## Technologies
Project built with:
* [Node.js](https://nodejs.org) - JavaScript server/client
* [Express](https://expressjs.com/) - Web application framework for Node.js
* [MongoDB](https://www.mongodb.com/) - Database
* [Bootstrap](https://getbootstrap.com/) - CSS framework

## Acknowledgments

* SVG Avatars by [SVGRepo](https://www.svgrepo.com)