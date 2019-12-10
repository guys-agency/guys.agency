// TODO Если мышка покинет окно через любой край, появится рик, должно быть только сверху
// TODO полноэкранный рещим со сворачиванием интерфейса не работает

function rickComes(x, y) {
	const imgR = document.createElement('img');
	imgR.src = './images/Rick_Sprite.png';
	imgR.classList.add('rick');
	imgR.style = `top: ${y}px; left: ${x - 43}px;`;
	$('body').append(imgR);
}

$('body').mouseleave(e => {
	event.stopImmediatePropagation();
	if (e.clientY <= 6) {
		// Нужно тестить данное решение проблемы, так как данная величина может отличаться на разных браузерах
		rickComes(e.clientX, e.clientY);
	}
});

$('body').mouseenter(e => {
	event.stopImmediatePropagation();
	$('.rick').detach();
});
