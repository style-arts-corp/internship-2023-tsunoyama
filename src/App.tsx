import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import Header from './components/modules/Header';
import Checkbox from '@mui/material/Checkbox';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem } from '@mui/base/MenuItem';
import  Dropdown  from '@mui/base/Dropdown';

const appInfoBoxStyle: React.CSSProperties  = {
  margin: "3em",
  padding:"1em",
  fontSize: "calc(10px + 2vmin)",
  backgroundColor: "lightgray",
  textAlign: "start",
};

function App() {
  return (
    <div>
      <div>
        <Header/>
      </div>
      <div className="App">
        <main>
          <div>
            <p className="App-bigtext">入庫時刻</p>
          </div>
          <div className="App-horizontal">
          <Checkbox/><p className="App-smalltext">駐車場料金設定の変更</p>
          </div>
          <div>
            <SetButton variant="contained" sx={{backgroundColor: "lightgray"}}>確認</SetButton>
          </div>
          <div style={appInfoBoxStyle}>
            <p>このサイトの使用方法</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
            <p>-</p>
          </div>
          
        </main>
      </div>
    </div>
  );
}

export default App;

const SetButton = styled(Button)({
  borderRadius: 10,
  color: "black",
  width: 250,
  height: 60,
  fontSize:23
})



