import './App.css'
import { useState } from 'react';
import Footer from './Footer';
import Navigator from './Navigator';
import Prompter from './Prompter';
import Directory from './Directory';
import Terminal from './Terminal';
import Content from "./Content";

// Block with different colors first implementing dark mode  

function App() {

  const [showAI, setShowAI] = useState(true);
  const [showDirectory, setDirectory] = useState(false);
  const [showTerminal, setTerminal] = useState(false);

  return (
    <>

      <Content showDirectory={showDirectory} showAI={showAI} showTerminal={showTerminal} />

      <Terminal showTerminal={showTerminal} showDirectory={showDirectory} showAI={showAI} />

      <Prompter showAI={showAI} />

      <Directory showDirectory={showDirectory} />

      <Navigator showAI={showAI} setShowAI={setShowAI} showDirectory={showDirectory} setDirectory={setDirectory} showTerminal={showTerminal} setTerminal={setTerminal} />

      <Footer showAI={showAI} setShowAI={setShowAI} showTerminal={showTerminal} setTerminal={setTerminal} />

    </>
  )
}

export default App
