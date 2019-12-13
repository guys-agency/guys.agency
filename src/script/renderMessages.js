import { api } from './api.js';
import Sidebar from './sidebar.js';

const blocks = ['start', 'about', 'works', 'contacts'];

export default class WorkWithData {
	constructor() {
		// console.log('object', api.getMessageByBlock('start'));
		this.createElem = this.createElem.bind(this);
		blocks.forEach(block => {
			this.renderBlock(block);
		});
	}

	renderBlock(block) {
		api.getMessageByBlock(block).then(litlData => {
			// console.log('data', litlData);
			const newObj = { data: {} };
			Object.keys(litlData.data)
				.sort((a, b) => {
					return litlData.data[a].index - litlData.data[b].index;
				})
				.reduce((prval, i, index, arr) => {
					console.log('arr', arr);
					if (i < arr.length - 1) {
						console.log('i', i);
						if (
							litlData.data[Number(i)].owner._id === prval ||
							litlData.data[Number(i)].owner._id ===
								litlData.data[Number(i) + 1].owner._id
						) {
							console.log(
								prval,
								litlData.data[Number(i)].owner._id,
								litlData.data[Number(i) + 1].owner._id
							);
							this.createElem(block, litlData.data[i], true);
							return litlData.data[Number(i)].owner._id;
						}
					}
					newObj.data[i] = litlData.data[i];
					this.createElem(block, litlData.data[i], false);
					return litlData.data[Number(i)].owner._id;
				}, 0);
			// console.log('objectnewObj', newObj);
		});
	}

	createElem(block, litlData, nMessage) {
		const messageContainer = document.createElement('div');
		const img = document.createElement('img');
		const text = document.createElement('div');
		const textContainer = document.createElement('div');

		messageContainer.classList.add('message__container');

		text.innerHTML = litlData.text;
		textContainer.classList.add('message__text-container');
		text.classList.add('message__text');

		img.src = litlData.owner.avatar;
		img.name = litlData.owner.name;
		img.classList.add('message__pic');
		img.addEventListener('click', function(e) {
			const sidebar = new Sidebar([this.name]);
		});

		if (nMessage) {
			console.log(
				'jq',
				$('.message__container')
					.last()
					.find('.message__text-wrapper')
			);

			const textWrapper = document.createElement('div');
			textWrapper.classList.add('message__text-wrapper');

			textContainer.appendChild(text);
			this.chooseClass(messageContainer, litlData.owner._id);
			textWrapper.appendChild(textContainer);

			if (
				$('.message__container')
					.last()
					.find('.message__text-wrapper').length
			) {
				console.log('test');
				messageContainer.appendChild(textWrapper);
				$('.message__text-wrapper')
					.last()
					.append(messageContainer);
				return;
			}
			messageContainer.appendChild(img);
			messageContainer.appendChild(textWrapper);
			$(`#${block}`).append(messageContainer);
		} else {
			text.innerHTML = litlData.text;

			// img.src = litlData.owner.avatar;
			// messageContainer.classList.add('message__container');
			img.classList.add('message__pic');
			textContainer.appendChild(text);
			messageContainer.appendChild(img);
			messageContainer.appendChild(textContainer);

			this.chooseClass(messageContainer, litlData.owner._id);

			$(`#${block}`).append(messageContainer);
		}
	}

	chooseClass(v, id) {
		if (id === '5ded05e46180969dc7a73838') {
			v.classList.add('message__container_d');
		}
		if (id === '5ded0461efaf9a9dc7729105') {
			v.classList.add('message__container_k');
		}
		if (id === '5ded06626180969dc7a7383a') {
			v.classList.add('message__container_a');
		}
		if (id === '5ded063a6180969dc7a73839') {
			v.classList.add('message__container_g');
		}
	}
}
