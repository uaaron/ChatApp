import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {

  // The app's firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB2KNpqNr1B6asB55y6jHg9tBJza9vo_uE",
    authDomain: "chatapp-806af.firebaseapp.com",
    projectId: "chatapp-806af",
    storageBucket: "chatapp-806af.appspot.com",
    messagingSenderId: "978371469276",
    appId: "1:978371469276:web:b6971645f9b222cacc7919"
  };


  // Define a new state that represents the network connectivity status
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore
  const db = getFirestore(app);
  // Initialize firebase storage handler
  const storage = getStorage(app)

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {(props) => <Chat
            db={db}
            storage={storage}
            isConnected={connectionStatus.isConnected}
            {...props}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
