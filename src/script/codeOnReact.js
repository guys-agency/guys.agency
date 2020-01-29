// import React, { Component } from 'react';

// import { api } from './api.js';
class TextContainer extends React.Component {
	state = { typing: true };
	render() {
		const { data } = this.props;
		const { typing } = this.state;
		return (
			<div className="message__text-container">
				{typing && (
					<div
						className={
							'message__typing ' +
							((data.owner._id == '5ded05e46180969dc7a73838' ||
								data.owner._id == '5ded063a6180969dc7a73839') &&
								'message__typing_black')
						}
					>
						<span></span>
						<span></span>
						<span></span>
					</div>
				)}
				{!typing && (
					<div
						className="message__text visible"
						dangerouslySetInnerHTML={{
							__html: data.text,
						}}
					/>
				)}
			</div>
		);
	}
	componentDidMount() {
		const { time } = this.props;
		setTimeout(() => {
			this.setState({ typing: false });
			const { renderChange } = this.props;
			renderChange();
		}, time);
	}
}

class Message extends React.Component {
	state = {
		typing: true,
		render: this.props.render,
	};

	chooseClass = id => {
		if (id === '5ded05e46180969dc7a73838') {
			return 'message__container_d';
		}
		if (id === '5ded0461efaf9a9dc7729105') {
			return 'message__container_k';
		}
		if (id === '5ded06626180969dc7a7383a') {
			return 'message__container_a';
		}
		if (id === '5ded063a6180969dc7a73839') {
			return 'message__container_g';
		}
	};

	timerTyping = n => {
		const { data } = this.props;
		const timerQ = data[n].text.length * 10 > 700;

		const timer = timerQ ? 700 : data[n].text.length * 10;
		return timer + data[n].index * 1000;
	};

	renderChange = () => {
		// const ren = this.state.render;
		// ren[n] = true;
		// console.log('ren', ren);
		this.setState({ render: true });
	};

	render() {
		const { data } = this.props;
		// this.timerTyping();
		console.log('data', Object.keys(data));
		const container = Object.keys(data).map((item, index) => {
			return (
				<TextContainer
					key={data[item].index}
					data={data[item]}
					time={this.timerTyping(item)}
					renderChange={this.renderChange.bind(this)}
				/>
			);
		});

		return this.state.render ? (
			<div
				className={
					'message__container ' +
					this.chooseClass(data[Object.keys(data)[0]].owner._id)
				}
			>
				<img
					src={data[Object.keys(data)[0]].owner.avatar}
					name={data[Object.keys(data)[0]].owner.name}
					className="message__pic"
				/>
				{Object.keys(data).length > 1 && (
					<div className="message__text-wrapper">{container}</div>
				)}
				{Object.keys(data).length == 1 && container}
			</div>
		) : null;
	}
	componentDidMount() {
		console.log('yep?');
		const { renderChange, data } = this.props;
		setTimeout(() => {
			renderChange(data[Object.keys(data)[0]].index + 1);
		}, this.timerTyping(Object.keys(data)[0]) + 1000);
	}
}

class BlockElem extends React.Component {
	state = {
		block: [],
		i: 0,
		render: [],
	};

	renderChange = n => {
		const ren = this.state.render;
		ren[n] = true;
		console.log('ren', ren);
		this.setState({ render: ren });
	};

	renderAdd = () => {
		const { data } = this.props;
		const ren = this.state.render;
		ren[0] = true;
		for (let i = 1; i < Object.keys(data).length; i++) {
			ren[i] = false;
		}
		this.setState({ render: ren });
	};

	addBlock = () => {
		const { data } = this.props;
		const { block } = this.state;
		// let { i } = this.state;
		let x;
		for (let i = 0; i < Object.keys(data).length; i++) {
			x = i + 1;
			if (
				x < Object.keys(data).length &&
				data[i].owner._id == data[x].owner._id
			) {
				while (data[i].owner._id == data[x].owner._id) {
					x += 1;
				}
				let wrapBlock;
				for (i; i <= x; i++) {
					wrapBlock = Object.assign(wrapBlock, data[i]);
				}
				block.push(
					this.state.render[i] && (
						<Message
							key={
								data[i].block +
								data[i].index +
								' - ' +
								data[x].index
							}
							data={wrapBlock}
							renderChange={this.renderChange.bind(this)}
							render={this.state.render[i]}
						/>
					)
				);
				return;
			} else {
				const dataD = {};
				dataD[i] = data[i];
				block.push(
					this.state.render[i] && (
						<Message
							key={data[i].block + data[i].index}
							data={dataD}
							renderChange={this.renderChange}
							render={this.state.render[i]}
						/>
					)
				);
				// this.setState({ i: i });
			}
		}
	};

	componentDidMount() {
		this.renderAdd();
		this.addBlock();
	}

	render() {
		// console.log('data.length', Object.keys(data).length);
		// Object.keys(data).map(function(key, index)
		// this.addBlock();
		const { block } = this.state;
		return <React.Fragment>{block}</React.Fragment>;
	}
}

// ReactDOM.render(<Message />, document.getElementById('start'));
class Api {
	constructor(options) {
		this.options = options;
	}

	getUserDataById(userId) {
		return fetch(
			this.options.baseUrl + '/users/' + userId,
			Object.assign({}, this.options.header)
		)
			.then(statusRequest)
			.catch(err => console.log(err));
	}

	getUserData(key, value) {
		return fetch(
			this.options.baseUrl + '/users/' + key + '/' + value,
			Object.assign({}, this.options.header)
		)
			.then(statusRequest)
			.catch(err => console.log(err));
	}

	getMessages() {
		return fetch(this.options.baseUrl + '/messages', this.options.header)
			.then(statusRequest)
			.catch(err => console.log('getCard ERROR :', err));
	}

	getMessageByBlock(block) {
		return fetch(
			this.options.baseUrl + '/messages/' + block,
			Object.assign({}, this.options.header)
		)
			.then(statusRequest)
			.catch(err => console.log('addCard ERROR :', err));
	}
}

function statusRequest(res) {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res);
}

const api = new Api({
	baseUrl: 'http://127.0.0.1:3000',
	header: {
		headers: {
			'Content-Type': 'application/json',
		},
	},
});

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
	}
	console.log('dataSort', dataSort);
	blocks.forEach(block => {
		if (block == 'start') {
			ReactDOM.render(
				<BlockElem data={dataSort[block]} />,
				document.getElementById(block)
			);
			$(`#${block}`).attr('appr', 'false');
		}
		// else {
		// 	$(window).scroll(function() {
		// 		if (
		// 			($(this).scrollTop() + $(this).height() >
		// 				$(`#${block}`).position().top) &
		// 			($(`#${block}`).attr('appr') != 'false')
		// 		) {
		// 			const workWithData = new WorkWithData(
		// 				block,
		// 				dataSort[block]
		// 			);
		// 			$(`#${block}`).attr('appr', 'false');
		// 		}
		// 	});
		// }
	});
	// profTypes.forEach(elem => {
	// 	const test = `#${elem}H`;
	// 	console.log('job', test);
	// 	$(`#${elem}H`).click(e => {
	// 		e.preventDefault();
	// 		sidebar.forType(elem);
	// 	});
	// });
	// // Прокручиваем страницу к scrollX и scrollY из localStorage (либо 0,0 если там еще ничего нет)
	// window.scroll(...cords.map(cord => sessionStorage[cord]));
	$('.load-page').css('display', 'none');
});
