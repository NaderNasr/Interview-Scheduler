import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

//current = mode state
  function transition(current, replace) {
    //if there is no server errors no need to replace the current mode
    if (!replace) {
      setMode(current);
      history.push(current);
    }
    //if replace is true set the MODE to the current mode
    setMode(current);
  }
  // back transition
  function back() {
    //if state of history length is greater than 1
    if (history.length > 1) {
      //spread all the previous elements in history
      const previous = [...history];
      // pop the last element
      previous.pop();
      // set the state to the last element in the state
      setMode(previous[previous.length - 1]);
      //set history state with the rest of the history
      setHistory(previous);
    }
  }

  return { mode, transition, back };
}
