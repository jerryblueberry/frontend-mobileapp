import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const UpdateProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.image);

  const handleUpdateProfile = async () => {
    // Create an object with the updated user data
    const updatedUserData = {
      name,
      email,
      image,
    };

    // Send a PUT request to update the user's profile
    try {
      const response = await fetch(`http://10.0.2.2:8000/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        // Profile updated successfully, navigate back to the previous screen
        navigation.goBack();
      } else {
        // Handle the error and provide feedback to the user
        const errorData = await response.json();
        console.error('Error updating profile:', errorData);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text>Image URL:</Text>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={(text) => setImage(text)}
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default UpdateProfileScreen;
