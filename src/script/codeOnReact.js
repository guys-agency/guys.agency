// const { React, Component } = require('react');
// import React from 'react';

// import * as api from './api.js';

class Work extends React.Component {
  state = { typing: true };

  createContainer = n => {
    return container;
  };

  render() {
    const { data } = this.props;
    const { typing } = this.state;

    const cats = data.cat.split(', ');
    const catsReady = cats.map((elemCat, i) => {
      return <span key={i}>{elemCat}</span>;
    });
    const imgs = data.imgRef.split(', ');
    const imgsContainer = imgs.map((elemImg, i) => {
      return (
        <div
          key={i}
          style={{
            backgroundImage: 'url(' + elemImg + ')',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
          alt=""
        ></div>
      );
    });
    return (
      <div className="message__text-container" key={data.index}>
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
          <div className="message__text visible">
            <div className="message__att">
              <div className="cat-list">{catsReady}</div>
              <div className="img-list">{imgsContainer}</div>
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: data.text,
              }}
            />
          </div>
        )}
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

      // и дополнительный таймер для сообщения родителю что элемент отрисован
      setTimeout(
        () => {
          renderChange(index + 1);
          updateStateParent();
        },
        this.props.dontInTurn ? 1 : 500
      );
    }, time);
  }
}

class WorksContainer extends React.Component {
  state = { typing: true, render: [], coutWork: 3, data: [...this.props.data] };

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
  renderChangeWork = n => {
    const ren = this.state.render;
    ren[n] = true;
    this.setState({ render: ren });
  };
  // рассчитывает время для таймера для последующей передачи ребенку
  timerTyping = n => {
    if (this.props.dontInTurn) {
      return 0;
    }
    const { data } = this.state;
    const timerQ = data[n].text.length * 10 > 700;

    const timer = timerQ ? 700 : data[n].text.length * 30;
    return timer;
  };
  // функция для сообщения родителю, что все элементы переданные классу отрисованы
  updateStateParentWork = () => {
    const { render } = this.state;
    const { updateStateParent, renderChange } = this.props;
    if (render[this.state.coutWork + 1]) {
      renderChange(
        this.props.firstElem,
        this.props.firstElem + this.props.countElem
      );
      updateStateParent();
    }
  };

  worksFilter = () => {
    const allWorks = this.props.data;
    let thisInClass = this;

    $('body').on('click', '[href^="sort"]', function(e) {
      const newData = allWorks.filter(elem => {
        return elem.cat.includes(
          $(this)
            .attr('href')
            .split('sort')[1]
        );
      });
      thisInClass.setState({ data: newData, render: [] });
      thisInClass.renderAdd();
      e.preventDefault();
    });
  };

  addWorkToRender = () => {
    const newCountWork = this.state.coutWork + 1;
    this.setState({ coutWork: newCountWork });
  };

  createContainer = n => {
    const { data, render } = this.state;
    const container = data.map((elem, index) => {
      if (index <= n) {
        //категории превращаем в массив для отрисовки
        return (
          render[index] && (
            <React.Fragment key={index}>
              <Work
                data={elem}
                time={this.timerTyping(index)}
                renderChange={this.renderChangeWork}
                createContainer={this.createContainer}
                index={index}
                updateStateParent={this.updateStateParentWork}
                dontInTurn={this.props.dontInTurn}
              />
              <br />
            </React.Fragment>
          )
        );
      }
    });
    return container;
  };

  render() {
    const { coutWork } = this.state;

    return (
      <React.Fragment>
        {this.createContainer(coutWork)}
        <button onClick={this.addWorkToRender} className="button">
          Еще работ мне!!
        </button>
      </React.Fragment>
    );
  }
  componentDidMount() {
    this.renderAdd();
    this.worksFilter();
  }
}

class TextContainer extends React.Component {
  state = { typing: true, classSS: '' };

  classfada = () => {
    if (this.props.data.type == 'stickers' && !this.state.typing) {
      return 'message__text-container message__text-container_sticker';
    } else {
      return 'message__text-container';
    }
  };

  render() {
    const { data } = this.props;
    const { typing } = this.state;
    this.test();

    return (
      <div className={this.classfada()}>
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
        {(!typing && data.type == 'message' && (
          <div
            className={'message__text ' + this.state.classSS}
            dangerouslySetInnerHTML={{
              __html: data.text,
            }}
          />
        )) ||
          (data.type == 'stickers' && (
            <img className="message__sticker" src={data.imgRef} />
          ))}
      </div>
    );
  }

  test = () => {
    setTimeout(() => {
      this.setState({ classSS: 'visible' });
    }, 0);
  };

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
      setTimeout(
        () => {
          updateStateParent();
          createContainer();
        },
        this.props.dontInTurn ? 10 : 500
      );
    }, time);
  }
}

class TextWrapper extends React.Component {
  state = {
    render: [],
    container: [],
    workData: [],
    countElem: 0,
    firstElem: 0,
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
  renderChangeWrap = n => {
    const ren = this.state.render;
    ren[n] = true;
    this.setState({ render: ren });
  };

  renderChangeForWork = (s, e) => {
    const ren = [...this.state.render];
    for (let i = s; i <= e; i++) {
      ren[i] = true;
    }
    this.setState({ render: ren });
  };
  // рассчитывает время для таймера для последующей передачи ребенку
  timerTyping = n => {
    if (this.props.dontInTurn) {
      return 10;
    }
    const { data } = this.props;
    const timerQ = data[n].text.length * 10 > 700;

    const timer = timerQ ? 700 : data[n].text.length * 30;
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

  workContainer = () => {
    const { data } = this.props;
    const workContainer = [];
    let firstElemNew = null;
    let countElemNew = 0;
    Object.keys(data).forEach((elem, index) => {
      if (data[elem].type === 'work') {
        if (firstElemNew === null) {
          firstElemNew = index;
        }
        countElemNew += 1;
        workContainer.push(data[elem]);
      }
    });
    this.setState({
      workData: workContainer,
      firstElem: firstElemNew,
      countElem: countElemNew,
    });
  };

  // создание контейнера для отрисовки
  createContainer = () => {
    const { data } = this.props;
    const { render, workData } = this.state;
    let worksAllreadyDone = false;
    const containerNew = Object.keys(data).map((item, index) => {
      if (data[item].type != 'work' || !worksAllreadyDone) {
        if (render[index] && data[item].type != 'work') {
          return (
            <React.Fragment key={data[item].index}>
              <TextContainer
                key={data[item].index}
                data={data[item]}
                time={this.timerTyping(item)}
                renderChange={this.renderChangeWrap}
                createContainer={this.createContainer}
                index={index}
                updateStateParent={this.updateStateParentWrap}
                dontInTurn={this.props.dontInTurn}
              />
              <br />
            </React.Fragment>
          );
        } else if (render[index] && data[item].type == 'work') {
          worksAllreadyDone = true;
          return (
            <WorksContainer
              key={data[item].index}
              data={workData}
              time={this.timerTyping(item)}
              renderChange={this.renderChangeForWork}
              createContainer={this.createContainer}
              index={index}
              updateStateParent={this.updateStateParentWrap}
              firstElem={this.state.firstElem}
              countElem={this.state.countElem}
              dontInTurn={this.props.dontInTurn}
            />
          );
        }
      }
    });
    this.setState({ container: containerNew });
  };

  render() {
    const { container } = this.state;
    return <div className="message__text-wrapper">{container}</div>;
  }
  componentDidMount() {
    this.workContainer();
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
    if (this.props.dontInTurn) {
      return 10;
    }
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
          dontInTurn={this.props.dontInTurn}
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
                dontInTurn={this.props.dontInTurn}
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

  renderSidebar = () => {
    const { data } = this.props;
    const sidebarItemContainer = (
      <SidebarItem dataUser={data[Object.keys(data)[0]].owner} />
    );
    ReactDOM.render(
      <Sidebar sidebarItemContainer={sidebarItemContainer} />,
      document.getElementById('sidebar')
    );
    document.getElementById('sidebar').classList.add('active');
  };

  renderSidebarProf = () => {
    profTypes.forEach(elem => {
      $(`#${elem}H`).click(e => {
        e.preventDefault();
        api.getUserData('type', elem).then(data => {
          const container = Object.keys(data).map(elem => {
            return <SidebarItem dataUser={data[elem]} key={elem} />;
          });
          ReactDOM.render(
            <Sidebar sidebarItemContainer={container} />,
            document.getElementById('sidebar')
          );
          $('.sidebar').addClass('active');
        });
      });
    });
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
          onClick={this.renderSidebar}
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
    if (blocks[this.props.indexBlock] == 'about') {
      this.renderSidebarProf();
    }
  }
}

class BlockElem extends React.Component {
  state = {
    block: [],
    i: 0,
    render: [],
    dontInTurn: this.props.dontInTurn,
    renderNextBlock: false,
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
              indexBlock={this.props.indexBlock}
              dontInTurn={this.state.dontInTurn}
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
                indexBlock={this.props.indexBlock}
                dontInTurn={this.state.dontInTurn}
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
    // let thisInClass = this;

    // let clickHasBeen = false;
    // $('body').on('click', '[href*="#"]', function(e) {
    //   debugger;
    //   thisInClass.setState({ dontInTurn: true });
    //   // blocks.forEach((block, index) => {
    //   //   ReactDOM.render(
    //   //     <BlockElemDontInTurn data={dataSort[block]} key={block} />,
    //   //     document.getElementById(block + 'Block')
    //   //   );
    //   // });
    //   // profTypes.forEach(elem => {
    //   //   $(`#${elem}H`).click(e => {
    //   //     e.preventDefault();
    //   //     api.getUserData('type', elem).then(data => {
    //   //       const container = Object.keys(data).map(elem => {
    //   //         return <SidebarItem dataUser={data[elem]} key={elem} />;
    //   //       });
    //   //       ReactDOM.render(
    //   //         <Sidebar sidebarItemContainer={container} />,
    //   //         document.getElementById('sidebar')
    //   //       );
    //   //       $('.sidebar').addClass('active');
    //   //     });
    //   //   });

    //   const fixed_offset = $('.header__container').height() / 2;
    //   if (clickHasBeen) {
    //     $('html,body')
    //       .stop()
    //       .animate(
    //         { scrollTop: $(this.hash).position().top - fixed_offset },
    //         1000
    //       );
    //   } else {
    //     setTimeout(() => {
    //       $('html,body')
    //         .stop()
    //         .animate(
    //           { scrollTop: $(this.hash).position().top - fixed_offset },
    //           1000
    //         );
    //     }, 2000);
    //   }
    //   clickHasBeen = true;
    //   e.preventDefault();
    // });
  }

  render() {
    const { block, render } = this.state;
    const { changeRenderReady, indexBlock } = this.props;
    // проверяет, отрисовывается последнее ли сообщение, и если да, то дает сигнал на отрисовку следующего блока
    const nextIndex = indexBlock + 1;
    if (
      render[render.length - 1] &&
      (nextIndex < blocks.length || blocks[indexBlock] == 'contacts') &&
      !this.state.renderNextBlock
    ) {
      renderReady[blocks[indexBlock]] = true;
      if (blocks[indexBlock] != 'contacts') {
        setTimeout(
          () => {
            $(`#${blocks[nextIndex]}Title`).addClass('active');
            setTimeout(
              () => {
                // changeRenderReady(this.props.indexBlock, nextIndex);
                dataFromApi.then(dataSort => {
                  ReactDOM.render(
                    <BlockElem
                      data={dataSort[blocks[nextIndex]]}
                      key={blocks[nextIndex]}
                      indexBlock={nextIndex}
                      dontInTurn={this.state.dontInTurn}
                    />,
                    document.getElementById(blocks[nextIndex] + 'Block')
                  );
                });
              },
              this.state.dontInTurn ? 1 : 600
            );
          },
          this.state.dontInTurn ? 1 : 500
        );
      }
      this.setState({ renderNextBlock: true });
    }
    //отрисовка блока
    return <React.Fragment>{block}</React.Fragment>;
  }
}

// class App extends React.Component {
//   state = { renderReady: this.props.renderReady, blocks: this.props.blocks };

//   renderAllBlocks = () => {
//     const { blocks, renderReady } = this.state;
//     blocks.forEach((elem, index) => {
//       if (renderReady[elem]) {
//         dataFromApi.then(dataSort => {
//           ReactDOM.render(
//             <BlockElem
//               data={dataSort[elem]}
//               key={elem}
//               indexBlock={index}
//               dontInTurn={true}
//               changeRenderReady={this.changeRenderReady}
//             />,
//             document.getElementById(elem + 'Block')
//           );
//         });
//       }
//     });
//   };

//   componentWillUnmount() {
//     console.log('object');
//   }

//   changeRenderReady = (index, nextIndex) => {
//     const renderReadyNew = this.state.renderReady;
//     const { blocks } = this.state;
//     renderReadyNew[blocks[nextIndex]] = true;
//     renderReadyNew[blocks[index]] = false;
//     this.setState({ renderReady: renderReadyNew });
//   };

//   render() {
//     this.renderAllBlocks();
//     return null;
//   }
// }

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
      .then(data => {
        return data['data'];
      })
      .catch(err => console.log(err));
  }

  getMessages() {
    return fetch(this.options.baseUrl + '/messages', this.options.header)
      .then(statusRequest)
      .catch(err => console.log('getCard ERROR :', err));
  }

  getWorksByCat(cat) {
    return fetch(
      this.options.baseUrl + '/messages/' + cat,
      Object.assign({}, this.options.header)
    )
      .then(statusRequest)
      .then(data => {
        return data['data'];
      })
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
  baseUrl: 'http://127.0.0.1:3001',
  header: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
});

const blocks = ['start', 'about', 'works', 'contacts'];
const profTypes = ['designs', 'devs', 'marketers'];
const renderReady = {
  start: false,
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
  // ReactDOM.render(
  //   <App blocks={blocks} key={blocks[0]} renderReady={renderReady} />,
  //   document.getElementById('TEST')
  // );
  ReactDOM.render(
    <BlockElem
      data={dataSort[blocks[0]]}
      key={blocks[0]}
      indexBlock={0}
      dontInTurn={false}
    />,
    document.getElementById(blocks[0] + 'Block')
  );
  // blocks.forEach((block, index) => {
  //   if (block == 'start') {
  //     ReactDOM.render(
  //       <BlockElem
  //         data={dataSort[block]}
  //         key={block}
  //         nextBlock={blocks[index + 1]}
  //       />,
  //       document.getElementById(block + 'Block')
  //     );
  //     $(`#${block}`).attr('appr', 'false');
  //   } else {
  //     $(window).scroll(function() {
  //       if (
  //         $(this).scrollTop() > $(`#works`).position().top &&
  //         $(this).scrollTop() <
  //           $(`#works`).position().top + $(`#works`).height()
  //       ) {
  //         document.getElementById('filter').classList.add('active');
  //       } else {
  //         document.getElementById('filter').classList.remove('active');
  //       }
  //       if (
  //         $(this).scrollTop() + $(this).height() >
  //           $(`#${block}`).position().top &&
  //         $(`#${block}`).attr('appr') != 'false' &&
  //         renderReady[block]
  //       ) {
  //         ReactDOM.render(
  //           <BlockElem
  //             data={dataSort[block]}
  //             key={block}
  //             nextBlock={blocks[index + 1]}
  //           />,
  //           document.getElementById(block + 'Block')
  //         );
  //         $(`#${block}`).attr('appr', 'false');
  //       }
  //     });
  //   }
  // });
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
      $(this).scrollTop() > $(`#works`).position().top &&
      $(this).scrollTop() < $(`#works`).position().top + $(`#works`).height()
    ) {
      document.getElementById('filter').classList.add('active');
    } else {
      document.getElementById('filter').classList.remove('active');
    }
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

let allreadyLoad = false;

$('body').on('click', '[href*="#"]', function(e) {
  const fixed_offset = $('.header__container').height() / 2;
  allreadyLoad = Object.keys(renderReady).every(elem => {
    return renderReady[elem];
  });
  console.log('renderReady', renderReady);
  console.log('allreadyLoad', allreadyLoad);
  setTimeout(
    () => {
      $('html,body')
        .stop()
        .animate(
          { scrollTop: $(this.hash).position().top - fixed_offset },
          1000
        );
    },
    allreadyLoad ? 0 : 800
  );
  if (!allreadyLoad) {
    let renderElem;
    Object.keys(renderReady).find(elem => {
      if (!renderReady[elem]) {
        renderElem = elem;
        return true;
      }
    });
    dataFromApi.then(dataSort => {
      ReactDOM.unmountComponentAtNode(
        document.getElementById(renderElem + 'Block')
      );
      ReactDOM.render(
        <BlockElem
          data={dataSort[renderElem]}
          key={renderElem}
          indexBlock={blocks.indexOf(renderElem)}
          dontInTurn={true}
        />,
        document.getElementById(renderElem + 'Block')
      );
    });
    allreadyLoad = true;
  }

  // blocks.forEach((block, index) => {
  //   ReactDOM.render(
  //     <BlockElemDontInTurn data={dataSort[block]} key={block} />,
  //     document.getElementById(block + 'Block')
  //   );
  // });
  // profTypes.forEach(elem => {
  //   $(`#${elem}H`).click(e => {
  //     e.preventDefault();
  //     api.getUserData('type', elem).then(data => {
  //       const container = Object.keys(data).map(elem => {
  //         return <SidebarItem dataUser={data[elem]} key={elem} />;
  //       });
  //       ReactDOM.render(
  //         <Sidebar sidebarItemContainer={container} />,
  //         document.getElementById('sidebar')
  //       );
  //       $('.sidebar').addClass('active');
  //     });
  //   });

  e.preventDefault();
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

const Sidebar = props => {
  const sidebarItemContainer = props.sidebarItemContainer;
  $(document).click(function(event) {
    if ($(event.target).closest('.sidebar').length) return;
    $('.sidebar').removeClass('active');
    $(document).unbind();
  });
  return (
    <React.Fragment>
      <div className="sidebar__header">
        <a href="" id="sidebarClose" onClick={removeSidebar}>
          закрыть
        </a>
      </div>
      <div className="sidebar__container">{sidebarItemContainer}</div>
    </React.Fragment>
  );
};

const SidebarItem = props => {
  const dataUser = props.dataUser;
  return (
    <div className="sidebar__item">
      <div className="item-head">
        <img src={dataUser.avatarL} id="sidebaravatarL" alt="" />
        <div className="desc">
          <h3 id="sidebarname">{dataUser.name}</h3>
          <span id="sidebarregalias">{dataUser.regalias}</span>
          <div className="mail">
            <a className="blue" id="sidebaremail" href={dataUser.email}>
              написать сообщение
            </a>
          </div>
        </div>
      </div>
      <div className="item-desc">
        <div className="title">о себе</div>
        <p
          id="sidebarabout"
          dangerouslySetInnerHTML={{
            __html: dataUser.about,
          }}
        />
      </div>
    </div>
  );
};

const removeSidebar = e => {
  e.preventDefault();
  console.log('e.target', e.target);
  $('.sidebar').removeClass('active');
  $('#tempContainer').remove();
};

const test = () => {
  e.preventDefault();
  const sss = this;
  console.log('test', sss);
};
