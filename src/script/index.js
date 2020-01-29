import * as rick from './rick.js';
// import WorkWithData from './renderMessages.js';
import { api } from './api.js';
import sidebary from './sidebar.js';

const blocks = ['start', 'about', 'works', 'contacts'];
const profTypes = ['designs', 'devs', 'marketers'];
// sessionStorage.clear();

// api.getMessages().then(data => {
// 	const dataSort = {};
// 	dataSort['start'] = {};
// 	dataSort['about'] = {};
// 	dataSort['works'] = {};
// 	dataSort['contacts'] = {};

// 	for (let key in data.data) {
// 		dataSort[data.data[key].block][data.data[key].index] = Object.assign(
// 			{},
// 			data.data[key]
// 		);
// 	}
// 	console.log('dataSort', dataSort);
// 	blocks.forEach(block => {
// 		if (block == 'start') {
// 			const workWithData = new WorkWithData(block, dataSort[block]);
// 			$(`#${block}`).attr('appr', 'false');
// 		} else {
// 			$(window).scroll(function() {
// 				if (
// 					($(this).scrollTop() + $(this).height() >
// 						$(`#${block}`).position().top) &
// 					($(`#${block}`).attr('appr') != 'false')
// 				) {
// 					const workWithData = new WorkWithData(
// 						block,
// 						dataSort[block]
// 					);
// 					$(`#${block}`).attr('appr', 'false');
// 				}
// 			});
// 		}
// 	});
// 	profTypes.forEach(elem => {
// 		const test = `#${elem}H`;
// 		console.log('job', test);
// 		$(`#${elem}H`).click(e => {
// 			e.preventDefault();
// 			sidebar.forType(elem);
// 		});
// 	});
// 	// Прокручиваем страницу к scrollX и scrollY из localStorage (либо 0,0 если там еще ничего нет)
// 	window.scroll(...cords.map(cord => sessionStorage[cord]));
// 	$('.load-page').css('display', 'none');
// });

let cords = ['scrollX', 'scrollY'];
// Перед закрытием записываем в локалсторадж window.scrollX и window.scrollY как scrollX и scrollY
window.addEventListener('unload', e =>
	cords.forEach(cord => (sessionStorage[cord] = window[cord]))
);

$(window).on('load', function(e) {});
