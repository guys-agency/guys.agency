const Message = require('../models/messages');

module.exports.getMessages = (req, res) => {
	Message.find({})
		.then(Message => res.send({ data: Message }))
		.catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createMessage = (req, res) => {
	const { block, index, text, owner } = req.body;

	Message.create({ block, index, text, owner })
		.then(Message => res.status(201).send({ data: Message }))
		.catch(err => {
			switch (err.message) {
				case 'user validation failed: name: Path `text` is required.':
					res.status(404).send({ message: 'Не введено поле text' });
					break;
				default:
					console.log('object', err);
					res.status(500).send({ message: 'Произошла ошибка', err });
			}
			// res.status(500).send({ message: 'Произошла ошибка', err });
		});
};

module.exports.deleteMessage = (req, res) => {
	Message.findByIdAndDelete(req.params.MessageId)
		.then(Message => {
			if (!Message) {
				return res.status(404).send({ message: 'Карточка не найдена' });
			}
			return res.send({ data: Message });
		})
		.catch(err => {
			const statusCode = err.message.includes('Cast to ObjectId failed')
				? 404
				: 500;
			const message =
				statusCode === 404
					? 'Неверно указан ID карточки'
					: 'Произошла ошибка';
			res.status(statusCode).send({ message });
		});
};
