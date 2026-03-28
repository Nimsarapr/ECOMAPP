import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [image, setImage] = useState('');

  // පින්තූරයක් අප්ලෝඩ් කරන හැටි (Web mode එකේදී)
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setImage(data); // සර්වර් එකෙන් එවන පින්තූර ලින්ක් එක සේව් කරගන්නවා
      Alert.alert("Success", "Image Uploaded!");
    } catch (error) {
      Alert.alert("Error", "Image upload failed");
    }
  };

  const submitHandler = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const productData = { name, price, description, category, countInStock, image };
      await axios.post('http://localhost:5000/api/products', productData, config);
      
      Alert.alert("Success", "Product Added!");
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert("Error", "Could not add product");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Product</Text>
      <TextInput style={styles.input} placeholder="Product Name" onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" onChangeText={setPrice} />
      <TextInput style={styles.input} placeholder="Description" multiline onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Category" onChangeText={setCategory} />
      <TextInput style={styles.input} placeholder="Stock Count" keyboardType="numeric" onChangeText={setCountInStock} />
      
      <Text>Upload Image:</Text>
      <input type="file" onChange={uploadFileHandler} style={{ marginVertical: 10 }} />
      
      <Button title="Save Product" onPress={submitHandler} color="#2ecc71" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});

export default AddProductScreen;