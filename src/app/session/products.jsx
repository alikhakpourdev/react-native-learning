import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Image } from "react-native-expo-image-cache";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [connected, setConnected] = useState(true);
    const getProducts = async () => {
        return await axios.get('https://dummyjson.com/products').then(response => {
            return response.data.products;
        }).catch(error => {
            console.log(error);
            return [];
        });
    }

    const renderItem = ({ item }) => {
        return (<View style={{ padding: 20 }} key={'product-' + item.id}>
            <View style={{ width: "100%", height: 2, backgroundColor: '#333' }}></View>
            <Text style={{ fontSize: 20, color: 'black', fontFamily: 'Roboto' }}>{item.title}</Text>
            <Image uri={item.thumbnail} style={{ width: 100, height: 100 }} resizeMode="contain" />
            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Roboto' }}>{item.price}$</Text>
            <Pressable style={{ backgroundColor: '#333', padding: 10, borderRadius: 5, marginTop: 10 }} onPress={() => {
                alert(item.id);
            }}>
                <Text style={{ fontSize: 16, color: 'white', fontFamily: 'Roboto' }}>Add Product</Text>
            </Pressable>
        </View>)
    }

    useEffect(() => {
        const productList = async () => {
            if (connected) {
                const productList = await getProducts();
                if (productList.length <= 0) {
                    return;
                }

                setProducts(productList);
                await AsyncStorage.setItem('products', productList);
            } else {
                const productList = await AsyncStorage.getItem('products');
                setProducts(productList);
            }
        }
        productList();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <ScrollView>
                <Text style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: 'YekanBakh', paddingTop: 20, fontSize: 30 }}>
                    {connected ? 'Product List' : 'Products Offline'}
                </Text>

                {products.length > 0 ? <FlatList data={products} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} /> : <Text style={{ flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: 'YekanBakh', paddingTop: 20, fontSize: 30 }}>No products found</Text>}

            </ScrollView>
        </SafeAreaView>
    );
}