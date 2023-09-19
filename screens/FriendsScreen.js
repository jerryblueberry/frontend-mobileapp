import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import { UserType } from '../UserContext';
import axios from 'axios';
import FriendRequest from '../components/FriendRequest';
const FriendsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [friendRequest, setFriendRequest] = useState([]);
  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        //  for deployment version
        
        // `https://mobileapp-server.onrender.com/friend-request/${userId}`
        `http://10.0.2.2:8000/friend-request/${userId}`
      );
      if (response.status === 200) {
        const friendRequestsData = response.data.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          // email: friendRequest.email,
          image: friendRequest.image,
        }));
        setFriendRequest(friendRequestsData);
      }
    } catch (error) {
      console.log('error message', error);
    }
  };

  console.log(friendRequest);
  return (
    <View
      style={{
        padding: 10,
        marginHorizontal: 12,
      }}
    >
      {friendRequest.length > 0 && <Text>Your Friend Requests!</Text>}

      {friendRequest.map((item, index) => (
        <FriendRequest
          key={index}
          item={item}
          friendRequest={friendRequest}
          setFriendRequest={setFriendRequest}
        />
      ))}
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({});
