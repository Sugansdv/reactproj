import React, { useState, useEffect } from 'react';
import '../assets/Css/StopwatchApp.css';

const Proj1 = () => {
    const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const start = () => setRunning(true);
  const stop = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setTime(0);
  };

  return (
    <div className="stopwatch">
      <h2 className="stopwatch__title">Stopwatch</h2>
      <div className="stopwatch__time">{time}s</div>
      <div className="stopwatch__buttons">
        <button
          className="stopwatch__btn"
          onClick={start}
          disabled={running}
          type="button"
        >
          Start
        </button>
        <button
          className="stopwatch__btn"
          onClick={stop}
          disabled={!running}
          type="button"
        >
          Stop
        </button>
        <button className="stopwatch__btn" onClick={reset} type="button">
          Reset
        </button>
      </div>
    </div>
  );
};
export default Proj1;
