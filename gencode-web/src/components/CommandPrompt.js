import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

const CommandPrompt = ({ onCommand, user }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newEntry = {
      command: input,
      timestamp: new Date().toLocaleTimeString(),
      user: user.name
    };

    setHistory([...history, newEntry]);
    onCommand(input);
    setInput('');
  };

  return (
    <div className="command-prompt">
      <div className="prompt-header">
        <span className="prompt-user">{user.name}@upload-app</span>
        <span className="prompt-dir">~/uploads</span>
      </div>
      <div className="history">
        {history.map((entry, index) => (
          <div key={index} className="history-entry">
            <span className="prompt-line">
              <span className="prompt-user">{entry.user}@upload-app</span>
              <span className="prompt-dir">~/uploads</span>$
            </span>
            <span className="prompt-command">{entry.command}</span>
            <div className="prompt-output">{entry.timestamp} - Command executed</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="prompt-form">
        <span className="prompt-line">
          <span className="prompt-user">{user.name}@upload-app</span>
          <span className="prompt-dir">~/uploads</span>$
        </span>
        <input
          type="text"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="prompt-input"
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default CommandPrompt;