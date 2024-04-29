import React from 'react';

import 'app/styles/index.scss';
import css from './App.module.css';

import { withProviders } from "app/provider";

import { Routing } from "pages";

function App() {
  return ( 
    <Routing />
  );
}

export default withProviders(App);
