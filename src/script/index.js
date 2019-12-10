import * as rick from './rick.js';
import WorkWithData from './renderMessages.js';

const dataTest = [
	{
		name: 'Данил Леонов',
		text:
			'Ребят, привет! Нужно решить по сайту-портфолио для нас.<br>Разделы: <a href="#about">о нас</a>, <a href="#works">услуги/работы</a>, <a href="#contact">контакты</a>',
		color: '#FFFFFF',
		photo: './images/Message/AvatarLeo.png',
	},
	{
		name: 'Константин Граев',
		text: [
			'Слушай, ну, нужно что-то инфостильное в духе:',
			'Йоу, мы команда друзей из <a href="">дизайнеров</a>, <a href="">разработчика</a> и <a href="">маркетолога</a>.<br>Наша специальность — брендинг и веб-интерфейсы. Возьмем самое сложное и сделаем это простым.',
		],
		color: '#27AE60',
		photo: './images/Message/AvatarKos.png',
	},
	{
		name: 'Ана Водолазко',
		text: 'Всем привет, я уже подготовила материал',
		color: '#2F80ED',
		photo: './images/Message/AvatarAnya.png',
	},
	{
		name: 'Георгий Каташев',
		text: 'Окей, бумер...',
		color: '#EAF2FD',
		photo: './images/Message/AvatarG.png',
	},
];

const workWithData = new WorkWithData(dataTest);
