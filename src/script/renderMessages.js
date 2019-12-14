import { api } from './api.js';
import Sidebar from './sidebar.js';

export default class WorkWithData {
	constructor(block, data) {
		// console.log('object', api.getMessageByBlock('start'));
		this.createElem = this.createElem.bind(this);

		console.log('id', block);
		this.renderBlock(block, data);
	}

	renderBlock(block, allData) {
		// api.getMessageByBlock(block).then(litlData => {
		// console.log('data', litlData);
		// const newObj = { data: {} };
		const data = {};
		let i = 0;
		for (let key in allData) {
			if (allData[key].block === block) {
				data[i] = allData[key];
				i += 1;
			}
		}
		// console.log('data', data);
		Object.keys(data)
			.sort((a, b) => {
				return data[a].index - data[b].index;
			})
			.reduce((prval, i, index, arr) => {
				// console.log('arr', arr);
				// console.log('i', i);
				if (!(index == arr.length - 1)) {
					// console.log(
					// 	block,
					// 	'prval',
					// 	prval,
					// 	'owner',
					// 	data[Number(i)].owner._id,
					// 	'next',
					// 	data[arr[index + 1]].owner._id,
					// 	data[Number(i)].owner._id == prval,
					// 	data[Number(i)].owner._id ===
					// 		data[arr[index + 1]].owner._id
					// );
					if (
						data[Number(i)].owner._id ==
						data[arr[index + 1]].owner._id
					) {
						// console.log('ok :');
						this.createElem(block, data[i], true);
						return data[Number(i)].owner._id;
					}
				}
				if (data[Number(i)].owner._id == prval) {
					this.createElem(block, data[i], true);
					return data[Number(i)].owner._id;
				}
				// newObj.data[i] = data[i];
				this.createElem(block, data[i], false);
				return data[Number(i)].owner._id;
			}, 0);
		// console.log('objectnewObj', newObj);
		// });
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
			const textWrapper = document.createElement('div');
			textWrapper.classList.add('message__text-wrapper');

			textContainer.appendChild(text);
			this.chooseClass(messageContainer, litlData.owner._id);
			textWrapper.appendChild(textContainer);
			console.log(
				'object',
				$('.message__container', `#${block}`)
					.last()
					.find('.message__text-wrapper')
					.html()
			);

			if (
				$('.message__container', `#${block}`)
					.last()
					.find('.message__text-wrapper').length
			) {
				// messageContainer.appendChild(textContainer);
				console.log('true', textContainer);
				$('.message__text-wrapper', `#${block}`)
					.last()
					.append(textContainer);
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
