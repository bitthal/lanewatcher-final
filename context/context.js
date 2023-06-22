import { createContext, useState } from "react";

export const value_data = createContext(null);

function Context({ children }) {
    const [value, setValue] = useState('');
    const [drpdwnVaue, setdrpdwnVaue] = useState('');
    return (
      <value_data.Provider value={{ value, setValue,drpdwnVaue, setdrpdwnVaue }}>
        {children}
      </value_data.Provider>
    );
  }
  export default Context;