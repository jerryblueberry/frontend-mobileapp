// import React, { useContext, useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { UserType } from '../UserContext';
// import { useNavigation } from '@react-navigation/native';

// const UserChat = ({ item }) => {
//   const { userId } = useContext(UserType);
//   const navigation = useNavigation();
//   const [lastMessage, setLastMessage] = useState(null);
//   const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch(
//           `http://10.0.2.2:8000/messages/${userId}/${item._id}`
//         );
//         const data = await response.json();
        
//         if (response.ok) {
//           const lastMessageData = data.pop(data); // Get the last message

//           if (lastMessageData) {
//             if (lastMessageData.messageType === 'image') {
//               if(lastMessageData.item._id) 
//               setLastMessage('Sent you a photo');
//             } else {
//               setLastMessage(lastMessageData.message);
//             }
//             setLastMessageTimestamp(lastMessageData.timeStamp);
//           } else {
//             setLastMessage('');
//             setLastMessageTimestamp(null);
//           }
//         } else {
//           console.log('Error showing message', response.status.message);
//         }
//       } catch (error) {
//         console.log('error Fetching the messages', error);
//       }
//     };

  
    

//     // Initial fetch and periodic refresh every 10 seconds
//     fetchMessages();
//     const timer = setInterval(fetchMessages, 400);

//     return () => {
//       clearInterval(timer); // Clear the timer when the component unmounts
//     };
//   }, [userId, item._id]);

//   //  to get the timeformat
//   const formatTime = (time) => {
//     const options = { hour: 'numeric', minute: 'numeric' };
//     return new Date(time).toLocaleString('en-US', options);
//   };

//   const navigateToMessages = () => {
//     navigation.navigate('Messages', {
//       recepientId: item._id,
//     });
//   };

//   return (
//     <TouchableOpacity onPress={navigateToMessages} style={styles.container}>
//       <Image style={styles.avatar} source={{ uri: item.image }} />
//       <View style={styles.details}>
//         <Text style={styles.name}>{item.name}</Text>

//         {lastMessage ? (
          
//           <View style =  {styles.mesTime}>
//             <Text style={styles.message}>{lastMessage}</Text>
//             {lastMessageTimestamp && (
//               <Text style={styles.timestamp}>
//                 {formatTime(lastMessageTimestamp)}
//               </Text>
//             )}
//           </View>
//         ):(
//           <View style  = {{
//             display:'flex',
//             flexDirection:'row',
//             alignItems:'center',
            
//             // justifyContent:'center'
//           }}>
//           <Text style  = {{
//             color:'gray',
//             fontSize:12,


            
//           }}>Start New Chat with  </Text>
//           <Text style  = {{
//             color:'gray',
//             fontSize:12,
//             fontWeight:'bold'
//           }}>{item.name}</Text>

//           </View>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     borderWidth: 0.7,
//     borderColor: '#D0D0D0',
//     borderTopWidth: 0,
//     borderLeftWidth: 0,
//     borderRightWidth: 0,
//     padding: 10,
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     resizeMode: 'cover',
//   },
//   details: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   mesTime:{
//     display:'flex',
//     flexDirection:'row',
//     justifyContent:"space-between",
//     alignText:'center',
//   },
//   message: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   timestamp: {
//     fontSize: 11,
    
//     color: 'gray',
//   },
// });

// export default UserChat;



//  new code
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { UserType } from '../UserContext';
import { useNavigation } from '@react-navigation/native';

const UserChat = ({ item }) => {
  const { userId } = useContext(UserType);
  const navigation = useNavigation();
  const [lastMessage, setLastMessage] = useState(null);
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:8000/messages/${userId}/${item._id}`
        );
        const data = await response.json();
        
        if (response.ok) {
          // Sort messages by timestamp in descending order (newest to oldest)
          data.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));

          const lastMessageData = data[0]; // Get the first message (latest)

          if (lastMessageData) {
            if (lastMessageData.messageType === 'image') {
              // Check if the sender is the current user (you) or another user
              if (lastMessageData.recepientId === userId) {
                setLastMessage('Sent you a photo.');
              } else {
                setLastMessage('You sent a photo.');
              }
            } else {
              // Handle non-image messages here
              setLastMessage(lastMessageData.message);
            }
            setLastMessageTimestamp(lastMessageData.timeStamp);
          } else {
            setLastMessage('');
            setLastMessageTimestamp(null);
          }
        } else {
          console.log('Error showing message', response.status.message);
        }
      } catch (error) {
        console.log('Error fetching messages', error);
      }
    };

    // Initial fetch and periodic refresh every 10 seconds
    fetchMessages();
    const timer = setInterval(fetchMessages, 400);

    return () => {
      clearInterval(timer); // Clear the timer when the component unmounts
    };
  }, [userId, item._id]);

  //  to get the time format
  const formatTime = (time) => {
    const options = { hour: 'numeric', minute: 'numeric' };
    return new Date(time).toLocaleString('en-US', options);
  };

  const navigateToMessages = () => {
    navigation.navigate('Messages', {
      recepientId: item._id,
    });
  };

  return (
    <TouchableOpacity onPress={navigateToMessages} style={styles.container}>
      <Image style={styles.avatar} source={{ uri: item.image }} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>

        {lastMessage ? (
          <View style={styles.mesTime}>
            <Text style={styles.message}>{lastMessage}</Text>
            {lastMessageTimestamp && (
              <Text style={styles.timestamp}>
                {formatTime(lastMessageTimestamp)}
              </Text>
            )}
          </View>
        ) : (
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'gray', fontSize: 12 }}>Start New Chat with </Text>
            <Text style={{ color: 'gray', fontSize: 12, fontWeight: 'bold' }}>
              {item.name}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 0.7,
    borderColor: '#D0D0D0',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  mesTime: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    color: 'gray',
  },
  timestamp: {
    fontSize: 11,
    color: 'gray',
  },
});

export default UserChat;
