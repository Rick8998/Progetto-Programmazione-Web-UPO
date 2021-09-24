'use strict';

import App from './app.js';

const navbar = document.getElementById("navbar");
const innerDiv = document.getElementById("innerDiv");
const head = document.getElementsByTagName("head");

//creating our app
const app = new App(navbar, innerDiv);