import React, { createContext, useState } from "react";

export const LoggedContext = createContext(false);

export const LoggedProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  return (
    <LoggedContext.Provider value={[logged, setLogged]}>
      {children}
    </LoggedContext.Provider>
  );
};
