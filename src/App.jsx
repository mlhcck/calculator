import { useState } from 'react'
import './App.css'

function App() {
  const [calculate, setCalculate] = useState("");
  const [result, setResult] = useState(0);
  const [val, setVal] = useState("");
  const [chk, setChk] = useState(false);
  const [dotchk, setDotchk] = useState(false);
  const [str, setStr] = useState();
  const operators = ["/", "*", "+", "-", "."];
  const notDot = ["/", "*", "+", "-"];
  const decimCont = ["/", "*", "+", "-", "="];
  const ss = ["-"];
  function updateVal(event) {
    const num = event.currentTarget.value;
    //islem yaptiktan sonra opereator tiklanirsa onceki islemin sonucunu kullan
    if (chk) {
      if (notDot.includes(event.currentTarget.value)) {
        setCalculate(str + calculate + event.currentTarget.value);
      }
    }

    //makineye girilen ilk degerin operator ve sifir olmasını engelle
    if (operators.includes(event.currentTarget.value) && calculate === '' || calculate[0] == "0" && event.currentTarget.value == "0") {
      return;
    }
    // fazladan noktalı sayı girilmesini engelleme 
    if (dotchk && event.currentTarget.value == ".") {
      return;
    }

    if (event.currentTarget.value == ".") {
      setDotchk(true);
    }

    //ust uste operator engelleme
    if (ss.includes(calculate[calculate.length - 1]) && notDot.includes(event.currentTarget.value)) {
      if(notDot.includes(calculate[calculate.length - 2])){
        setCalculate(calculate => calculate.slice(0, calculate.length - 2) + num);
      }
      setCalculate(calculate => calculate.slice(0, calculate.length - 1) + num);
    } else if(notDot.includes(calculate[calculate.length - 1]) && !ss.includes(calculate[calculate.length - 1]) && notDot.includes(event.currentTarget.value) && !ss.includes(event.currentTarget.value)){
      setCalculate(calculate => calculate.slice(0, calculate.length - 1) + num);
    }
    else {
      setCalculate(calculate + event.currentTarget.value);
    }

    //basta sifir engelleme
    if (calculate[0] == "0" && calculate[1] != "0") {
      setCalculate(calculate => calculate.substring(1));
    }

    if (!operators.includes(event.currentTarget.value)) {
      setVal(eval(calculate + event.currentTarget.value))
    } else if (decimCont.includes(event.currentTarget.value)) {
      setDotchk(false);
    }
  }

  function evaulate() {
    setResult(val);
    setStr(val);
    setCalculate("");
    setChk(true);
  }

  function clear() {
    setCalculate("");
    setResult("");
    setVal("");
    setChk(false);
    setDotchk(false)
  }

  return (
    <>
      <div id='calculator'>
        <div className='pdiv'>
          <p id='watcher'>{calculate || ''}</p>
        </div>
        <div className='pdiv'>
          <div id='display'>{result || calculate || 0}</div>
        </div>
        <div id='buttons'>
          <button className='button' id='clear' onClick={clear}>AC</button>
          <button className='button' id='divide' value={"/"} onClick={updateVal}>/</button>
          <button className='button' id='multiply' value={"*"} onClick={updateVal}>X</button>
          <button className='button' id='seven' value={7} onClick={updateVal}>7</button>
          <button className='button' id='eight' value={8} onClick={updateVal}>8</button>
          <button className='button' id='nine' value={9} onClick={updateVal}>9</button>
          <button className='button' id='subtract' value={"-"} onClick={updateVal}>-</button>
          <button className='button' id='four' value={4} onClick={updateVal}>4</button>
          <button className='button' id='five' value={5} onClick={updateVal}>5</button>
          <button className='button' id='six' value={6} onClick={updateVal}>6</button>
          <button className='button' id='add' value={"+"} onClick={updateVal}>+</button>
          <button className='button' id='one' value={1} onClick={updateVal}>1</button>
          <button className='button' id='two' value={2} onClick={updateVal}>2</button>
          <button className='button' id='three' value={3} onClick={updateVal}>3</button>
          <button className='button' id='equals' onClick={evaulate}>=</button>
          <button className='button' id='zero' value={0} onClick={updateVal}>0</button>
          <button className='button' id='decimal' value={"."} onClick={updateVal}>.</button>
        </div>
      </div>
    </>
  )
}

export default App
