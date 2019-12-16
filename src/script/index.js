import * as rick from './rick.js';
import WorkWithData from './renderMessages.js';
import { api } from './api.js';
import sidebar from './sidebar.js';

const blocks = ['start', 'about', 'works', 'contacts'];
const profTypes = ['designs', 'devs', 'marketers'];
// sessionStorage.clear();

api.getMessages().then(data => {
	blocks.forEach(block => {
		const workWithData = new WorkWithData(block, data.data);
	});
	profTypes.forEach(elem => {
		const test = `#${elem}H`;
		console.log('job', test);
		$(`#${elem}H`).click(e => {
			e.preventDefault();
			sidebar.forType(elem);
		});
	});
	window.scroll(...cords.map(cord => sessionStorage[cord]));
});

let cords = ['scrollX', 'scrollY'];
// Перед закрытием записываем в локалсторадж window.scrollX и window.scrollY как scrollX и scrollY
window.addEventListener('unload', e =>
	cords.forEach(cord => (sessionStorage[cord] = window[cord]))
);
// Прокручиваем страницу к scrollX и scrollY из localStorage (либо 0,0 если там еще ничего нет)

$(window).on('load', function(e) {
	$('.load-page').css('display', 'none');
});

// window.onbeforeunload = function() {
// 	return false;
// };
