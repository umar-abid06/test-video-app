/* eslint-disable prettier/prettier */
import {
  ClientRoleType,
  createAgoraRtcEngine,
  ChannelProfileType,
} from 'react-native-agora';
import {appId, channelName, token, uid} from '../constants';

const setupVideoSDKEngine = agoraEngineRef => {
  try {
    agoraEngineRef.current = createAgoraRtcEngine();
    const agoraEngine = agoraEngineRef.current;
    agoraEngine.initialize({
      appId: appId,
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    agoraEngine.enableVideo();
    console.log('Sdk setup Completed!');
  } catch (e) {
    console.log(e);
  }
};

const join = agoraEngineRef => {
  try {
    agoraEngineRef.current?.setChannelProfile(
      ChannelProfileType.ChannelProfileCommunication,
    );
    agoraEngineRef.current?.startPreview();
    agoraEngineRef.current?.joinChannel(token, channelName, uid, {
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
    console.log('Channel Joined');
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const leave = agoraEngineRef => {
  try {
    agoraEngineRef.current?.stopPreview();
    agoraEngineRef.current?.leaveChannel();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export {setupVideoSDKEngine, join, leave};
