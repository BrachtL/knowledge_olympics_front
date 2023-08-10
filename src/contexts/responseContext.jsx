import React, { createContext, useContext, useState } from 'react';

const ResponseContext = createContext();

export const useResponse = () => {
  return useContext(ResponseContext);
};

export const ResponseProvider = ({ children }) => {
  const [response, setResponse] = useState(null);

  const updateResponse = (newResponse) => {
    setResponse(newResponse);
  };

  return (
    <ResponseContext.Provider value={{ response, updateResponse }}>
      {children}
    </ResponseContext.Provider>
  );
};