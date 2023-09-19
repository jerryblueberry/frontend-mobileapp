import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React,{useContext} from 'react';
import { UserType } from '../UserContext';
import { useNavigation } from '@react-navigation/native';

const FriendRequest = ({ item, friendRequest, setFriendRequest }) => {
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();

  const acceptRequest = async(friendRequestId) => {
    try {
      //  for deployment
      // const response = await fetch("https://mobileapp-server.onrender.com/friend-request/accept",{
      const response = await fetch("http://10.0.2.2:8000/friend-request/accept",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          senderId:friendRequestId,
          recepientId:userId
        })
      })
      if(response.ok){
        setFriendRequest(friendRequest.filter((request) => request._id !== friendRequestId));
        navigation.navigate("Chats")
      }
    } catch (error) {
      console.log("Error Message",error);
      
    }
  }


  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        justifyContent: 'space-between',
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: item.image }}
      />
      <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          marginLeft: 10,
          flex: 1,
        }}
      >
        {item?.name} sent you a friend request !!
      </Text>
      <TouchableOpacity onPress={() => acceptRequest(item._id)}
        style={{
          backgroundColor: '#0066b2',
          padding: 10,
          borderRadius: 6,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
          }}
        >
          Accept
        </Text>
      </TouchableOpacity>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});
