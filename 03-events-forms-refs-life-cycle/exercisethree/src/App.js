import './App.css';
import React from 'react';
import Customlink from './components/Customlink';

function App() {

  const [clickable, setClickable] = React.useState(true)

  function handleChange() {
    setClickable(!clickable);
  }

  function handleClick() {
    if (clickable) {
      window.open("https://github.com/noahbachmann", "_blank");
    }
  }

  return (
    <div className="App">
      <Customlink link="github.com/noahbachmann" text="GitHub" handleClick={() => handleClick("https://github.com/noahbachmann")} />
      <button onClick={handleChange}>Change</button>
    </div>
  );
}

export default App;
