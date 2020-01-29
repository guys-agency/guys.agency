import sidebar from './sidebar.js';

// export default class WorkWithData {
// 	constructor(block, data) {
// 		this.createElem = this.createElem.bind(this);
// 		this.renderBlock(block, data);
// 	}

// 	renderBlock(block, data) {
// 		let timerToCreate = 550;
// 		Object.keys(data).reduce((prval, i, index, arr) => {
// 			console.log('timerToCreate', timerToCreate);
// 			if (data[Number(i)].owner._id == prval) {
// 				setTimeout(() => {
// 					this.createElem(block, data[i], 2);
// 				}, timerToCreate + i * 1500);
// 				const timerQ = data[i].text.length * 10 > 500;

// 				timerToCreate = timerQ ? 550 : data[i].text.length * 10 + 50;

// 				return data[Number(i)].owner._id;
// 			}
// 			if (!(index == arr.length - 1)) {
// 				if (
// 					data[Number(i)].owner._id == data[arr[index + 1]].owner._id
// 				) {
// 					setTimeout(() => {
// 						this.createElem(block, data[i], 1);
// 					}, timerToCreate + i * 1500);
// 					const timerQ = data[i].text.length * 10 > 500;

// 					timerToCreate = timerQ
// 						? 550
// 						: data[i].text.length * 10 + 50;
// 					return data[Number(i)].owner._id;
// 				}
// 			}

// 			setTimeout(() => {
// 				this.createElem(block, data[i], 0);
// 			}, timerToCreate + i * 1500);
// 			const timerQ = data[i].text.length * 10 > 500;

// 			timerToCreate = timerQ
// 				? 500 + i * 700
// 				: data[i].text.length * 10 + i * 700;
// 			return data[Number(i)].owner._id;
// 		}, 0);
// 	}

// 	createElem(block, litlData, nMessage) {
// 		if (litlData.imgRef != '') {
// 			this.createElemWork(block, litlData);
// 			return;
// 		}
// 		const text = document.createElement('div');
// 		const textContainer = document.createElement('div');
// 		const typing = document.createElement('div');
// 		typing.classList.add('message__typing');
// 		if (
// 			litlData.owner._id == '5ded05e46180969dc7a73838' ||
// 			litlData.owner._id == '5ded063a6180969dc7a73839'
// 		) {
// 			typing.classList.add('message__typing_black');
// 		}
// 		const span = document.createElement('span');
// 		const span1 = document.createElement('span');
// 		const span2 = document.createElement('span');
// 		typing.appendChild(span);
// 		typing.appendChild(span1);
// 		typing.appendChild(span2);

// 		text.innerHTML = litlData.text;
// 		textContainer.classList.add('message__text-container');
// 		textContainer.appendChild(typing);
// 		text.classList.add('message__text');

// 		const timerQ = litlData.text.length * 10 > 500;

// 		const timer = timerQ ? 500 : litlData.text.length * 10;

// 		setTimeout(() => {
// 			text.classList.add('visible');
// 			typing.classList.remove('message__typing');
// 		}, timer + litlData.index * 700);

// 		if (nMessage) {
// 			const textWrapper = document.createElement('div');
// 			textWrapper.classList.add('message__text-wrapper');

// 			textContainer.appendChild(text);

// 			textWrapper.appendChild(textContainer);

// 			if (nMessage == '2') {
// 				// messageContainer.appendChild(textContainer);

// 				$('.message__text-wrapper', `#${block}`)
// 					.last()
// 					.append(textContainer);
// 				return;
// 			}
// 			const messageContainer = document.createElement('div');
// 			messageContainer.classList.add('message__container');
// 			const img = document.createElement('img');
// 			img.src = litlData.owner.avatar;
// 			img.name = litlData.owner.name;
// 			img.classList.add('message__pic');
// 			img.addEventListener('click', function(e) {
// 				e.preventDefault();
// 				sidebar.forName([this.name]);
// 			});
// 			this.chooseClass(messageContainer, litlData.owner._id);
// 			messageContainer.appendChild(img);
// 			messageContainer.appendChild(textWrapper);
// 			const br = document.createElement('br');
// 			textWrapper.appendChild(br);
// 			$(`#${block}`).append(messageContainer);
// 		} else {
// 			const messageContainer = document.createElement('div');
// 			messageContainer.classList.add('message__container');
// 			const img = document.createElement('img');
// 			img.src = litlData.owner.avatar;
// 			img.name = litlData.owner.name;
// 			img.classList.add('message__pic');
// 			img.addEventListener('click', function(e) {
// 				e.stopImmediatePropagation();
// 				sidebar.forName([this.name]);
// 			});

// 			textContainer.appendChild(text);
// 			messageContainer.appendChild(img);
// 			messageContainer.appendChild(textContainer);

// 			this.chooseClass(messageContainer, litlData.owner._id);

// 			$(`#${block}`).append(messageContainer);
// 		}
// 	}

// 	createElemWork(block, data) {
// 		const messageContainer = document.createElement('div');
// 		messageContainer.classList.add('message__container');
// 		const textContainer = document.createElement('div');
// 		textContainer.classList.add('message__text-container');
// 		const messageText = document.createElement('div');
// 		messageText.classList.add('message__text');
// 		messageText.classList.add('visible');
// 		const messageAtt = document.createElement('div');
// 		messageAtt.classList.add('message__att');
// 		const catList = document.createElement('div');
// 		catList.classList.add('cat-list');
// 		catList.textContent = data.cat;
// 		const imgList = document.createElement('div');
// 		imgList.classList.add('img-list');
// 		const imgSrc = data.imgRef.split(', ');
// 		imgSrc.forEach(e => {
// 			const imgInList = document.createElement('img');
// 			imgInList.src = e;
// 			imgList.appendChild(imgInList);
// 		});
// 		// const imgInList = document.createElement('img');
// 		const text = document.createElement('p');
// 		text.innerHTML = data.text;
// 		const img = document.createElement('img');
// 		img.src = data.owner.avatar;
// 		img.name = data.owner.name;
// 		img.classList.add('message__pic');
// 		img.addEventListener('click', function(e) {
// 			e.stopImmediatePropagation();
// 			sidebar.forName([this.name]);
// 		});
// 		messageAtt.appendChild(catList);
// 		messageAtt.appendChild(imgList);
// 		messageText.appendChild(messageAtt);
// 		messageText.appendChild(text);
// 		textContainer.appendChild(messageText);
// 		messageContainer.appendChild(img);
// 		messageContainer.appendChild(textContainer);

// 		this.chooseClass(messageContainer, data.owner._id);

// 		$(`#${block}`).append(messageContainer);
// 	}

// 	chooseClass(v, id) {
// 		if (id === '5ded05e46180969dc7a73838') {
// 			v.classList.add('message__container_d');
// 		}
// 		if (id === '5ded0461efaf9a9dc7729105') {
// 			v.classList.add('message__container_k');
// 		}
// 		if (id === '5ded06626180969dc7a7383a') {
// 			v.classList.add('message__container_a');
// 		}
// 		if (id === '5ded063a6180969dc7a73839') {
// 			v.classList.add('message__container_g');
// 		}
// 	}
// }
