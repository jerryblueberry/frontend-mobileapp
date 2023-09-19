// import { StyleSheet, Text, View,Image, Touchable, TouchableOpacity, Alert } from 'react-native'
// import React, { useEffect } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRoute } from '@react-navigation/native';  
// import { useNavigation } from '@react-navigation/native';
// const AccountScreen = () => {
//     const route  = useRoute();
//     const navigation = useNavigation();

//     const {user} = route.params;
//     console.log(`${user.name}`)
  
   

//     //  tryna fetch the loggeduser hitting api
    

//      //  to do logout
//   const handleLogout = async () => {
//     try {
//       // Clear the JWT token from AsyncStorage
//       await AsyncStorage.removeItem('authToken');

//       // Redirect to the login screen (or perform any other desired action)
//       navigation.replace('Login'); // Replace the current screen with the Login screen
//     } catch (error) {
//       console.log('Error logging out', error);
//     }
//   };

//   const handleUpdateProfile  = () => {
//     navigation.navigate("Update Profile",{user})
//   }
//   return (
//    <View style = {{
//     width:120,
   
  
//    }}>
//    <TouchableOpacity style = {{
//     backgroundColor:'blue',
//     marginVertical:20,
//     borderRadius:5,
    
//    }} onPress={handleLogout}>
//     <Text style = {{
//       padding:10,
//       color:'#ffffff',
//       fontSize:17,
//       fontWeight:'bold',
//       marginLeft:11,
      
//     }}>Logout</Text>
    
//    </TouchableOpacity>
//    <TouchableOpacity 
//    onPress={handleUpdateProfile}
//    style = {{
//     backgroundColor:'red'
//    }}>
//     <Text style = {{
//       padding:10,

//     }}> Update Profile</Text>
    
//    </TouchableOpacity>
//    <TouchableOpacity style = {{
//     marginVertical:20,
//     backgroundColor:'red',
//    }}>
//     <Text style = {{
//       padding:10,
//     }}>Location Set</Text>
    
//    </TouchableOpacity>
//    <Text>Current User: {user.name}</Text>

//    </View>
//   )
// }

// export default AccountScreen

// const styles = StyleSheet.create({})

//  new code
// import { StyleSheet, Text, View,Image, Touchable, TouchableOpacity, Alert } from 'react-native'
// import React, { useEffect } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRoute } from '@react-navigation/native';  
// import { useNavigation } from '@react-navigation/native';
// const AccountScreen = () => {
//     const route  = useRoute();
//     const navigation = useNavigation();

//     const {user} = route.params;
//     console.log(`${user.name}`)
  
   

//     //  tryna fetch the loggeduser hitting api
    

//      //  to do logout
//   const handleLogout = async () => {
//     try {
//       // Clear the JWT token from AsyncStorage
//       await AsyncStorage.removeItem('authToken');

//       // Redirect to the login screen (or perform any other desired action)
//       navigation.replace('Login'); // Replace the current screen with the Login screen
//     } catch (error) {
//       console.log('Error logging out', error);
//     }
//   };

//   const handleUpdateProfile  = () => {
//     navigation.navigate("Update Profile",{user})
//   }
//   return (
//    <View style = {{
//     width:120,
   
  
//    }}>
//    <TouchableOpacity style = {{
//     backgroundColor:'blue',
//     marginVertical:20,
//     borderRadius:5,
    
//    }} onPress={handleLogout}>
//     <Text style = {{
//       padding:10,
//       color:'#ffffff',
//       fontSize:17,
//       fontWeight:'bold',
//       marginLeft:11,
      
//     }}>Logout</Text>
    
//    </TouchableOpacity>
//    <TouchableOpacity 
//    onPress={handleUpdateProfile}
//    style = {{
//     backgroundColor:'red'
//    }}>
//     <Text style = {{
//       padding:10,

//     }}> Update Profile</Text>
    
//    </TouchableOpacity>
//    <TouchableOpacity style = {{
//     marginVertical:20,
//     backgroundColor:'red',
//    }}>
//     <Text style = {{
//       padding:10,
//     }}>Location Set</Text>
    
//    </TouchableOpacity>
//    <Text>Current User: {user.name}</Text>

//    </View>
//   )
// }

// export default AccountScreen

// const styles = StyleSheet.create({})




//  new code
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';  
// import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
  const route  = useRoute();
  const {user} = route.params;
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [loggedInUser, setLoggedInUser] = useState({});

    //  to do logout
  const handleLogout = async () => {
    try {
      // Clear the JWT token from AsyncStorage
      await AsyncStorage.removeItem('authToken');

      // Redirect to the login screen (or perform any other desired action)
      navigation.replace('Login'); // Replace the current screen with the Login screen
    } catch (error) {
      console.log('Error logging out', error);
    }
  };

  const handleUpdateProfile  = () => {
    navigation.navigate("Update Profile",{user:loggedInUser})
  }
  //  handle Image Click to redirect to the Account Section
  // const handleImagePress = () =>  {
  //   navigation.navigate("Update Profile",{user:loggedInUser});
  // }


  //    bholi login bata home ma jane process herne
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'gray' }}>
          Account
        </Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          {/* <Ionicons
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
          /> */}
          <TouchableOpacity 
          // onPress={handleImagePress}
          >
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
    // const fetchProducts = async () => {
    //   try {
    //     const response = await fetch('https://fakestoreapi.com/products');
    //     const data = await response.json();
    //     if (response.ok) {
    //       setProducts(data);
    //     } else {
    //       console.log('Error', response.status);
    //     }
    //   } catch (error) {
    //     console.log('Error Message: ', error);
    //   }
    // };

    // fetchProducts();

    const fetchUser = async () => {
      axios
        .get(`http://10.0.2.2:8000/loggedUser/${userId}`)
        .then((response) => {
          setLoggedInUser(response.data);
        })
        .catch((error) => {
          console.log('Error Retrieving Logged in User Data');
        });
    };
    fetchUser();
  }, [loggedInUser]);

  return (
    
    <View style = {{
          width:120,
         
        
         }}>
         <TouchableOpacity style = {{
          backgroundColor:'blue',
          marginVertical:20,
          borderRadius:5,
          
         }} onPress={handleLogout}>
          <Text style = {{
            padding:10,
            color:'#ffffff',
            fontSize:17,
            fontWeight:'bold',
            marginLeft:11,
            
          }}>Logout</Text>
          
         </TouchableOpacity>
         <TouchableOpacity 
         onPress={handleUpdateProfile}
         style = {{
          backgroundColor:'red'
         }}>
          <Text style = {{
            padding:10,
      
          }}> Update Profile</Text>
          
         </TouchableOpacity>
         <TouchableOpacity style = {{
          marginVertical:20,
          backgroundColor:'red',
         }}>
          <Text style = {{
            padding:10,
          }}>Location Set</Text>
          
         </TouchableOpacity>
         <Text>Current User: {loggedInUser.name}</Text>

      
         </View>
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

export default AccountScreen;