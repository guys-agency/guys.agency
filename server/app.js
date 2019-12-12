const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerIndex = require('./routes/index');

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://<username>:<password>@cluster0-ftb6g.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const app = express();
const { PORT = 3000 } = process.env;

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header(
		'Access-Control-Allow-Methods',
		'GET,HEAD,PUT,PATCH,POST,DELETE'
	);
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
	'mongodb+srv://admin:1@cluster0-ftb6g.gcp.mongodb.net/GuysTeam?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	}
);

app.use('/', routerIndex);
app.all('/*', (req, res) => {
	res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
