import React, { useState } from 'react';

import NumberButton from './components/Keys/NumberButton';
import SignButton from './components/Keys/SignButton';
import numberKeys from './components/Keys/numberKeys';
import signKeys from './components/Keys/signKeys';

import './App.css';

function App() {
  const [history, setHistory] = useState('Result = 0');
  const [displayText, setDisplayText] = useState('0');

  return (
    <div className="container">
      <div className="display">
        <div className="display__history">
          {history}
        </div>
        <div id="display">
          {displayText}
        </div>
      </div>
      <div className="buttons">
        <div className="buttons__numbers">
          {numberKeys.map((numberKey) => (
            <NumberButton
              key={numberKey.id}
              butt={numberKey}
              displayText={displayText}
              setDisplayText={setDisplayText}
              setHistory={setHistory}
            />
          ))}
        </div>
        <div className="buttons__separator" />
        <div className="buttons__signs">
          {signKeys.map((signKey) => (
            <SignButton
              key={signKey.id}
              butt={signKey}
              displayText={displayText}
              setDisplayText={setDisplayText}
              setHistory={setHistory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
