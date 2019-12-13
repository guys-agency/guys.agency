const User = require('../models/users');

module.exports.findAllUsers = (req, res) => {
	User.find({})
		.then(user => res.send({ data: user }))
		.catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.findUserById = (req, res) => {
	User.findById(req.params.id)
		.then(user => {
			if (!user) {
				return res
					.status(404)
					.send({ message: 'Пользователь не найден' });
			}
			return res.send({ data: user });
		})
		.catch(err => {
			const statusCode = err.message.includes('Cast to ObjectId failed')
				? 404
				: 500;
			const message =
				statusCode === 404
					? 'Неверно указан ID пользователя'
					: 'Произошла ошибка';
			res.status(statusCode).send({ message });
		});
};

module.exports.findbyName = (req, res) => {
	User.find({ name: req.params.search })
		.then(user => {
			if (!user) {
				return res
					.status(404)
					.send({ message: 'Пользователь не найден' });
			}
			return res.send({ data: user });
		})
		.catch(err => {
			const statusCode = err.message.includes('Cast to ObjectId failed')
				? 404
				: 500;
			const message =
				statusCode === 404
					? 'Неверно указан ID пользователя'
					: 'Произошла ошибка';
			res.status(statusCode).send({ message });
		});
};
