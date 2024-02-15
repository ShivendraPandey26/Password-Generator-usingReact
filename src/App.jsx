import { useState, useCallback, useEffect, useRef} from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState(" ");

  const passwordGenerator = useCallback(() => {
    let pass = " ";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "1234567890";
    }
    if (charAllowed) {
      str += "`~!@#$%^&*()_-=+{}[]:;'<>.,?";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);
  
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const passwordRef = useRef(null);

  const copyPassword = useCallback( () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(1 , 60);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <section className="flex justify-center my-24">
      <div className="w-5/6 h-auto rounded-lg bg-gray-600 p-12 md:w-1/2 md:my-32">
        <div className="text-center">
          <h1 className="text-3xl mb-7 font-medium text-white">Password Generator</h1>
          <input
            type="text"
            value={password}
            name="text-area"
            className="bg-gray-300 rounded-s-lg h-10 w-3/4 md:w-3/4 md:h-14 p-3 text-lg font-normal"
            readOnly
            placeholder="Password"
            ref={passwordRef}
          />
          <button className="bg-blue-700 rounded-e-lg h-10 w-1/4 md:w-32 md:h-14 hover:bg-blue-800 text-white text-lg md:text-2xl md:font-semiboldbold md:pb-1" 
          onClick={copyPassword}
          >
            Copy
          </button>
        </div>

        <div className="grid">
          <div className=" w-fit p-2 rounded-xl border mx-auto mt-11 md:col-start-1 md:col-end-3 hover:bg-slate-900">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="mx-2 text-white font-medium">
              Length : {length}
            </label>
          </div>

          <div className="border w-fit p-2 mt-11 mx-auto rounded-xl flex justify-between md:col-end-5 md:col-span-2 hover:bg-slate-900">
            <span className="me-9">
              <input type="checkbox" name="Number" id="" className="mx-1"
              defaultChecked = {numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }} 
               />
              <label className="text-xl text-white font-medium">Number</label>
            </span>

            <span>
              <input type="checkbox" name="character" id="" className="mx-1"  
              defaultChecked = {charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              />
              <label className="text-xl text-white font-medium">
                Characters
              </label>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
