import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./styles/style.scss";

import { App } from './components/app';

const ROOT = document.querySelector(".container");

ReactDOM.render(<App />, ROOT);