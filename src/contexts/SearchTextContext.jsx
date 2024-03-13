import React, { createContext, useContext, useState } from "react";

const SearchTextContext = createContext();

const SearchTextProvider = ({ children }) => {
  const [searchText, setSearchText] = useState(null);

  return (
    <SearchTextContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchTextContext.Provider>
  );
};

const useSearchText = () => useContext(SearchTextContext);

export { SearchTextProvider, useSearchText };
