import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //transition
  function transition(current, replace) {
    if (!replace) {
      setMode(current)
      history.push(current);
      // setHistory(prev => ([...prev, mode]));
    }
    setMode(current);
  }
  function back() {
    if (history.length > 1) {
      const previous = [...history];
      previous.pop();
      setMode(previous[previous.length - 1]);
      setHistory(previous);
    }
  }


  return { mode, transition, back };
}

