/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, Platform, SafeAreaView} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from 'react-native-agora';
import {appId, token, channelName, uid} from '../constants';
import {Button} from 'react-native-paper';

const TestScreen = () => {
  const [isJoined, setIsJoined] = useState(false);
  const agoraEngineRef = useRef();

  useEffect(() => {
    setupVideoSDKEngine();
  });

  const setupVideoSDKEngine = async () => {
    try {
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {},
        onUserJoined: (_connection, Uid) => {},
        onUserOffline: (_connection, Uid) => {},
        // onUserEnableVideo: () => {
        //   agoraEngine.disableVideo();
        // },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngine.enableVideo();
    } catch (e) {
      console.log(e);
    }
  };
  const join = async () => {
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      agoraEngineRef.current?.startPreview();

      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const stopVideo = async () => {
    // agoraEngineRef.current?.stopPreview();
    agoraEngineRef.current?.disableVideo();
  };
  const leave = () => {
    agoraEngineRef.current?.leaveChannel();
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <React.Fragment key={0}>
        <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
        <Button onPress={join}>Join</Button>
        <Button onPress={stopVideo}>Stop Video</Button>
        <Button onPress={leave}>Leave</Button>
      </React.Fragment>
    </SafeAreaView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  videoView: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
  },
});
