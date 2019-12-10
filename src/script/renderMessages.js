export default class WorkWithData {
	constructor(data) {
		this.data = data;
		data.forEach(litlData => {
			console.log('data', litlData);
			this.createElem(litlData);
		});
	}

	createElem(litlData) {
		const messageContainer = document.createElement('div');
		const img = document.createElement('img');
		img.src = litlData.photo;
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
			$('.message').append(messageContainer);
		} else {
			const textContainer = document.createElement('div');
			const text = document.createElement('div');
			text.innerHTML = litlData.text;
			img.src = litlData.photo;
			messageContainer.classList.add('message__container');
			textContainer.classList.add('message__text-container');
			text.classList.add('message__text');
			img.classList.add('message__pic');
			textContainer.appendChild(text);
			messageContainer.appendChild(img);
			messageContainer.appendChild(textContainer);
			textContainer.style = `background-color: ${litlData.color}`;

			if (litlData.color === '#FFFFFF') {
				// text.style = `color: #000`;
				messageContainer.style = `align-self: flex-end; flex-direction: row-reverse;`;
				messageContainer.classList.add('message__container_d');
				// textContainer.style = `border: solid 1px #BDBDBD; background-color: ${litlData.color};`;
				// img.style = `margin-left: 15px; margin-right: 0px;`;
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

			$('.message').append(messageContainer);
		}
	}
}
