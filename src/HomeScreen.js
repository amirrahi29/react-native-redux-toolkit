import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMyProducts, removeMyProduct } from './redux/MyProductSlice';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    const [products, setProducts] = useState([]);

    //navigation
    const navigation = useNavigation();

    //dispatch
    const dispatch = useDispatch();

    //selector
    const myCart = useSelector(state => state.product);
    console.log(`myCart: ${myCart}`);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        let result = await fetch("https://fakestoreapi.com/products");
        let data = await result.json();
        if (data) {
            let temp = [];
            for (let i = 0; i < data.length; i++) {
                temp.push(
                    {
                        id: data[i].id,
                        title: data[i].title,
                        image: data[i].image,
                        price: data[i].price,
                        qty: 1,
                    }
                );
            }
            setProducts(temp);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'yellow' }}>

            <View style={{ backgroundColor: 'brown', color: 'white', padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'white', fontSize: 16 }}>My Products</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CartScreen')}>
                    <Text style={{ color: 'white', fontSize: 16 }}>My Cart ({myCart.length ?? 0})</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                renderItem={({ item, index }) => {

                    let isAvailableInCart = myCart.find((e) => e.id === item.id);
                    // Find the corresponding product in the cart
                    let cartProduct = myCart.find((pro) => pro.id === item.id);

                    return (
                        <>
                            <Image source={{ uri: item.image }} style={{ height: 200, width: '100%' }} />
                            <View style={{margin:8}}>
                                <Text style={{ color: 'black', fontSize: 16 }}>{item.title}</Text>
                                <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Rs.{item.price}</Text>
                                {
                                    !isAvailableInCart ?
                                        <TouchableOpacity
                                            onPress={() => dispatch(addMyProducts(item))}
                                            style={{ backgroundColor: 'green', borderRadius: 8, padding: 8, width: 100, margin: 8 }}>
                                            <Text style={{ color: 'white' }}>Add to cart</Text>
                                        </TouchableOpacity>
                                        : <View style={{ flexDirection: 'row', width: 120 }}>
                                            <TouchableOpacity
                                                onPress={() => dispatch(removeMyProduct(item))}
                                                style={{
                                                    backgroundColor: 'green',
                                                    borderRadius: 8, padding: 4, width: 50,
                                                    height: 40, margin: 8, justifyContent: 'center', flex: 1, alignItems: 'center'
                                                }}>
                                                <Text style={{ color: 'white', fontSize: 24 }}>-</Text>
                                            </TouchableOpacity>

                                            <Text style={{ fontSize: 20, color: 'black', alignSelf: 'center' }}>
                                                {cartProduct ? cartProduct.qty : 0}
                                            </Text>

                                            <TouchableOpacity
                                                onPress={() => dispatch(addMyProducts(item))}
                                                style={{
                                                    backgroundColor: 'green',
                                                    borderRadius: 8, padding: 4, width: 50,
                                                    height: 40, margin: 8, justifyContent: 'center', flex: 1, alignItems: 'center'
                                                }}>
                                                <Text style={{ color: 'white', fontSize: 24 }}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                }
                            </View>

                        </>
                    );
                }}
            />
        </View>
    )
}

export default HomeScreen