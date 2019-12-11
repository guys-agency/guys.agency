import { api } from './api.js';

const blocks = ['start', 'about', 'works', 'contacts'];

export default class WorkWithData {
	constructor(data) {
		this.data = data;
		// data.forEach(litlData => {
		// 	console.log('data', litlData);
		// 	this.createElem('start', litlData);
		// });
		console.log('object', api.getMessageByBlock('start'));
		this.createElem = this.createElem.bind(this);
		blocks.forEach(block => {
			this.renderBlock(block);
		});
	}

	renderBlock(block) {
		api.getMessageByBlock(block).then(litlData => {
			console.log('data', litlData);
			const newObj = { data: {} };
			Object.keys(litlData.data)
				.sort((a, b) => {
					return litlData.data[a].index - litlData.data[b].index;
				})
				.forEach(i => {
					newObj.data[i] = litlData.data[i];
					this.createElem(block, litlData.data[i]);
				});
			console.log('objectnewObj', newObj);
		});
	}

	createElem(block, litlData) {
		const messageContainer = document.createElement('div');
		const img = document.createElement('img');
		img.src = litlData.owner.avatar;
		img.classList.add('message__pic');
		messageContainer.classList.add('message__container');
		messageContainer.appendChild(img);

		if (Array.isArray(litlData.text)) {
			const textWrapper = document.createElement('div');
			textWrapper.classList.add('message__text-wrapper');
			for (let i = 0; i < litlData.text.length; i++) {
				const textContainer = document.createElement('div');
				const text = document.createElement('div');

				text.innerHTML = litlData.text[i];
				textContainer.classList.add('message__text-container');
				text.classList.add('message__text');
				textContainer.appendChild(text);
				textContainer.style = `background-color: ${litlData.color};`;

				if (litlData.color === '#FFFFFF') {
					// text.style = `color: #000`;
					// messageContainer.style = `align-self: flex-end; flex-direction: row-reverse;`;
					// textContainer.style = `border: solid 1px #BDBDBD;`;
					// img.style = `margin-left: 15px; margin-right: 0px;`;
					messageContainer.classList.add('message__container_d');
				}
				if (litlData.color === '#27AE60') {
					messageContainer.classList.add('message__container_k');
				}
				if (litlData.color === '#2F80ED') {
					messageContainer.classList.add('message__container_a');
				}
				if (litlData.color === '#EAF2FD') {
					messageContainer.classList.add('message__container_g');
				}

				textWrapper.appendChild(textContainer);
			}
			messageContainer.appendChild(textWrapper);
			$(`#${block}`).append(messageContainer);
		} else {
			const textContainer = document.createElement('div');
			const text = document.createElement('div');
			text.innerHTML = litlData.text;
			img.src = litlData.owner.avatar;
			messageContainer.classList.add('message__container');
			textContainer.classList.add('message__text-container');
			text.classList.add('message__text');
			img.classList.add('message__pic');
			textContainer.appendChild(text);
			messageContainer.appendChild(img);
			messageContainer.appendChild(textContainer);
			// textContainer.style = `background-color: ${litlData.color}`;

			if (litlData.owner._id === '5ded05e46180969dc7a73838') {
				// text.style = `color: #000`;
				messageContainer.style = `align-self: flex-end; flex-direction: row-reverse;`;
				messageContainer.classList.add('message__container_d');
				// textContainer.style = `border: solid 1px #BDBDBD; background-color: ${litlData.color};`;
				// img.style = `margin-left: 15px; margin-right: 0px;`;
			}
			if (litlData.owner._id === '5ded0461efaf9a9dc7729105') {
				messageContainer.classList.add('message__container_k');
			}
			if (litlData.owner._id === '5ded06626180969dc7a7383a') {
				messageContainer.classList.add('message__container_a');
			}
			if (litlData.owner._id === '5ded063a6180969dc7a73839') {
				messageContainer.classList.add('message__container_g');
			}

			$(`#${block}`).append(messageContainer);
		}
	}
}
