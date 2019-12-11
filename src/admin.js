function addCard(block, index, type, cat, text, imgRef, owner) {
	console.log(
		'object',
		JSON.stringify({
			block,
			index,
			type,
			cat,
			text,
			imgRef,
			owner,
		})
	);
	fetch(
		'http://127.0.0.1:3000/messages',
		Object.assign(
			{ method: 'POST' },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
			{
				body: JSON.stringify({
					block,
					index,
					type,
					cat,
					text,
					imgRef,
					owner,
				}),
			}
		)
	)
		.then(statusRequest)
		.then(() => {
			formReset();
		})
		.catch(err => console.log('addCard ERROR :', err));
}

function statusRequest(res) {
	if (res.ok) {
		console.log('res', res);
		return res.json();
	}
	return Promise.reject(res);
}

function formReset() {
	document.forms.addMessage.index.value =
		Number(document.forms.addMessage.index.value) + 1;
	document.forms.addMessage.text.value = '';
	document.forms.addMessage.imgRef.value = '';
}

document.querySelector('#start').addEventListener('click', e => {
	e.preventDefault();
	console.log(
		'document.forms.addMessage.block.value',
		document.forms.addMessage.cat.value
	);
	addCard(
		document.forms.addMessage.block.value,
		document.forms.addMessage.index.value,
		document.forms.addMessage.type.value,
		document.forms.addMessage.cat.value,
		document.forms.addMessage.text.value,
		document.forms.addMessage.imgRef.value,
		document.forms.addMessage.owner.value
	);
});
