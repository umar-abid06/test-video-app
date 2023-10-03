/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {token, uid, channelName} from '../constants';
import {join, setupVideoSDKEngine} from '../config';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {joiningMeet} from '../redux/video/video-slice';

const HomeScreen = ({navigation}) => {
  const [text, setText] = useState('');
  const agoraEngineRef = useRef();

  const dispatch = useDispatch();
  const isJoined = useSelector(state => state.video.isJoined);
  const ID = useSelector(state => state.video.participants);
  const isFocused = useIsFocused();
  useEffect(() => {
    setupVideoSDKEngine(agoraEngineRef);
  }, []);

  useEffect(() => {
    if (isFocused) {
      if (isJoined) {
        navigation.navigate('Meet');
      }
    }
  });

  const handlePress = () => {
    if (text === channelName) {
      const joined = join(agoraEngineRef);
      if (joined === true) {
        dispatch(joiningMeet(uid));
      }
      setText('');
      console.log('From Home', isJoined, '--> ', ID);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3d405b" />
      <Text style={styles.header}>Welcome To Meeting!</Text>

      <Text style={styles.label}>Enter the channel name you want to join!</Text>

      <TextInput
        label="Channel Name"
        value={text}
        onChangeText={t => setText(t)}
        mode="flat"
        style={styles.input}
      />
      <Button mode="contained" onPress={handlePress}>
        Join Channel
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3d405b',
  },
  header: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    width: wp('75%'),
    textAlign: 'center',
    marginTop: hp('15%'),
  },
  label: {
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold',
    width: wp('75%'),
    marginVertical: hp('5%'),
    textAlign: 'center',
  },
  input: {
    width: wp('70%'),
    marginBottom: hp('5%'),
  },
});
