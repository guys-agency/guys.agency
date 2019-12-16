import { api } from './api.js';

class Sidebar {
	constructor() {}

	forType(type) {
		// this.renderSidebar = this.renderSidebar.call();
		api.getUserData('type', type)
			.then(data => {
				for (let key in data.data) {
					if (key == 1) {
						const divContainer = document.createElement('div');
						divContainer.id = 'tempContainer';
						const div = document.createElement('div');
						div.classList.add('sidebar__item');
						div.innerHTML = $('.sidebar__item').html();
						divContainer.appendChild(div);
						$('.sidebar__container').append(divContainer);
					} else if (key > 1) {
						const div = document.createElement('div');
						div.classList.add('sidebar__item');
						div.innerHTML = $('.sidebar__item').html();
						$('#tempContainer').append(div);
					}
					this.renderSidebar(data.data[key], key);
				}
				$('.sidebar').addClass('active');
				$('#sidebarClose').one('click', e => {
					this.remove(e);
				});
				$('#mainWindow').one('click', e => {
					e.stopImmediatePropagation();
					this.remove(e);
				});
			})
			.catch(err => {
				console.log('message', 'Неожиданно, но ошибка', err);
			});
	}

	forName(name) {
		name.forEach((el, i) => {
			// this.renderSidebar = this.renderSidebar.call();
			api.getUserData('name', name)
				.then(data => {
					this.renderSidebar(data.data[i], i);

					$('.sidebar').addClass('active');
					$('#sidebarClose').one('click', e => {
						this.remove(e);
					});
					$('#mainWindow').one('click', e => {
						e.stopImmediatePropagation();
						this.remove(e);
					});
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

			$(`#sidebaravatarL`, sidebar).attr('src', data.avatarL);

			// if ($(`#sidebar${key}`, sidebar).html()) {
			$(`#sidebar${key}`, sidebar).html(data[key]);
			// }
		}
	}
	remove(e) {
		e.preventDefault();
		$('.sidebar').removeClass('active');
		$('#tempContainer').remove();
	}
}
// $(window).on('load', function(e) {
// 	profTypes.forEach(elem => {
// 		const test = `#${elem}H`;
// 		console.log('job', test);
// 		$(`#${elem}H`).click(e => {
// 			e.preventDefault();
// 			sidebar.forType(elem);
// 		});
// 	});
// });

const sidebar = new Sidebar();

export default sidebar;
