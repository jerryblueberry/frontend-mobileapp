import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useContext,useState,useEffect} from 'react'
import { UserType } from '../UserContext';
import { useNavigation } from '@react-navigation/native';
import UserChat from '../components/UserChat';
const ChatsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [acceptedFriends,setAcceptedFriends] = useState([]);
  const navigation = useNavigation();

  useEffect(() =>{
    const acceptedFriendsList = async() => {
      try {
        // const response = await fetch(`https://mobileapp-server.onrender.com/accepted-friends/${userId}`)
        const response = await fetch(`http://10.0.2.2:8000/accepted-friends/${userId}`)
        const data   = await response.json();

        if(response.ok){
          setAcceptedFriends(data);
        }
      } catch (error) {
        console.log("Error Showing the accepted friends list",error)
        
      }
    }
    acceptedFriendsList();
  },[]);
  console.log("Friends",acceptedFriends);

  return (
   <ScrollView showsVerticalScrollIndicator= {false}>
    <TouchableOpacity>
      {acceptedFriends.map((item,index) => (
        <UserChat key={index} item= {item}/>
      ))}
    </TouchableOpacity>

   </ScrollView>
  )
}

export default ChatsScreen

const styles = StyleSheet.create({})