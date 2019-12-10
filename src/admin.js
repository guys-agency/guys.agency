function addCard(block, index, text, owner) {
	return fetch(
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
					block: block,
					index: index,
					text: text,
					owner: owner,
				}),
			}
		)
	)
		.then(statusRequest)
		.catch(err => console.log('addCard ERROR :', err));
}

function statusRequest(res) {
	if (res.ok) {
		console.log('res', res);
		return res.json();
	}
	return Promise.reject(res);
}

document.querySelector('#start').addEventListener('click', e => {
	e.preventDefault();
	console.log(
		'document.forms.addMessage.block.value',
		document.forms.addMessage.block.value
	);
	addCard(
		document.forms.addMessage.block.value,
		document.forms.addMessage.index.value,
		document.forms.addMessage.text.value,
		document.forms.addMessage.owner.value
	);
});
