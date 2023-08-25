function startPage() {
  let countTex = 0;
  const chatbox = document.querySelector('.chatbox');
  let iaResponse = document.querySelector('.ensinaTexts p');
  let newIaResponse = null;
  const inputElement = document.querySelector('#message');
  const iconInput = document.querySelector('.userInputBox img');
  let userLogin;

  function getCurrentHours() {
    let currentDate = new Date();
    let hours = String(currentDate.getHours()).padStart(2, '0');
    return hours;
  }

  function typeText(text, element, index = 0) {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(() => typeText(text, element, index), 50);
    }
  }

  function showGreeting() {
    let greeting = '';
    if (getCurrentHours() < '12') {
      greeting = 'Bom dia!';
    } else if (getCurrentHours() < '19') {
      greeting = 'Boa tarde!';
    } else if (getCurrentHours() < '24') {
      greeting = 'Boa noite!';
    }
    typeText(greeting, iaResponse);
  }
  showGreeting();

  function isUser() {
    let questionBox = document.createElement('div');
    questionBox.classList.add('questionBox');

    let wantRegister = document.createElement('p');
    wantRegister.classList.add('wantRegister');
    wantRegister.innerHTML = `Já tem cadastro?`;
    questionBox.appendChild(wantRegister);

    let buttonsBox = document.createElement('div');
    buttonsBox.classList.add('buttonsBox');

    let yesBtn = document.createElement('p');
    yesBtn.classList.add('yesBtn');
    yesBtn.innerHTML = `Sim`;
    buttonsBox.appendChild(yesBtn);
    if (window.innerWidth < 992) {
      yesBtn.addEventListener('touchstart', yesButton);
    } else {
      yesBtn.addEventListener('click', yesButton);
    }

    let noBtn = document.createElement('p');
    noBtn.classList.add('noBtn');
    noBtn.innerHTML = `Não`;
    buttonsBox.appendChild(noBtn);
    if (window.innerWidth < 992) {
      noBtn.addEventListener('touchstart', noButton);
    } else {
      noBtn.addEventListener('click', noButton);
    }

    questionBox.appendChild(buttonsBox);
    chatbox.appendChild(questionBox);

    function yesButton() {
      noBtn.classList.remove('actived');
      yesBtn.classList.add('actived');
      let newMsg = 'Digite seu e-mail.';
      countTex++;
      makeLogin(countTex, newMsg);
      focusInput();
      inputElement.disabled = false;
      if (window.innerWidth < 992) {
        iconInput.addEventListener('touchstart', addEventInIcon);
        yesBtn.removeEventListener('touchstart', yesButton);
        noBtn.removeEventListener('touchstart', noButton);
      } else {
        iconInput.addEventListener('click', addEventInIcon);
        yesBtn.removeEventListener('click', yesButton);
        noBtn.removeEventListener('click', noButton);
      }
      // Remove event
    }
    function noButton() {
      yesBtn.classList.remove('actived');
      noBtn.classList.add('actived');
      newRegister();
      // Remove event
      if (window.innerWidth < 992) {
        yesBtn.removeEventListener('touchstart', yesButton);
        noBtn.removeEventListener('touchstart', noButton);
      } else {
        yesBtn.removeEventListener('click', yesButton);
        noBtn.removeEventListener('click', noButton);
      }
    }
    if (window.innerWidth < 992) scrollToBottom();
    else {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }

  function focusInput() {
    setTimeout(() => inputElement.focus(), 500);
  }

  function newRegister() {
    //Create new register
    inputElement.setAttribute('type', 'text');
    inputElement.setAttribute('id', 'acessKey');
    inputElement.setAttribute('name', 'login_chave');
    let newMsg = 'Seja bem vindo(a)! Vamos fazer seu cadastro.';
    countTex++;
    if (window.innerWidth < 992) {
      iconInput.addEventListener('touchstart', addEventInIcon);
    } else {
      iconInput.addEventListener('click', addEventInIcon);
    }
    makeLogin(countTex, newMsg);
    setTimeout(() => {
      let newMsg = 'Informe sua chave de acesso.';
      countTex++;
      makeLogin(countTex, newMsg);
    }, 3000);
    setTimeout(() => {
      inputElement.disabled = false;
    }, 4400);
  }

  function isValidAcessKey(userText) {
    countTex++;
    if (window.innerWidth < 992) {
      iconInput.removeEventListener('touchstart', addEventInIcon);
    } else {
      iconInput.removeEventListener('click', addEventInIcon);
    }
    let newMsg = 'Estamos verificando a chave informada...';
    makeLogin(countTex, newMsg);
    setTimeout(() => {
      countTex++;
      newMsg =
        '*ESTA CHAVE SERÁ ENVIADA POR E-MAIL APÓS A CONFIRMAÇÃO DA SUA COMPRA.';
      makeLogin(countTex, newMsg);
    }, 3000);
    setTimeout(() => {
      createAnimation();
      newLoginWithAcessKey(userText);
    }, 7200);
  }
  function newLoginWithAcessKey(userText) {
    let loadingBoxList = [...document.querySelectorAll('.loadingBox')];
    document.getElementById('form-login-chave').value = userText;
    setTimeout(() => {
      document.getElementById('form-login-ativar-chave-btn').click();
    }, 2000);
    setTimeout(() => {
      loadingBoxList.forEach((e) => (e.style.display = 'none'));
    }, 3500);
  }
  function makeLogin(countTex, newMsg) {
    let newBox = document.createElement('div');
    newBox.innerHTML = `
    <div class="ensinaTexts newText${countTex}">
      <img src="img/logo-q.png" alt="Ensina Ai logo" />
        <p></p>
    </div>`;
    chatbox.appendChild(newBox);
    newIaResponse = document.querySelector(`.newText${countTex} p`);
    if (iaResponse && newIaResponse) {
      typeText(newMsg, newIaResponse);
      setTimeout(focusInput, 1500);
    }
    if (window.innerWidth < 992) scrollToBottom();
    else {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }
  inputElement.addEventListener('keydown', function (event) {
    event.stopPropagation();
    let userText;
    if (event.key === 'Enter' || event.keyCode === 13) {
      event.preventDefault();
      userText = inputElement.value;
      if (inputElement.id === 'message') {
        createUserText(userText);
        if (isEmail(userText)) {
          emailIsValid();
        } else {
          emailNoValid();
        }
      }
      if (inputElement.id === 'password') {
        if (isPassWord(userText)) {
          let newMsg = 'Senha validada com sucesso! Vamos efetuar seu login...';
          countTex++;
          makeLogin(countTex, newMsg);
          setTimeout(createAnimation, 3000);

          doingLoginDRM();
        } else {
          inputElement.value = '';
          countTex++;
          let newMsg = `Senha inválida. A senha precisa ter de 6 a 20 caracteres, pelo menos um número e uma letra maiúscula ou minúscula.`;
          makeLogin(countTex, newMsg);
        }
      }
      if (inputElement.id === 'acessKey') {
        inputElement.value = '';
        showUserAcessKey(userText);
      }
    }
    if (window.innerWidth < 992) scrollToBottom();
    else {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  });
  function addEventInIcon(event) {
    let userText;
    event.preventDefault();
    event.stopPropagation();
    userText = inputElement.value;
    if (inputElement.id === 'message') {
      createUserText(userText);
      if (isEmail(userText)) {
        emailIsValid();
      } else {
        emailNoValid();
      }
    }
    if (inputElement.id === 'password') {
      if (isPassWord(userText)) {
        let newMsg = 'Senha validada com sucesso! Vamos efetuar seu login...';
        inputElement.value = '';
        countTex = 5;
        makeLogin(countTex, newMsg);
        setTimeout(createAnimation, 3000);

        doingLoginDRM();
      } else {
        inputElement.value = '';
        countTex++;
        let newMsg = `Senha inválida. A senha precisa ter de 6 a 20 caracteres, pelo menos um número e uma letra maiúscula ou minúscula.`;
        makeLogin(countTex, newMsg);
      }
    }
    if (inputElement.id === 'acessKey') {
      showUserAcessKey(userText);
      inputElement.value = '';
    }
    if (window.innerWidth < 992) scrollToBottom();
    else {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }
  function showUserAcessKey(userText) {
    let userTextBox = document.createElement('div');
    userTextBox.classList.add('userTexts');
    userTextBox.innerHTML = `
    <p class="userWrittenText" id='form-login-chave'>${userText}</p>
    <div class="arrowChatUser"></div>
    <img src="img/no_user.jpg" alt="No user" class="noUserImage" />
    `;
    chatbox.appendChild(userTextBox);
    isValidAcessKey(userText);
    inputElement.value = '';
    if (window.innerWidth < 992) scrollToBottom();
    else {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }
  function createAnimation() {
    const animationBox = document.createElement('div');
    animationBox.classList.add('ensinaTexts', 'loadingBox');
    animationBox.innerHTML = `
    <img src="img/logo-q.png" alt="Ensina Ai logo" />
      <p class="loadingElemnent">
      <span></span><span></span><span></span>
     </p>
    `;
    chatbox.appendChild(animationBox);
    inputElement.disabled = true;
    if (window.innerWidth < 992) {
      iconInput.removeEventListener('touchstart', addEventInIcon);
    } else {
      iconInput.removeEventListener('click', addEventInIcon);
    }
    if (window.innerWidth < 992) scrollToBottom();
    else {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }
  function createUserText(userText) {
    let userTextBox = document.createElement('div');
    userTextBox.classList.add('userTexts');
    userTextBox.innerHTML = `
    <p class="userWrittenText">${userText}</p>
    <div class="arrowChatUser"></div>
    <img src="img/no_user.jpg" alt="No user" class="noUserImage" />
    `;
    chatbox.appendChild(userTextBox);
    inputElement.value = '';
    if (window.innerWidth < 992) scrollToBottom();
    else {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }
  const isEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  function emailIsValid() {
    const userEmailList = [...document.querySelectorAll('.userWrittenText')];
    for (let i = 0; i < userEmailList.length; i++) {
      if (isEmail(userEmailList[i].textContent)) {
        userEmailList[i].id = 'loginFarm';
        document.querySelector('#form-login-login').value =
          userEmailList[i].textContent;
        countTex++;
        userLogin = userEmailList[i].textContent;
      }
    }
    enterPassword();
    return userLogin;
  }
  function emailNoValid() {
    countTex++;
    let newMsg =
      'O e-mail digitado é invalido. Por favor, digite um email valido.';
    let newBox = document.createElement('div');
    newBox.innerHTML = `
    <div class="ensinaTexts newText${countTex}">
      <img src="img/logo-q.png" alt="Ensina Ai logo" />
        <p></p>
    </div>`;
    chatbox.appendChild(newBox);
    newIaResponse = document.querySelector(`.newText${countTex} p`);
    if (iaResponse && newIaResponse) {
      typeText(newMsg, newIaResponse);
      setTimeout(focusInput, 1500);
    }
    if (window.innerWidth < 992) scrollToBottom();
    else {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }
  const isPassWord = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/;
    return regex.test(password);
  };
  function changeInputToPassWord() {
    setTimeout(() => {
      inputElement.setAttribute('type', 'password');
      inputElement.setAttribute('id', 'password');
      inputElement.setAttribute('name', 'password');
    }, 3200);
  }
  function enterPassword() {
    changeInputToPassWord();
    countTex++;
    let newMsg = `E-mail validado com sucesso! \nAgora digite sua senha.`;
    let newBox = document.createElement('div');
    newBox.innerHTML = `
    <div class="ensinaTexts newPass${countTex} passWord">
    <img src="img/logo-q.png" alt="Ensina Ai logo" />
    <p></p>
    </div>`;
    chatbox.appendChild(newBox);
    newIaResponse = document.querySelector(`.newPass${countTex} p`);
    if (iaResponse && newIaResponse) {
      typeText(newMsg, newIaResponse);
      setTimeout(focusInput, 1500);
    }
    //
    if (window.innerWidth < 992) scrollToBottom();
    else {
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  }

  window.onload = function () {
    setTimeout(isUser, 900);
  };

  function doingLoginDRM() {
    if (window.innerWidth < 992) {
      iconInput.removeEventListener('touchstart', addEventInIcon);
    } else {
      iconInput.removeEventListener('click', addEventInIcon);
    }
    const inputElement = document.querySelector('#password');

    let userPassWord = inputElement.value;
    inputElement.disabled = true;

    document.querySelector('#form-login-senha').value = userPassWord;
    setTimeout(() => {
      document.getElementById('form-login-entrar').click();
    }, 2000);
    setTimeout(() => {
      msgError();
    }, 6000);
    inputElement.value = '';
  }
  function msgError() {
    chatbox.scrollTop = chatbox.scrollHeight;
    let loadingBoxList = [...document.querySelectorAll('.loadingBox')];
    const labelError = document.querySelector('#form-login-label');
    if (labelError.textContent === 'Login ou senha não conferem') {
      loadingBoxList.forEach((e) => (e.style.display = 'none'));
      let newMsg = 'Login ou senha não conferem.';
      countTex++;
      makeLogin(countTex, newMsg);
      document.querySelector('#form-login-senha').value = '';
      setTimeout(() => {
        let newMsg = 'Digite novamente o Login e após verificação, sua senha.';
        countTex++;
        makeLogin(countTex, newMsg);
      }, 2000);
      setTimeout(() => {
        inputElement.setAttribute('type', 'email');
        inputElement.setAttribute('id', 'message');
        inputElement.setAttribute('name', 'email');
        isUser();
      }, 5400);
    }
  }

  if (window.innerWidth < 992) {
    iconInput.addEventListener('touchstart', addEventInIcon);
    let isKeyboardActive = false;
    window.addEventListener('focusin', () => {
      isKeyboardActive = true;
    });
    window.addEventListener('focusout', () => {
      isKeyboardActive = false;
    });
    function scrollToBottom() {
      if (!isKeyboardActive) {
        chatbox.scrollTop = chatbox.scrollHeight;
      }
    }
  } else {
    iconInput.addEventListener('click', addEventInIcon);
  }
}
startPage();
