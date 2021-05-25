/* eslint-disable */
import '@babel/polyfill';

import { login } from './login';
import { logout } from './login';
import { updateSettings } from './updateSettings';
import { addProject } from './addProject';
import { addFace } from './addFace';

// DOM elements
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const projectDataForm = document.querySelector('.form-project-data');
const faceDataForm = document.querySelector('.form-face-data');

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Обновление...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent =
      'Сохранить пароль';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (projectDataForm)
  projectDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('save').textContent = 'Сохранение...';
    const goalsArr = document.getElementById('goals').value.split(';');
    const targetsArr = document.getElementById('targets').value.split(';');
    const actionsArr = document.getElementById('actions').value.split(';');
    const resultsArr = document.getElementById('results').value.split(';');
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('vol', document.getElementById('vol').value);
    form.append('description', document.getElementById('description').value);
    form.append('city', document.getElementById('city').value);

    for (var i = 0; i < goalsArr.length; i++) {
      form.append('goals[]', goalsArr[i]);
    }

    for (var i = 0; i < targetsArr.length; i++) {
      form.append('targets[]', targetsArr[i]);
    }

    for (var i = 0; i < actionsArr.length; i++) {
      form.append('actions[]', actionsArr[i]);
    }

    for (var i = 0; i < resultsArr.length; i++) {
      form.append('results[]', resultsArr[i]);
    }

    const formLength = document.getElementById('images').files.length;
    for (let i = 0; i < formLength; i++) {
      form.append('images', document.getElementById('images').files[i]);
    }

    await addProject(form);

    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    document.getElementById('goals').value = '';
    document.getElementById('targets').value = '';
    document.getElementById('actions').value = '';
    document.getElementById('results').value = '';
    document.getElementById('city').value = '';
    document.getElementById('vol').value = '';

    document.getElementById('save').textContent = 'Завершено';

    window.setTimeout(() => {
      document.getElementById('save').textContent = 'Добавить';
    }, 3000);
  });

if (faceDataForm)
  faceDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('save').textContent = 'Сохранение...';
    // const bestProjectsArr = document.getElementById('best').value.split(';');
    // const interArr = document.getElementById('international').value.split(';');
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('quote', document.getElementById('quote').value);
    form.append('vocation', document.getElementById('vocation').value);
    form.append('experience', document.getElementById('experience').value);
    form.append(
      'specialization',
      document.getElementById('specialization').value
    );
    form.append('activity', document.getElementById('activity').value);
    // for (var i = 0; i < bestProjectsArr.length; i++) {
    //   form.append('bestProjects[]', bestProjectsArr[i]);
    // }
    // for (var i = 0; i < interArr.length; i++) {
    //   form.append('international[]', interArr[i]);
    // }
    form.append('photo', document.getElementById('image').files[0]);

    await addFace(form);

    document.getElementById('save').textContent = 'Завершено';
    window.setTimeout(() => {
      document.getElementById('save').textContent = 'Добавить';
    }, 3000);
  });
