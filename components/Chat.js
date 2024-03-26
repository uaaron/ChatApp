import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

// Chat component
const Chat = ({ route, navigation }) => {
  const { name } = route.params;
  const { colorSelection } = route.params;
  //Effect to set username as title on screen
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [])

  return (
    <View style={[styles.container, { backgroundColor: colorSelection }]}>
      <Text>Hello Screen2!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Chat;