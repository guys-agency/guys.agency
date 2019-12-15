import sidebar from './sidebar.js';

export default class WorkWithData {
	constructor(block, data) {
		this.createElem = this.createElem.bind(this);
		this.renderBlock(block, data);
	}

	renderBlock(block, allData) {
		const data = {};
		let i = 0;
		for (let key in allData) {
			if (allData[key].block === block) {
				data[i] = allData[key];
				i += 1;
			}
		}

		Object.keys(data)
			.sort((a, b) => {
				return data[a].index - data[b].index;
			})
			.reduce((prval, i, index, arr) => {
				if (!(index == arr.length - 1)) {
					if (
						data[Number(i)].owner._id ==
						data[arr[index + 1]].owner._id
					) {
						this.createElem(block, data[i], true);
						return data[Number(i)].owner._id;
					}
				}
				if (data[Number(i)].owner._id == prval) {
					this.createElem(block, data[i], true);
					return data[Number(i)].owner._id;
				}

				this.createElem(block, data[i], false);
				return data[Number(i)].owner._id;
			}, 0);
	}

	createElem(block, litlData, nMessage) {
		const text = document.createElement('div');
		const textContainer = document.createElement('div');

		text.innerHTML = litlData.text;
		textContainer.classList.add('message__text-container');
		text.classList.add('message__text');

		if (nMessage) {
			const textWrapper = document.createElement('div');
			textWrapper.classList.add('message__text-wrapper');

			textContainer.appendChild(text);

			textWrapper.appendChild(textContainer);

			if (
				$('.message__container', `#${block}`)
					.last()
					.find('.message__text-wrapper').length
			) {
				// messageContainer.appendChild(textContainer);

				$('.message__text-wrapper', `#${block}`)
					.last()
					.append(textContainer);
				return;
			}
			const messageContainer = document.createElement('div');
			messageContainer.classList.add('message__container');
			const img = document.createElement('img');
			img.src = litlData.owner.avatar;
			img.name = litlData.owner.name;
			img.classList.add('message__pic');
			img.addEventListener('click', function(e) {
				e.preventDefault();
				sidebar.forName([this.name]);
			});
			this.chooseClass(messageContainer, litlData.owner._id);
			messageContainer.appendChild(img);
			messageContainer.appendChild(textWrapper);
			$(`#${block}`).append(messageContainer);
		} else {
			const messageContainer = document.createElement('div');
			messageContainer.classList.add('message__container');
			const img = document.createElement('img');
			img.src = litlData.owner.avatar;
			img.name = litlData.owner.name;
			img.classList.add('message__pic');
			img.addEventListener('click', function(e) {
				e.stopImmediatePropagation();
				sidebar.forName([this.name]);
			});
			text.innerHTML = litlData.text;

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
