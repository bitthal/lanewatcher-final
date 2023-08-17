import { createContext, useState } from "react";

export const value_data = createContext(null);

function Context({ children }) {
    const [value, setValue] = useState('');
    const [drpdwnVaue, setdrpdwnVaue] = useState('');
    const [loginData,setLoginData] = useState({});
    const [laneNames, setLaneNames] = useState('');
    const [resetLoader,setResetLoader] = useState('');
    return (
      <value_data.Provider value={{ value, setValue,drpdwnVaue, setdrpdwnVaue,loginData,setLoginData, setLaneNames, laneNames,resetLoader,setResetLoader}}>
        {children}
      </value_data.Provider>
    );
  }
  export default Context;