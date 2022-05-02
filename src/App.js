import React from "react";
import logo from './logo.svg';
import TextField from "@material-ui/core/TextField";
import './App.css';
import {Products} from './components/Products/Products.js';
import {Orders} from './components/Orders/Orders.js';

import {Header} from './components/Header.js';
import {PageHeader} from './components/PageHeader.js';
import {SideMenu} from './components/SideMenu.js';

import {myStyle} from './styles.js'
import {CssBaseline} from '@material-ui/core'
import CategoryIcon from '@mui/icons-material/Category';
import {Login} from './components/Users/Login.js';
import {useState} from 'react';
import {Home} from './components/Home.js';

function App() {
    return (
    <>
      <Login/>
    </>
  )
}

export default App;
