import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';

// Chat component
const Chat = ({ route, navigation, db }) => {
  const { name, background, id } = route.params;
  const { colorSelection } = route.params;
  const [messages, setMessages] = useState([]);

  //Effect to set username as title on screen
  useEffect(() => {
    const q = query(collection(db, "messages"), where("uid", "==", id));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      });
      setMessages(newMessages);
    });
    return () => {
      if (unsubMessages) unsubMessages();
    }
  })

  //Appends new messages to the array of previous messages
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
  }

  //changes the color of speech bubbles
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  //created initial system and regular message upon mount
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: 'You have entered the chat',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: id,
          name
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;