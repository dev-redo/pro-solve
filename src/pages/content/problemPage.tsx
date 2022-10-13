import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../styles/theme';

window.onload = () => {
  createAllSuccessProblemTab();
};

function createAllSuccessProblemTab() {
  const $userData = document.querySelector('div.jzsqMK') as HTMLDivElement;
  const $userInfo = [...$userData.childNodes][1];

  const button = document.createElement('button');
  button.textContent = '프로필 바로가기';

  button.addEventListener('click', () => {});

  $userData.insertBefore(button, $userInfo);
}
