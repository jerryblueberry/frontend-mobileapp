import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useRoute,useNavigation} from '@react-navigation/native'

const ProductDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { productId } = route.params;
    const [product,setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async() => {
            try {
                const res = await fetch (`https://fakestoreapi.com/products/${productId}`);
                const productDetails = await res.json();
                setProduct(productDetails);
            } catch (error) {
                console.log("Error Fetching The product Detail",error);
            }
        }

        fetchProduct();
    },[productId])
  return (
    <View>
      <Text>ProductDetailScreen</Text>
      {
        product && 
       
        <View>
        <Text>{product.title}</Text>
        <Text>{product.description}</Text>
        <Image style = {{
            width:50,
            height:50,
        }} source = {{uri:product.image}}/>


        </View>
    
      }




    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({})