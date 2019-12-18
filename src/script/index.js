import * as rick from './rick.js';
import WorkWithData from './renderMessages.js';
import { api } from './api.js';
import sidebar from './sidebar.js';

const blocks = ['start', 'about', 'works', 'contacts'];
const profTypes = ['designs', 'devs', 'marketers'];
// sessionStorage.clear();

api.getMessages().then(data => {
	const dataSort = {};
	dataSort['start'] = {};
	dataSort['about'] = {};
	dataSort['works'] = {};
	dataSort['contacts'] = {};

	for (let key in data.data) {
		dataSort[data.data[key].block][data.data[key].index] = Object.assign(
			{},
			data.data[key]
		);
		// switch (data.data[key].block) {
		// 	case 'start':
		// 		dataSort['start'][data.data[key].index] = Object.assign(
		// 			{},
		// 			data.data[key]
		// 		);

		// 		break;
		// 	case 'about':
		// 		dataSort['about'][data.data[key].index] = data.data[key];

		// 		break;
		// 	case 'works':
		// 		dataSort['works'][data.data[key].index] = data.data[key];

		// 		break;
		// 	case 'contacts':
		// 		dataSort['contacts'][data.data[key].index] = data.data[key];

		// 		break;
		// 	default:
		// 		break;
		// }
	}
	console.log('dataSort', dataSort);
	blocks.forEach(block => {
		const workWithData = new WorkWithData(block, dataSort[block]);
	});
	profTypes.forEach(elem => {
		const test = `#${elem}H`;
		console.log('job', test);
		$(`#${elem}H`).click(e => {
			e.preventDefault();
			sidebar.forType(elem);
		});
	});
	// Прокручиваем страницу к scrollX и scrollY из localStorage (либо 0,0 если там еще ничего нет)
	window.scroll(...cords.map(cord => sessionStorage[cord]));
	$('.load-page').css('display', 'none');
});

let cords = ['scrollX', 'scrollY'];
// Перед закрытием записываем в локалсторадж window.scrollX и window.scrollY как scrollX и scrollY
window.addEventListener('unload', e =>
	cords.forEach(cord => (sessionStorage[cord] = window[cord]))
);

$(window).on('load', function(e) {});
