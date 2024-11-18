import React, { createContext, useContext, useState } from "react";

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]); // Separate state for wishlist

  const addItemToPortfolio = (item) => {
    setPortfolioItems((prevItems) => [...prevItems, item]);
  };

  const addItemToWishlist = (item) => {
    setWishlistItems((prevItems) => [...prevItems, item]);
  };

  return (
    <PortfolioContext.Provider
      value={{
        portfolioItems,
        addItemToPortfolio,
        wishlistItems,
        addItemToWishlist,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
