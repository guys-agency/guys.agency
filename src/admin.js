function addCard(block, index, type, cat, text, imgRef, owner) {
  console.log(
    'object',
    JSON.stringify({
      block,
      index,
      type,
      cat,
      text,
      imgRef,
      owner,
    })
  );
  fetch('http://127.0.0.1:3001/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      block,
      index,
      type,
      cat,
      text,
      imgRef,
      owner,
    }),
  })
    .then(statusRequest)
    .then(() => {
      formReset();
    })
    .catch(err => console.log('addCard ERROR :', err));
}

function statusRequest(res) {
  if (res.ok) {
    console.log('res', res);
    return res.json();
  }
  return Promise.reject(res);
}

function formReset() {
  document.forms.addMessage.index.value =
    Number(document.forms.addMessage.index.value) + 1;
  document.forms.addMessage.text.value = '';
  document.forms.addMessage.imgRef.value = '';
}

function selectShow() {
  const len = document.forms.addMessage.cat.options.length;
  let selectElements = '';

  for (let n = 0; n < len; n++) {
    if (document.forms.addMessage.cat.options[n].selected == true) {
      selectElements += `${document.forms.addMessage.cat.options[n].value}, `;
    }
  }

  return selectElements;
}

document.querySelector('#start').addEventListener('click', e => {
  e.preventDefault();
  console.log(
    'document.forms.addMessage.block.value',
    document.forms.addMessage.cat.value
  );

  addCard(
    document.forms.addMessage.block.value,
    document.forms.addMessage.index.value,
    document.forms.addMessage.type.value,
    selectShow(),
    document.forms.addMessage.text.value,
    document.forms.addMessage.imgRef.value,
    document.forms.addMessage.owner.value
  );
  console.log('document.forms.addMessage.cat.value', selectShow());
});

const avatar = {
  '5ded05e46180969dc7a73838': {
    avatar: './images/Message/AvatarLeo.png',
    name: 'Данил Леонов',
  },
  '5ded0461efaf9a9dc7729105': {
    avatar: './images/Message/AvatarKos.png',
    name: 'Константин Граев',
  },
  '5ded063a6180969dc7a73839': {
    avatar: './images/Message/AvatarG.png',
    name: 'Георгий Каташев',
  },
  '5ded06626180969dc7a7383a': {
    avatar: './images/Message/AvatarAnya.png',
    name: 'Ана Водолазко',
  },
};

// class renderMessage {
// 	constructor() {}

$('#preLoad').click(e => {
  e.preventDefault();
  $('.pre-load').empty();
  createMessage();
});

function createMessage() {
  const text = document.createElement('div');
  const textContainer = document.createElement('div');

  text.innerHTML = document.forms.addMessage.text.value;
  textContainer.classList.add('message__text-container');
  text.classList.add('message__text');

  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message__container');
  const img = document.createElement('img');
  img.src = avatar[document.forms.addMessage.owner.value].avatar;

  img.classList.add('message__pic');

  img.classList.add('message__pic');
  textContainer.appendChild(text);
  messageContainer.appendChild(img);
  messageContainer.appendChild(textContainer);

  chooseClass(messageContainer, document.forms.addMessage.owner.value);

  $('.pre-load').append(messageContainer);
  // }
}
// }

function chooseClass(v, id) {
  if (id === '5ded05e46180969dc7a73838') {
    v.classList.add('message__container_d');
  }
  if (id === '5ded0461efaf9a9dc7729105') {
    v.classList.add('message__container_k');
  }
  if (id === '5ded06626180969dc7a7383a') {
    v.classList.add('message__container_a');
  }
  if (id === '5ded063a6180969dc7a73839') {
    v.classList.add('message__container_g');
  }
}
