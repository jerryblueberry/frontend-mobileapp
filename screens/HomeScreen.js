import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { UserType } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import User from '../components/User';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({}); // State to store the logged-in user's data
  //  to do logout
  // const handleLogout = async () => {
  //   try {
  //     // Clear the JWT token from AsyncStorage
  //     await AsyncStorage.removeItem('authToken');

  //     // Redirect to the login screen (or perform any other desired action)
  //     navigation.replace('Login'); // Replace the current screen with the Login screen
  //   } catch (error) {
  //     console.log('Error logging out', error);
  //   }
  // };
  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`http://10.0.2.2:8000/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log('Error retrieving users', error);
        });

      // Fetch the logged-in user's data
      axios
        .get(`http://10.0.2.2:8000/loggedUser/${userId}`)
        .then((response) => {
          setLoggedInUser(response.data);
        })
        .catch((error) => {
          console.log('Error retrieving logged-in user', error);
        });
    };

    fetchUsers();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            MarketPlace Chat
          </Text>
        </View>
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
          <MaterialIcons
            onPress={() => navigation.navigate('Product')}
            name="people-outline"
            size={24}
            color="red"
          />
          <Pressable 
          // onPress = {handleLogout}
          onPress={() => Alert.alert("Image  Clicked","Slectedd")}
          >
          <Image
           
            style={{
              width: 24,
              height: 24,
              borderRadius: 25,
            }}
            source={{ uri: loggedInUser.image }}
          />

          </Pressable>
          
        </View>
      ),
    });
  }, [loggedInUser]);

  return (
    <View>
      <View style={{ padding: 10 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
