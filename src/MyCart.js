import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeMyProduct } from './redux/MyProductSlice';

const MyCart = () => {

    //selector
    const myCart = useSelector(state => state.product);

    //dispatch
    const dispatch = useDispatch();

    const [price, setPrice] = useState(0);

    useEffect(() => {
        calculateTotalAmount();
    }, [myCart]);

    const calculateTotalAmount = () => {
        let totalPrice = myCart.reduce(
            (total, item) => total + item.price * item.qty,
            0
        );
        setPrice(totalPrice);
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'yellow' }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={myCart}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <View style={{ backgroundColor: 'white', flexDirection: 'row', margin: 8,padding:8 }}>
                                    <Image source={{ uri: item.image }} style={{ height: 40, width: 40, borderRadius: 100, margin: 8 }} />
                                    <View style={{ flexDirection: 'column',flex:1 }}>
                                        <Text style={{ color: 'black', flex: 1 }}>{item.title}</Text>
                                        <Text style={{ color: 'black', flex: 1 }}>Price: {item.price}</Text>
                                        <Text style={{ color: 'black', flex: 1 }}>Qty: {item.qty}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => dispatch(removeMyProduct(item))}>
                                        <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 24, marginRight: 8 }}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )
                    }}
                />
                <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'white', borderRadius: 0, padding: 8 }}>
                    <Text style={{ color: 'black', fontSize: 24 }}>Rs {price}</Text>
                </View>
            </View>
        </View>
    )
}

export default MyCart