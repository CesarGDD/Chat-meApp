import React from 'react';
import { View, Text, Button, TouchableOpacity, LogBox } from 'react-native';
import {IOS, AND} from '../firebase';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/userSlice';
import styled from 'styled-components';

LogBox.ignoreAllLogs();

const Buttons = styled.TouchableOpacity`
    display: flex;
    align-items:center;
    padding: 15px;
    margin: 10px;
    border-radius: 10px;
    background-color: #90206b;
`;

const Login = () => {
    const dispatch = useDispatch();

   const signInWithGoogleAsync = async () => {
      try {
        const result = await Google.logInAsync({
          androidClientId: AND,
          iosClientId: IOS,
          scopes: ['profile', 'email'],
        });
    
        if (result.type === 'success') {
            onSignIn(result);
          return result.accessToken;
        } else {
          return { cancelled: true };
        }
      } catch (e) {
        return { error: true };
      }
    }

    const onSignIn = (googleUser) => {
        // console.log('Google Auth Response', googleUser?.user);
        dispatch(login({ 
            uid: googleUser.user.id,
            photo: googleUser.user.photoUrl,
            email: googleUser.user.email,
            name: googleUser.user.name
        }));
      }

    return (
        <View>
          <Buttons onPress={signInWithGoogleAsync} >
            <Text style={{color:"#fff", fontWeight:"bold"}} >SIGNIN</Text>
          </Buttons>
        </View>
    )
}

export default Login;
