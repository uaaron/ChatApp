import * as ImagePicker from "expo-image-picker";
import * as Location from 'expo-location'
import * as Location from 'expo-location'





const CustomActions = ({ }) => {

  // Function to pick an image from the device's media library
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
    } else Alert.alert("Permissions haven't been granted.");
  };

  // Function to take a photo using the device's camera
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
    } else Alert.alert("Permissions haven't been granted.");
  };

  // Function to get the current device location
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();

    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } else {
      Alert.alert("Permissions to read location aren't granted");
    }
  }

}

export default CustomActions;

