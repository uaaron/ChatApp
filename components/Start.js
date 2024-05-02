import { useState } from 'react'
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';

const image = require('../assets/background_image.png')

//Start page of ChatApp
const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [colorSelection, handleColorSelection] = useState('')

  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", { name: name, id: result.user.uid });
        Alert.alert("Signed in Successfully");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
        console.log(error);
      })
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.titleText}>Chat App</Text>
        {/* Container for color selection and user input */}
        <View style={styles.containerWhite}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor="#757083"
          />
          <Text style={styles.text1}>Choose Background Color</Text>
          {/*various color buttons to choose from */}
          <View style={styles.colorButtonContainer}>
            <TouchableOpacity
              style={[styles.colorButton,
              { backgroundColor: '#090C08' }
              ]}
              onPress={() => handleColorSelection('#090C08')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorButton,
              { backgroundColor: '#474056' }
              ]}
              onPress={() => handleColorSelection('#474056')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorButton,
              { backgroundColor: '#8A95A5' }
              ]}
              onPress={() => handleColorSelection('#8A95A5')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorButton,
              { backgroundColor: '#B9C6AE' }
              ]}
              onPress={() => handleColorSelection('#B9C6AE')}
            ></TouchableOpacity>
          </View>
          <Button
            title="Start Chatting"
            onPress={signInUser}
          />
          {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerWhite: {
    width: '88%',
    height: '44%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10
  },
  titleText: {
    color: 'white',
    fontSize: 45,
    padding: '25%',
    fontWeight: '600'
  },
  text1: {
    justifyContent: 'center',
    padding: ''
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginBottom: 15,
    marginLeft: 3,
    marginTop: -50
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Start;