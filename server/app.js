const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerIndex = require('./routes/index');

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

mongoose.connect('mongodb://localhost:27017/GuysTeam', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

app.use('/', routerIndex);
app.all('/*', (req, res) => {
	res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
