import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { UserType } from '../UserContext';
import axios from 'axios';

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [loggedInUser, setLoggedInUser] = useState({});

  //  handle Image Click to redirect to the Account Section
  const handleImagePress = () =>  {
    navigation.navigate("Account",{user:loggedInUser});
  }
  //    bholi login bata home ma jane process herne
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'gray' }}>
          Logo
        </Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <Ionicons
            onPress={() => navigation.navigate('Chats')}
            name="chatbox-ellipses-outline"
            size={24}
            color="black"
          />
          <MaterialIcons
            onPress={() => navigation.navigate('Friends')}
            name="people-outline"
            size={24}
            color="black"
          />
          <TouchableOpacity onPress={handleImagePress}>
          <Image
            style={{
              width: 30,
              height: 30,
              borderRadius: 25,
              resizeMode: 'cover',
            }}
            source={{ uri: loggedInUser.image }}
          />
          </TouchableOpacity>
          
        </View>
      ),
    });
  }, [loggedInUser]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          console.log('Error', response.status);
        }
      } catch (error) {
        console.log('Error Message: ', error);
      }
    };

    fetchProducts();

    const fetchUser = async () => {
      axios
        .get(`http://10.0.2.2:8000/loggedUser/${userId}`)
        .then((response) => {
          setLoggedInUser(response.data);
        })
        .catch((error) => {
          console.log('Error Retrieving Logged in User Data',error);
        });
    };
    fetchUser();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.title}>Ecommerce Products</Text>
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={styles.productContainer}
          // Add navigation logic to open product details screen
          onPress={() => {
            navigation.navigate("ProductDetail",{productId:product.id})
            // Navigate to product details screen with product information
            // You can implement this using React Navigation
          }}
        >
          <Image style={styles.productImage} source={{ uri: product.image }} />
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productPrice}>Price: ${product.price}</Text>
            {/* Add more product details as needed */}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F4F4F4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
  },
  productInfo: {
    flex: 1,
    padding: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#007bff', // You can change the color as needed
  },
});

export default ProductsScreen;


//  new code for skeleton 
//  would create my own api later with page & limit
// import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
// import {
//   ScrollView,
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Pressable,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';
// import { UserType } from '../UserContext';
// import axios from 'axios';
// import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

// const ProductsScreen = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const navigation = useNavigation();
//   const { userId, setUserId } = useContext(UserType);
//   const [loggedInUser, setLoggedInUser] = useState({});

//   const handleImagePress = () => {
//     navigation.navigate("Account", { user: loggedInUser });
//   };

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTitle: '',
//       headerLeft: () => (
//         <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'gray' }}>
//           Logo
//         </Text>
//       ),
//       headerRight: () => (
//         <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
//           <Ionicons
//             onPress={() => navigation.navigate('Chats')}
//             name="chatbox-ellipses-outline"
//             size={24}
//             color="black"
//           />
//           <MaterialIcons
//             onPress={() => navigation.navigate('Friends')}
//             name="people-outline"
//             size={24}
//             color="black"
//           />
//           <TouchableOpacity onPress={handleImagePress}>
//             <Image
//               style={{
//                 width: 30,
//                 height: 30,
//                 borderRadius: 25,
//                 resizeMode: 'cover',
//               }}
//               source={{ uri: loggedInUser.image }}
//             />
//           </TouchableOpacity>
//         </View>
//       ),
//     });
//   }, [loggedInUser]);

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(`https://fakestoreapi.com/products?limit=10&page=${page}`);
//       const data = await response.json();
//       if (response.ok) {
//         if (data.length === 0) {
//           setHasMore(false);
//         } else {
//           setProducts([...products, ...data]);
//           setPage(page + 1);
//         }
//       } else {
//         console.log('Error', response.status);
//       }
//     } catch (error) {
//       console.log('Error Message: ', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoadMore = () => {
//     if (!loading && hasMore) {
//       setLoading(true);
//       fetchProducts();
//     }
//   };

//   useEffect(() => {
//     fetchProducts();

//     const fetchUser = async () => {
//       axios
//         .get(`http://10.0.2.2:8000/loggedUser/${userId}`)
//         .then((response) => {
//           setLoggedInUser(response.data);
//         })
//         .catch((error) => {
//           console.log('Error Retrieving Logged in User Data');
//         });
//     };
//     fetchUser();
//   }, []);

//   return (
//     <ScrollView
//       showsVerticalScrollIndicator={false}
//       style={styles.container}
//       onEndReached={handleLoadMore}
//       onEndReachedThreshold={0.1}
//     >
//       <Text style={styles.title}>Ecommerce Products</Text>
//       {loading ? (
//         <View>
//           {/* Skeleton loading effect */}
//           <ShimmerPlaceholder autoRun={true} visible={false}>
//             <TouchableOpacity style={styles.productContainer}></TouchableOpacity>
//           </ShimmerPlaceholder>
//           <ShimmerPlaceholder autoRun={true} visible={false}>
//             <TouchableOpacity style={styles.productContainer}></TouchableOpacity>
//           </ShimmerPlaceholder>
//           {/* Add more skeleton placeholders as needed */}
//         </View>
//       ) : (
//         // Render the actual product list
//         products.map((product) => (
//           <TouchableOpacity
//             key={product.id}
//             style={styles.productContainer}
//             // Add navigation logic to open product details screen
//             onPress={() => {
//               // Navigate to product details screen with product information
//               // You can implement this using React Navigation
//             }}
//           >
//             <Image style={styles.productImage} source={{ uri: product.image }} />
//             <View style={styles.productInfo}>
//               <Text style={styles.productTitle}>{product.title}</Text>
//               <Text style={styles.productPrice}>Price: ${product.price}</Text>
//               {/* Add more product details as needed */}
//             </View>
//           </TouchableOpacity>
//         ))
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#F4F4F4',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   productContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     marginBottom: 20,
//     shadowColor: 'rgba(0, 0, 0, 0.1)',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   productImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//     margin: 10,
//   },
//   productInfo: {
//     flex: 1,
//     padding: 10,
//   },
//   productTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   productPrice: {
//     fontSize: 16,
//     color: '#007bff',
//   },
// });

// export default ProductsScreen;
