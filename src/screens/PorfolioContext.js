import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";  // Importing Alert to show the popup

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]); // Separate state for wishlist

  const addItemToPortfolio = (item) => {
    setPortfolioItems((prevItems) => [...prevItems, item]);
  };

  const addItemToWishlist = (item) => {
    // Check if the item is already in the wishlist
    const itemExists = wishlistItems.some((wishlistItem) => wishlistItem.id === item.id);

    if (itemExists) {
      // If the item exists, show a popup
      Alert.alert("Item already in Wishlist", "This item is already in your wishlist.");
    } else {
      // If the item does not exist, add it to the wishlist
      setWishlistItems((prevItems) => [...prevItems, item]);
      Alert.alert("Item add successfully", "Item is add in your Wishlist");
    }
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
