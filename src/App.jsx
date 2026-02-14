import './App.css'
import { useState } from 'react';
import Footer from './components/Footer';
import Navigator from './components/Navigator';
import Prompter from './components/Prompter';
import Directory from './components/Directory';
import Terminal from './components/Terminal';
import Content from "./components/Content";

// Block with different colors first implementing dark mode  

function App() {

  const [showAI, setShowAI] = useState(true);
  const [showDirectory, setDirectory] = useState(false);
  const [showTerminal, setTerminal] = useState(false);

  return (
    <>

      <Content showDirectory={showDirectory} showAI={showAI} showTerminal={showTerminal} />

      <Terminal showTerminal={showTerminal} setTerminal={setTerminal} showDirectory={showDirectory} showAI={showAI} />

      <Prompter showAI={showAI} setShowAI={setShowAI} />

      <Directory showDirectory={showDirectory} />

      <Navigator showAI={showAI} setShowAI={setShowAI} showDirectory={showDirectory} setDirectory={setDirectory} showTerminal={showTerminal} setTerminal={setTerminal} />

      <Footer showAI={showAI} setShowAI={setShowAI} showTerminal={showTerminal} setTerminal={setTerminal} />

    </>
  )
}

export default App
