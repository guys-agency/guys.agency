class Api {
	constructor(options) {
		this.options = options;
	}

	getUserData(userId) {
		return fetch(
			this.options.baseUrl + '/users/' + userId,
			Object.assign({}, this.options.header)
		)
			.then(statusRequest)
			.catch(err => console.log(err));
	}

	getUserData(name) {
		return fetch(
			this.options.baseUrl + '/users/name/' + name,
			Object.assign({}, this.options.header)
		)
			.then(statusRequest)
			.catch(err => console.log(err));
	}

	// editUserData(name, about) {
	// 	return fetch(
	// 		this.options.baseUrl + '/users/me',
	// 		Object.assign({ method: 'PATCH' }, this.options.header, {
	// 			body: JSON.stringify({
	// 				name: name,
	// 				about: about,
	// 			}),
	// 		})
	// 	)
	// 		.then(statusRequest)
	// 		.catch(err => {
	// 			console.log('edit user data ERROR :', err);
	// 		});
	// }

	getMessages() {
		return fetch(this.options.baseUrl + '/messages', this.options.header)
			.then(statusRequest)
			.catch(err => console.log('getCard ERROR :', err));
	}

	getMessageByBlock(block) {
		return fetch(
			this.options.baseUrl + '/messages/' + block,
			Object.assign({}, this.options.header)
		)
			.then(statusRequest)
			.catch(err => console.log('addCard ERROR :', err));
	}

	// deleteCard(id) {
	// 	fetch(
	// 		this.options.baseUrl + '/cards/' + id,
	// 		Object.assign({ method: 'DELETE' }, this.options.header)
	// 	)
	// 		.then(statusRequest)
	// 		.then(data => console.log('data :', data))
	// 		.catch(err => console.log('deleteCard ERROR :', err));
	// }

	// editLikeCount(id, method, card) {
	// 	return fetch(
	// 		this.options.baseUrl + '/cards/like/' + id,
	// 		Object.assign({ method: method }, this.options.header)
	// 	)
	// 		.then(statusRequest)
	// 		.catch(err => {
	// 			console.log('editLikeCount ERROR : :', err);
	// 		});
	// }

	// changeAvatar(link) {
	// 	document.querySelector('#avatarSubmit').setAttribute('disabled', true);
	// 	document.querySelector('#avatarSubmit').textContent = 'Загрузка...';

	// 	return fetch(
	// 		this.options.baseUrl + '/users/me/avatar',
	// 		Object.assign({ method: 'PATCH' }, this.options.header, {
	// 			body: JSON.stringify({ avatar: link }),
	// 		})
	// 	)
	// 		.then(statusRequest)
	// 		.catch(err => {
	// 			console.log('changeAvatar ERROR : :', err);
	// 		});
	// }
}

function statusRequest(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res);
}

export const api = new Api({
	baseUrl: 'http://127.0.0.1:3000',
	header: {
		headers: {
			'Content-Type': 'application/json',
		},
	},
});
