import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { response } from 'express';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();


  useEffect(() => {
    const checkLoginStatus   = async() => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if(token){
          navigation.navigate("Home");
        }else{
          //  token not found show login itself
        }
      } catch (error) {
        console.log("error",error);
      }
    }

    checkLoginStatus();
   
  },[])


  const handleLogin = () =>{
    const user = {
      email:email,
      password:password
    }
    //  for the deployment version
   
    // axios.post("https://mobileapp-server.onrender.com/login",user).then((response) => {
    axios.post("http://10.0.2.2:8000/login",user).then((response) => {
      console.log(response);
      const token = response.data.token
      AsyncStorage.setItem("authToken",token);
      navigation.navigate("Home")
    }).catch((error) => {
      Alert.alert("Login Error ","Invalid email or Password");
      console.log("Login Error",error);
    })
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
        alignItems: 'center',
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#4A55A2', fontSize: 20, fontWeight: '600' }}>
            Sign In
          </Text>
          <Text style={{ fontSize: 17, fontWeight: '600', marginTop: 15 }}>
            Sign In to Your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                fontSize: email ? 18 : 18, // if there is email then the font size will be 18 else case also 18
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={'black'}
              placeholder="Enter Your Email"
            />
          </View>
          {/*  for Password */}
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                fontSize: email ? 18 : 18, // if there is email then the font size will be 18 else case also 18
                borderBottomColor:"gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={'black'}
              placeholder="Enter Your Password"
            />
          </View>

          {/*  for Login Button */}

          <Pressable
          onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: '#4A55A2',
              padding: 15,
              marginTop: 50,
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius:6
            }}
          >
            <Text style = {{
                color:'white',
                textAlign:"center",
                fontSize:18,
                fontWeight:'bold',

            }}>Login</Text>
          </Pressable>
          {/*  For Signin Section Text */}
          <Pressable onPress={() => navigation.navigate("Register")} style  = {{
            marginTop:15,

          }}>
            <Text style = {{
                textAlign:'center',
                color:"gray",
                fontSize:19,
            }}>Don't have an account? Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
