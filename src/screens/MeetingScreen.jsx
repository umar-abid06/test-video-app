/* eslint-disable prettier/prettier */
import React, {useRef, useState, useEffect, useMemo} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {RtcSurfaceView} from 'react-native-agora';
import {IconButton} from 'react-native-paper';
import {leave} from '../config';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {leavingMeet} from '../redux/video/video-slice';
import RtcEngine from 'react-native-agora';
const MeetingScreen = ({navigation}) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const dispatch = useDispatch();
  const isLeft = useSelector(state => state.video.isLeft);
  const agoraEngineRef = useRef();
  const rtcEngine = useMemo(() => new RtcEngine(), []);

  useEffect(() => {
    rtcEngine.disableAudio();
    rtcEngine.disableVideo();
  }, [rtcEngine]);

  useEffect(() => {
    if (isLeft === true) {
      navigation.navigate('Home');
    }
  }, [navigation, isLeft]);

  const handleLeave = () => {
    setIsAudioEnabled(false);
    setIsVideoEnabled(false);
    const left = leave(agoraEngineRef);
    if (left) {
      dispatch(leavingMeet());
    }
    console.log('From Meeting Screen', isLeft);
  };

  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);

    if (isAudioEnabled) {
      rtcEngine.disableAudio();
    } else {
      rtcEngine.enableAudio();
    }
  };
  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);

    if (isVideoEnabled) {
      rtcEngine.disableVideo();
    } else {
      rtcEngine.enableVideo();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <React.Fragment key={0}>
        <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
      </React.Fragment>

      <View style={styles.btnContainer}>
        <IconButton
          icon={isAudioEnabled ? 'microphone' : 'microphone-off'}
          containerColor="#0077b6"
          iconColor={'white'}
          size={32}
          onPress={toggleAudio}
        />
        <IconButton
          icon={isVideoEnabled ? 'video' : 'video-off'}
          containerColor="#0077b6"
          iconColor={'white'}
          size={32}
          onPress={toggleVideo}
        />
        <IconButton
          icon="phone-hangup"
          containerColor="#d00000"
          iconColor={'white'}
          size={32}
          onPress={handleLeave}
        />
      </View>
    </SafeAreaView>
  );
};

export default MeetingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  videoView: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
  },

  participantView: {
    flex: 0.4,
    width: wp('45%'),
    height: hp('30%'),
    position: 'relative',
    elevation: 30,
    top: hp('50%'),
    left: wp('10%'),
  },
  btnContainer: {
    top: hp('85%'),
    width: wp('80%'),
    marginBottom: 10,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  otherBtnContainer: {
    top: hp('45%'),
    width: wp('60%'),
    marginBottom: 20,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  joinButton: {
    position: 'absolute',
    top: hp('45%'),
    width: wp('50%'),
  },
});
// import React, {useRef, useState, useEffect} from 'react';
// import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
// import {PermissionsAndroid, Platform} from 'react-native';
// import {
//   ClientRoleType,
//   createAgoraRtcEngine,
//   IRtcEngine,
//   RtcSurfaceView,
//   ChannelProfileType,
// } from 'react-native-agora';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// const appId = 'dfb0663c8b2947279f629e742903c1f6';
// const channelName = 'test';
// const token =
//   '007eJxTYNBJZlr032lyXZiqfPXylI8Tcnzzfp6yyXcodLY7dWu521YFhpS0JAMzM+NkiyQjSxNzI3PLNDMjy1RzEyNLA+NkwzQzbQ6u1IZARoa0p65MjAwQCOKzMJSkFpcwMAAA4QUdWQ==';
// const uid = 0;

// const App = () => {
//   const agoraEngineRef = useRef(); // Agora engine instance
//   const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
//   const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
//   const [message, setMessage] = useState(''); // Message to the user

//   const join = async () => {
//     if (isJoined) {
//       return;
//     }
//     try {
//       agoraEngineRef.current?.setChannelProfile(
//         ChannelProfileType.ChannelProfileCommunication,
//       );
//       agoraEngineRef.current?.startPreview();
//       agoraEngineRef.current?.joinChannel(token, channelName, uid, {
//         clientRoleType: ClientRoleType.ClientRoleBroadcaster,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   const leave = () => {
//     try {
//       agoraEngineRef.current?.leaveChannel();
//       setRemoteUid(0);
//       setIsJoined(false);
//       showMessage('You left the channel');
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   function showMessage(msg) {
//     setMessage(msg);
//   }

//   const getPermission = async () => {
//     if (Platform.OS === 'android') {
//       await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//       ]);
//     }
//   };

//   useEffect(() => {
//     // Initialize Agora engine when the app starts
//     setupVideoSDKEngine();
//   });

//   const setupVideoSDKEngine = async () => {
//     try {
//       // use the helper function to get permissions
//       if (Platform.OS === 'android') {
//         await getPermission();
//       }
//       agoraEngineRef.current = createAgoraRtcEngine();
//       const agoraEngine = agoraEngineRef.current;
//       agoraEngine.registerEventHandler({
//         onJoinChannelSuccess: () => {
//           showMessage('Successfully joined the channel ' + channelName);
//           setIsJoined(true);
//         },
//         onUserJoined: (_connection, Uid) => {
//           showMessage('Remote user joined with uid ' + Uid);
//           setRemoteUid(Uid);
//         },
//         onUserOffline: (_connection, Uid) => {
//           showMessage('Remote user left the channel. uid: ' + Uid);
//           setRemoteUid(0);
//         },
//       });
//       agoraEngine.initialize({
//         appId: appId,
//         channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
//       });
//       agoraEngine.enableVideo();
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.main}>
//       <Text style={styles.head}>Agora Video Calling Quickstart</Text>
//       <View style={styles.btnContainer}>
//         <Text onPress={join} style={styles.button}>
//           Join
//         </Text>
//         <Text onPress={leave} style={styles.button}>
//           Leave
//         </Text>
//       </View>
//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.scrollContainer}>
//         {isJoined ? (
//           <React.Fragment key={0}>
//             <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
//             <Text>Local user uid: {uid}</Text>
//           </React.Fragment>
//         ) : (
//           <Text>Join a channel</Text>
//         )}
//         {isJoined && remoteUid !== 0 ? (
//           <React.Fragment key={remoteUid}>
//             <RtcSurfaceView
//               canvas={{uid: remoteUid}}
//               style={styles.videoView}
//             />
//             <Text>Remote user uid: {remoteUid}</Text>
//           </React.Fragment>
//         ) : (
//           <Text>Waiting for a remote user to join</Text>
//         )}
//         <Text style={styles.info}>{message}</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     paddingHorizontal: 25,
//     paddingVertical: 4,
//     fontWeight: 'bold',
//     color: '#ffffff',
//     backgroundColor: '#0055cc',
//     margin: 5,
//   },
//   main: {flex: 1, alignItems: 'center'},
//   scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
//   scrollContainer: {alignItems: 'center'},
//   videoView: {width: '90%', height: 500},
//   btnContainer: {flexDirection: 'row', justifyContent: 'center'},
//   head: {fontSize: 20},
//   info: {backgroundColor: '#ffffe0', color: '#0000ff'},
//   textWrapper: {
//     height: hp('70%'), // 70% of height device screen
//     width: wp('80%'), // 80% of width device screen
//   },
// });
