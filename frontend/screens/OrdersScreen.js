import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Order History</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrders}>You haven't placed any orders yet.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <Text style={styles.orderId}>Order ID: {item._id}</Text>
              <Text>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
              <Text style={styles.price}>Total Amount: Rs. {item.totalPrice}</Text>
              <Text style={[styles.status, { color: item.status === 'Pending' ? 'orange' : 'green' }]}>
                Status: {item.status}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  noOrders: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#888' },
  orderCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 3 },
  orderId: { fontWeight: 'bold', color: '#333', marginBottom: 5 },
  price: { fontSize: 16, color: '#e67e22', fontWeight: 'bold', marginTop: 5 },
  status: { fontWeight: 'bold', marginTop: 5 }
});

export default OrdersScreen;