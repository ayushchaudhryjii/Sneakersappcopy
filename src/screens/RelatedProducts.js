import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";

const RelatedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch related products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://sneakers-rough-frost-7777.fly.dev/related_products?product_type=sneakers"
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderProduct = ({ item }) => {
    const { name, city, image, sizes } = item.attributes;
    const lowestBid = sizes[0]?.lowest_bid || "N/A";

    return (
      <View style={styles.productContainer}>
        <Image source={{ uri: image.url }} style={styles.productImage} />
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productCity}>{city}</Text>
        <Text style={styles.lowestAsk}>Lowest Ask</Text>
        <Text style={styles.price}>₹{lowestBid}</Text>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Related Products</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContent: {
    paddingHorizontal: 8,
  },
  productContainer: {
    marginRight: 16,
    alignItems: "center",
    width: 150,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  productImage: {
    width: 120,
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  productCity: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginBottom: 6,
  },
  lowestAsk: {
    fontSize: 12,
    color: "#888",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  loader: {
    marginTop: 20,
  },
});

export default RelatedProducts;
