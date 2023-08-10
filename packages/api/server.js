const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes") // new
require('dotenv').config();

mongoose
	.connect("mongodb://localhost:27017/wdzt"
	, { useNewUrlParser: true })
	.then(() => {
		const app = express()
    var bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({extended: true})) 
    app.use(bodyParser.json()) 
		app.use("/api", routes) // new

		const port = 5000;
		app.listen(port, () => {
			console.log(`Server has started on ${port}`);
		})
	})

