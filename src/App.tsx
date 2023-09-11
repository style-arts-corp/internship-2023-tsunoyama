import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

function App() {
  return (
    <div>
      <div>
        <p>
          {/* aiaiaiaiaiaiai */}
          test
          {/* Written by yui666a */}
        </p>
      </div>
      <div className="App">
        <header className="App-header">
          
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <StyledButton variant="contained">Contained</StyledButton>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </div>
  );
}

export default App;

const StyledButton = styled(Button)({
  borderRadius: 100,
})
