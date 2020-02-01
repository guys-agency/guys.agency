// const { React, Component } = require('react');
// import React from 'react';

// import * as api from './api.js';

class TextContainer extends React.Component {
  state = { typing: true };
  render() {
    const { data } = this.props;
    const { typing } = this.state;
    let catsReady;
    //категории превращаем в массив для отрисовки
    if (data.imgRef != '') {
      const cats = data.cat.split(', ');
      catsReady = cats.map((elem, i) => {
        return <span key={i}>{elem}</span>;
      });
    }
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
        {!typing &&
          ((data.imgRef === '' && (
            <div
              className="message__text visible"
              dangerouslySetInnerHTML={{
                __html: data.text,
              }}
            />
          )) ||
            (data.imgRef != '' && (
              <div className="message__text visible">
                <div className="message__att">
                  <div className="cat-list">{catsReady}</div>
                  <div className="img-list">
                    <img className="" src={data.imgRef} alt="" />
                  </div>
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data.text,
                  }}
                />
              </div>
            )))}
      </div>
    );
  }
  componentDidMount() {
    const {
      time,
      index,
      renderChange,
      createContainer,
      updateStateParent,
    } = this.props;
    // когда примонтировались ставим таймер для typing
    setTimeout(() => {
      this.setState({ typing: false });
      renderChange(index + 1);
      // и дополнительный таймер для сообщения родителю что элемент отрисован
      setTimeout(() => {
        updateStateParent();
        createContainer();
      }, 500);
    }, time);
  }
}

class TextWrapper extends React.Component {
  state = { render: [], container: [] };
  // заполняем массив false'ми для дальнейшего изменения (этот массив нужен для проверки разрещения на отрисовку элемента)
  renderAdd = () => {
    const { data } = this.props;
    const ren = this.state.render;
    ren[0] = true;
    for (let i = 1; i < Object.keys(data).length; i++) {
      ren[i] = false;
    }
    this.setState({ render: ren });
  };
  //функция для изменения состояния render ребёнком
  renderChangeWrap = n => {
    const ren = this.state.render;
    ren[n] = true;
    this.setState({ render: ren });
  };
  // рассчитывает время для таймера для последующей передачи ребенку
  timerTyping = n => {
    const { data } = this.props;
    const timerQ = data[n].text.length * 10 > 1000;

    const timer = timerQ ? 1000 : data[n].text.length * 30;
    return timer;
  };
  // функция для сообщения родителю, что все элементы переданные классу отрисованы
  updateStateParentWrap = () => {
    const { render } = this.state;
    const { updateStateParent, renderChange } = this.props;
    if (render[render.length - 1]) {
      renderChange(render.length - 2);
      updateStateParent();
    }
  };

  // создание контейнера для отрисовки
  createContainer = () => {
    const { data } = this.props;
    const { render } = this.state;
    const containerNew = Object.keys(data).map((item, index) => {
      return (
        render[index] && (
          <React.Fragment key={data[item].index}>
            <TextContainer
              key={data[item].index}
              data={data[item]}
              time={this.timerTyping(item)}
              renderChange={this.renderChangeWrap}
              createContainer={this.createContainer}
              index={index}
              updateStateParent={this.updateStateParentWrap}
            />
            <br />
          </React.Fragment>
        )
      );
    });
    this.setState({ container: containerNew });
  };

  render() {
    const { container } = this.state;
    return <div className="message__text-wrapper">{container}</div>;
  }
  componentDidMount() {
    this.renderAdd();
    this.createContainer();
  }
}

class Message extends React.Component {
  state = {
    typing: true,
    render: [],
    container: [],
  };

  // выбор класса автора
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

  // рассчитывает время для таймера для последующей передачи ребенку
  timerTyping = n => {
    const { data } = this.props;
    const timerQ = data[n].text.length * 10 > 1000;

    const timer = timerQ ? 1000 : data[n].text.length * 30;
    return timer;
  };

  // заполняем массив false'ми для дальнейшего изменения (этот массив нужен для проверки разрещения на отрисовку элемента)
  renderAdd = () => {
    const { data } = this.props;
    const ren = this.state.render;
    ren[0] = true;
    for (let i = 1; i < Object.keys(data).length; i++) {
      ren[i] = false;
    }
    this.setState({ render: ren });
  };

  //функция для изменения состояния render ребёнком
  renderChange = n => {
    const ren = this.state.render;
    ren[n] = true;
    this.setState({ render: ren });
  };

  // создание контейнера для отрисовки
  createContainer = () => {
    const { data } = this.props;
    const { render } = this.state;
    let containerNew;
    if (Object.keys(data).length > 1) {
      containerNew = (
        <TextWrapper
          key={data[0].index}
          data={data}
          renderChange={this.renderChange.bind(this)}
          createContainer={this.createContainer}
          updateStateParent={this.updateStateParent}
        />
      );
    } else {
      containerNew = Object.keys(data).map((item, index) => {
        return (
          render[index] && (
            <React.Fragment key={data[item].index}>
              <TextContainer
                key={data[item].index}
                data={data[item]}
                time={this.timerTyping(item)}
                renderChange={this.renderChange.bind(this)}
                createContainer={this.createContainer}
                updateStateParent={this.updateStateParent}
              />
            </React.Fragment>
          )
        );
      });
    }
    this.setState({ container: containerNew });
  };

  // функция для сообщения родителю, что все элементы переданные классу отрисованы
  updateStateParent = () => {
    const { render } = this.state;
    const { renderChange, changeBlock } = this.props;
    if (render[render.length - 1]) {
      renderChange(this.props.i + 1, this.props.x);
      changeBlock();
    }
  };

  render() {
    const { data } = this.props;
    const { container } = this.state;

    return (
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

        {container}
      </div>
    );
  }
  componentDidMount() {
    this.renderAdd();
    this.createContainer();
  }
}

class BlockElem extends React.Component {
  state = {
    block: [],
    i: 0,
    render: [],
  };

  //функция для изменения состояния render ребёнком
  renderChange = (s, e) => {
    const ren = [...this.state.render];
    for (let i = s; i <= e; i++) {
      ren[i] = true;
    }
    this.setState({ render: ren });
  };

  // заполняем массив false'ми для дальнейшего изменения (этот массив нужен для проверки разрещения на отрисовку элемента)
  renderAdd = () => {
    const { data } = this.props;
    const ren = this.state.render;
    ren[0] = true;
    for (let i = 1; i < Object.keys(data).length; i++) {
      ren[i] = false;
    }
    this.setState({ render: ren });
  };

  //функция добавления сообщения в блок
  addMessageToBlock = () => {
    const { data } = this.props;
    const newBlock = [...this.state.block];
    let x;
    for (let i = newBlock.length; i < Object.keys(data).length; i++) {
      x = i + 1;
      if (
        x < Object.keys(data).length &&
        data[i].owner._id == data[x].owner._id
      ) {
        while (
          x < Object.keys(data).length &&
          data[i].owner._id == data[x].owner._id
        ) {
          x += 1;
        }
        let wrapBlock = [];
        for (let k = i; k < x; k++) {
          wrapBlock.push(data[k]);
        }
        if (this.state.render[i]) {
          newBlock.push(
            <Message
              key={data[i].block + data[i].index + ' - ' + data[x - 1].index}
              data={wrapBlock}
              renderChange={this.renderChange.bind(this)}
              i={i}
              x={x}
              changeBlock={this.addMessageToBlock}
            />
          );
          for (let g = 0; g < wrapBlock.length - 1; g++) {
            newBlock.push(false);
          }
        }
      } else {
        const dataD = {};
        dataD[i] = data[i];
        this.state.render[i]
          ? newBlock.push(
              <Message
                key={data[i].block + data[i].index}
                data={dataD}
                renderChange={this.renderChange}
                i={i}
                x={i + 1}
                changeBlock={this.addMessageToBlock}
              />
            )
          : null;
      }
      this.setState({ block: newBlock });
    }
  };

  componentDidMount() {
    this.renderAdd();
    this.addMessageToBlock();
  }

  render() {
    const { block, render } = this.state;
    const { nextBlock } = this.props;
    if (render[render.length - 1]) {
      setTimeout(() => {
        renderReady[nextBlock] = true;
      }, 800);
    }
    return <React.Fragment>{block}</React.Fragment>;
  }
}

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
const renderReady = {
  start: true,
  about: false,
  works: false,
  contacts: false,
};
// sessionStorage.clear();

const dataFromApi = api.getMessages().then(data => {
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
  return dataSort;
});

dataFromApi.then(dataSort => {
  blocks.forEach((block, index) => {
    if (block == 'start') {
      ReactDOM.render(
        <BlockElem
          data={dataSort[block]}
          key={block}
          nextBlock={blocks[index + 1]}
        />,
        document.getElementById(block + 'Block')
      );
      $(`#${block}`).attr('appr', 'false');
    } else {
      $(window).scroll(function() {
        if (
          $(this).scrollTop() > $(`#works`).position().top &&
          $(this).scrollTop() <
            $(`#works`).position().top + $(`#works`).height()
        ) {
          document.getElementById('filter').classList.add('active');
        } else {
          document.getElementById('filter').classList.remove('active');
        }
        if (
          $(this).scrollTop() + $(this).height() >
            $(`#${block}`).position().top &&
          $(`#${block}`).attr('appr') != 'false' &&
          renderReady[block]
        ) {
          ReactDOM.render(
            <BlockElem
              data={dataSort[block]}
              key={block}
              nextBlock={blocks[index + 1]}
            />,
            document.getElementById(block + 'Block')
          );
          $(`#${block}`).attr('appr', 'false');
        }
      });
    }
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

$('#menu > li > a').each((index, element) => {
  $(window).scroll(function() {
    if (
      $(this).scrollTop() + $('.header__container').height() >=
        $($(element).attr('href')).position().top &&
      $(this).scrollTop() + $('.header__container').height() <=
        $($(element).attr('href')).position().top +
          $($(element).attr('href')).height()
    ) {
      $(element).addClass('active');
    } else {
      $(element).removeClass('active');
    }
  });
});

$('body').on('click', '[href*="#"]', function(e) {
  dataFromApi.then(dataSort => {
    blocks.forEach((block, index) => {
      ReactDOM.render(
        <BlockElemDontInTurn data={dataSort[block]} key={block} />,
        document.getElementById(block + 'Block')
      );
    });
    const fixed_offset = $('.header__container').height() / 2;
    $('html,body')
      .stop()
      .animate({ scrollTop: $(this.hash).position().top - fixed_offset }, 1000);
    e.preventDefault();
  });
});

class TextContainerDontInTurn extends React.Component {
  render() {
    const { data } = this.props;
    let catsReady;
    //категории превращаем в массив для отрисовки
    if (data.imgRef != '') {
      const cats = data.cat.split(', ');
      catsReady = cats.map((elem, i) => {
        return <span key={i}>{elem}</span>;
      });
    }
    return (
      <div className="message__text-container">
        {(data.imgRef === '' && (
          <div
            className="message__text visible"
            dangerouslySetInnerHTML={{
              __html: data.text,
            }}
          />
        )) ||
          (data.imgRef != '' && (
            <div className="message__text visible">
              <div className="message__att">
                <div className="cat-list">{catsReady}</div>
                <div className="img-list">
                  <img className="" src={data.imgRef} alt="" />
                </div>
              </div>
              <p
                dangerouslySetInnerHTML={{
                  __html: data.text,
                }}
              />
            </div>
          ))}
      </div>
    );
  }
}

class TextWrapperDontInTurn extends React.Component {
  state = { container: [] };

  // создание контейнера для отрисовки
  createContainer = () => {
    const { data } = this.props;
    const containerNew = Object.keys(data).map((item, index) => {
      return (
        <React.Fragment key={data[item].index}>
          <TextContainerDontInTurn key={data[item].index} data={data[item]} />
          <br />
        </React.Fragment>
      );
    });
    this.setState({ container: containerNew });
  };

  render() {
    const { container } = this.state;
    return <div className="message__text-wrapper">{container}</div>;
  }
  componentDidMount() {
    this.createContainer();
  }
}

class MessageDontInTurn extends React.Component {
  state = {
    container: [],
  };

  // выбор класса автора
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

  // создание контейнера для отрисовки
  createContainer = () => {
    const { data } = this.props;
    let containerNew;
    if (Object.keys(data).length > 1) {
      containerNew = <TextWrapperDontInTurn key={data[0].index} data={data} />;
    } else {
      containerNew = Object.keys(data).map((item, index) => {
        return (
          <React.Fragment key={data[item].index}>
            <TextContainerDontInTurn key={data[item].index} data={data[item]} />
          </React.Fragment>
        );
      });
    }
    this.setState({ container: containerNew });
  };

  // функция для сообщения родителю, что все элементы переданные классу отрисованы

  render() {
    const { data } = this.props;
    const { container } = this.state;

    return (
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

        {container}
      </div>
    );
  }
  componentDidMount() {
    this.createContainer();
  }
}

class BlockElemDontInTurn extends React.Component {
  state = {
    block: [],
    i: 0,
  };

  //функция добавления сообщения в блок
  addMessageToBlock = () => {
    const { data } = this.props;
    const newBlock = [];
    let x;
    for (let i = newBlock.length; i < Object.keys(data).length; i++) {
      x = i + 1;
      if (
        x < Object.keys(data).length &&
        data[i].owner._id == data[x].owner._id
      ) {
        while (
          x < Object.keys(data).length &&
          data[i].owner._id == data[x].owner._id
        ) {
          x += 1;
        }
        let wrapBlock = [];
        for (let k = i; k < x; k++) {
          wrapBlock.push(data[k]);
        }
        newBlock.push(
          <MessageDontInTurn
            key={data[i].block + data[i].index + ' - ' + data[x - 1].index}
            data={wrapBlock}
          />
        );
        i = x - 1;
      } else {
        const dataD = {};
        dataD[i] = data[i];
        newBlock.push(
          <MessageDontInTurn key={data[i].block + data[i].index} data={dataD} />
        );
      }
      this.setState({ block: newBlock });
    }
  };

  componentDidMount() {
    this.addMessageToBlock();
  }

  render() {
    const { block } = this.state;
    return <React.Fragment>{block}</React.Fragment>;
  }
}
