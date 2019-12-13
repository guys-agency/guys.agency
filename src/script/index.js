import * as rick from './rick.js';
import WorkWithData from './renderMessages.js';
import { api } from './api.js';

const blocks = ['start', 'about', 'works', 'contacts'];

api.getMessages().then(data => {
	blocks.forEach(block => {
		const workWithData = new WorkWithData(block, data.data);
	});
});

$('.message__pic').click(e => {
	console.log('clic', clic);
	console.log('e.name', e.name);
});

console.log('$(`sidebar${key}`, sidebar)', $('.message__pic').html());
