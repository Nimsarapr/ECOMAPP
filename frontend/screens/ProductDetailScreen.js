import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import axios from 'axios';

const ProductDetailScreen = ({ route, navigation }) => {
  const { id } = route.params; // Home screen එකෙන් එවපු ID එක ගන්නවා
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // ඉතා වැදගත්: මෙතන URL එක localhost:5000 ද කියලා බලන්න
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleBuyNow = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        Alert.alert("Error", "Please login to buy products!");
        navigation.navigate('Login');
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const orderData = {
        orderItems: [{
          name: product.name,
          qty: 1,
          image: product.image,
          price: product.price,
          product: product._id
        }],
        totalPrice: product.price
      };

      const response = await axios.post('http://localhost:5000/api/orders', orderData, config);

      if (response.data) {
        Alert.alert("Success", "Order Placed Successfully!");
        navigation.navigate('MyOrders');
      }
    } catch (error) {
      Alert.alert("Error", "Order failed. Check server.");
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (!product) return <View style={styles.center}><Text>Product not found!</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>Rs. {product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.stock}>Items available: {product.countInStock}</Text>

        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyButtonText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 350, resizeMode: 'contain' },
  content: { padding: 20 },
  name: { fontSize: 26, fontWeight: 'bold' },
  price: { fontSize: 24, color: '#e67e22', fontWeight: 'bold', marginVertical: 10 },
  description: { fontSize: 16, color: '#444', marginBottom: 20 },
  stock: { fontSize: 14, color: '#27ae60', fontWeight: 'bold', marginBottom: 20 },
  buyButton: { backgroundColor: '#e67e22', padding: 15, borderRadius: 10, alignItems: 'center' },
  buyButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default ProductDetailScreen;