import { api } from './api.js';

export default class Sidebar {
	constructor(name) {
		name.forEach((el, i) => {
			// this.renderSidebar = this.renderSidebar.call();
			api.getUserData(name)
				.then(data => {
					console.log('data', data.data);
					this.renderSidebar(data.data[i], i);
				})
				.catch(err => {
					console.log('message', 'Неожиданно, но ошибка', err);
				});
		});
	}

	renderSidebar(data, i) {
		const sidebar = $(`.sidebar__item:eq(${i})`);
		for (let key in data) {
			if (key === 'email') {
				$(`#sidebar${key}`, sidebar).attr(
					'href',
					`mailto:${data[key]}`
				);
				return;
			}
			if ($(`#sidebar${key}`, sidebar).html()) {
				const test = `$(#sidebar${key}, sidebar).html()`;
				console.log('ready', test, data[key]);
				$(`#sidebar${key}`, sidebar).html(data[key]);
			}
		}
	}
}
