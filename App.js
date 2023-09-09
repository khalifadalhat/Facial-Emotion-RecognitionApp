import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
import Logo from './assets/Logo.png';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function WelcomeScreen() {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Home'); // Navigate to the "Home" screen
  };
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
      <Text style={styles.h1}>Facial Emotion Recognition</Text>
      <Text style={styles.h2}>Welcome to my facial emotion recognition system</Text>
      </View>
      <View style={styles.middleContainer}>
      <Image
          source={Logo}
          style={styles.image}
        />
        </View>
        <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title="LET'S START"
            style={styles.button}
            onPress={() => onPress()}
            color="#fff"
          />
          </View>
        </View>
      <StatusBar style="auto" />
    </View> 
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    color: '#008F68',
    fontSize: 40,
  },
  h2: {
    color: '#000',
    fontSize: 18,
    marginTop: 8,
  },image: {
    width: 300,
    height: 260,
    justifyContent: 'center',
  },buttonContainer: {
    backgroundColor: '#008F68',
    borderRadius: 5,
    padding: 8,
    margin: 8,
  },topContainer: {
  flex: 2,
  justifyContent: 'center',
  alignItems: 'center',
},
middleContainer: {
  flex: 3,
  justifyContent: 'flex-start',
  alignItems: 'center',
},
bottomContainer: {
  justifyContent: 'flex-end',
  width: '90%',
  margin: 20,
  padding: 10,
},
});
