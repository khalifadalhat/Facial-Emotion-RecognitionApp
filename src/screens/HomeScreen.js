// import React, { useState, useRef } from 'react';
// import { View, Button } from 'react-native';
// import { Camera } from 'expo-camera';
// import axios from 'axios';

// const HomeScreen = () => {
//   const cameraRef = useRef(null);
//   const [isLiveCaptureActive, setIsLiveCaptureActive] = useState(false);

//   const toggleLiveCapture = async () => {
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     if (status === 'granted') {
//       setIsLiveCaptureActive(!isLiveCaptureActive);
//     } else {
//       alert('Camera permission is required to use the live video feed.');
//     }
//   };

//   const sendFrameToServer = async (base64Image) => {
//     try {
//       const response = await axios.post('http://172.20.10.7:5000/video_feed', {
//         image: base64Image,
//       });

//       // Handle the response from the server as needed
//       console.log(response.data.emotion);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleCameraCapture = async () => {
//     if (cameraRef.current) {
//       try {
//         const photoData = await cameraRef.current.takePictureAsync({ base64: true });
//         sendFrameToServer(photoData.base64);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {isLiveCaptureActive && (
//         <Camera
//           style={{ flex: 1 }}
//           type={Camera.Constants.Type.front}
//           ref={cameraRef}
//         />
//       )}
//       <Button
//         title={isLiveCaptureActive ? 'Stop Live Feed' : 'Start Live Feed'}
//         onPress={toggleLiveCapture}
//       />
//       <Button
//         title="Capture Frame"
//         onPress={handleCameraCapture}
//         disabled={!isLiveCaptureActive}
//       />
//     </View>
//   );
// };

// export default HomeScreen;

import React, { useState, useRef } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';

const App = () => {
  const cameraRef = useRef(null);
  const [emotion, setEmotion] = useState('');

  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ base64: true });
        sendFrameToServer(photo.base64);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const sendFrameToServer = async (base64Image) => {
    try {
      const response = await axios.post('http://172.20.10.7:5000/video_feed', {
        image: base64Image,
      });

      // Handle the response from the server
      setEmotion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>{emotion}</Text>
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.front} ref={cameraRef} />
      <View style={styles.buttonContainer}>
      <Button title="Capture Image" onPress={captureImage} style={styles.button} color="#fff" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#008F68',
    borderRadius: 5,
    padding: 8,
    margin: 8,
  },
  bottomContainer: {
    justifyContent: 'flex-end',
    width: '90%',
    margin: 20,
    padding: 10,
  },
})



export default App;
{/* <View style={styles.buttonContainer}>
      <Button title="Capture Image" onPress={captureImage} style={styles.button} color="#fff" />
      </View> */}
      // buttonContainer: {
      //   backgroundColor: '#008F68',
      //   borderRadius: 5,
      //   padding: 8,
      //   margin: 8,
      // },
      // bottomContainer: {
      //   justifyContent: 'flex-end',
      //   width: '90%',
      //   margin: 20,
      //   padding: 10,
      // },