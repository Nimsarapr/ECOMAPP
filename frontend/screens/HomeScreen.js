import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ route }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // LoginScreen එකෙන් එවපු නම මෙතනට ගන්නවා
  const userName = route.params?.name || 'Customer';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // බ්‍රවුසර් එකේ නිසා localhost පාවිච්චි කරනවා
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header කොටස */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome, {userName}!</Text>
        <TouchableOpacity 
          style={styles.orderButton} 
          onPress={() => navigation.navigate('MyOrders')}
        >
          <Text style={styles.orderButtonText}>View My Orders</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Latest Products</Text>

      {/* බඩු ලිස්ට් එක (FlatList) */}
      {products.length === 0 ? (
        <Text style={styles.noProducts}>No products found. Please add products using Postman.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.productCard} 
              onPress={() => navigation.navigate('ProductDetail', { id: item._id })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>Rs. {item.price}</Text>
                <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f4f4f4' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  welcome: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  orderButton: { backgroundColor: '#3498db', padding: 8, borderRadius: 5 },
  orderButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  noProducts: { textAlign: 'center', marginTop: 50, color: '#888' },
  productCard: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    marginBottom: 15, 
    borderRadius: 10, 
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  image: { width: 100, height: 100 },
  info: { padding: 12, flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, color: '#e67e22', fontWeight: 'bold', marginVertical: 4 },
  desc: { fontSize: 13, color: '#777' }
});

export default HomeScreen;