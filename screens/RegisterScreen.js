import { StyleSheet, Text, View, KeyboardAvoidingView, Pressable, TextInput, Alert, } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

// import { response } from 'express';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const navigation = useNavigation();


  //  function for handling on press 
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      image: image
    }

    //  sned a post request to backend api for registering
    //  for deployment version

    // axios.post("https://mobileapp-server.onrender.com/register", user).then((response) => {
    axios.post("http://10.0.2.2:8000/register", user).then((response) => {
      console.log(response);
      Alert.alert("Registration Successfully", "You have been registered Successfully");
      setName("");
      setEmail("");
      setPassword("");
      setImage("");
    }).catch((err) => {
      Alert.alert(
        "Registration Error",
        "An Error Occured While Registering"
      )
      console.log("Registration Failed", err)

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
            Register
          </Text>
          <Text style={{ fontSize: 17, fontWeight: '600', marginTop: 15 }}>
            Register to your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>
              Name
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                fontSize: name ? 18 : 18, // if there is email then the font size will be 18 else case also 18
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={'black'}
              placeholder="Enter Your Name"
            />
          </View>
          {/*  For Email Section */}
          <View style={{
            marginTop: 20
          }}>
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
                fontSize: password ? 18 : 18, // if there is email then the font size will be 18 else case also 18
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={'black'}
              placeholder="Enter Your Password"
            />
          </View>
          {/*  for Image Section */}
          <View
            style={{
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'gray' }}>
              Image
            </Text>
            <TextInput
              value={image}
              onChangeText={(text) => setImage(text)}

              style={{
                fontSize: image ? 18 : 18, // if there is email then the font size will be 18 else case also 18
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholderTextColor={'black'}
              placeholder="Select Your Image"
            />
          </View>

          {/*  for Login Button */}

          <Pressable
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: '#4A55A2',
              padding: 15,
              marginTop: 50,
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: 6,
              borderColor: '#4A55A2'
            }}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              Register
            </Text>
          </Pressable>
          {/*  For Signin Section Text */}
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              marginTop: 20,
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'gray',
                fontSize: 19,
              }}
            >
              Already have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
