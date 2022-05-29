import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import { useTheme } from './themes/ThemeContext';

function App() {
  const { theme, setTheme } = useTheme();

  function onClickLightTheme() {
    setTheme('light');
  }
  function onClickDarkTheme() {
    setTheme('dark');
  }
  function onClickDefaultTheme() {
    setTheme('system');
  }
  return (
    <div className="App">
      <p>current theme: {theme}</p>
      <Button onClick={onClickLightTheme}>Light</Button>
      <Button onClick={onClickDarkTheme}>Dark</Button>
      <Button onClick={onClickDefaultTheme}>Default</Button>
    </div>
  );
}

export default App;
