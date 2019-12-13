import * as rick from './rick.js';
import WorkWithData from './renderMessages.js';

const workWithData = new WorkWithData();

$('.message__pic').click(e => {
	console.log('clic', clic);
	console.log('e.name', e.name);
});

console.log('$(`sidebar${key}`, sidebar)', $('.message__pic').html());
