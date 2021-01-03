import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, Platform, ScrollView, VirtualizedList, Yel, LogBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChatId, selectChatName } from './features/chatSlice';
import { selectUser } from './features/userSlice';
import { db } from '../firebase';
import firebase from 'firebase';

LogBox.ignoreAllLogs();

const Container = styled.KeyboardAvoidingView`
    flex: 1;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    background-color: #fff;
`;

const TitleDiv = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background-color: #f5f5f5;
    padding: 10px;
    border-bottom-color: lightgray;
    border-bottom-width: 1px;
`;

const MessagesDiv = styled.View`
    display: flex;
    flex-direction: column-reverse;
`;

const InputDiv = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #f5f5f5;
    padding: 15px;
    border-top-color: lightgray;
    border-top-width: 1px;
`;

const Input = styled.TextInput`
    width: 80%;
    border-color: lightgray;
    border-width: 1px;
    border-radius: 15px;
    padding: 5px;
    background-color: #fff;
`;

const InputButton = styled.TouchableOpacity`
    width: 15%;
    padding: 5px;
    background-color: #90206b;
    border-radius: 50px;
    margin-left: 10px;
`;
const keyboardVerticalOffset = Platform.OS === 'ios' ? 66 : 0;

const Chat = () => {
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);
    const user = useSelector(selectUser);
    const [input, setInput] = useState('');

    useEffect(()=> {
        if(chatId) {
            db.collection("chats")
            .doc(chatId)
            .collection("messages")
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        }
    },[chatId]);

    const sendMessage = e => {
        e.preventDefault();
        if(input.length !== 0){
            db.collection('chats')
            .doc(chatId).collection('messages')
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                uid: user.uid,
                photo: user.photo,
                email: user.email,
                displayName: user.name
            });
            setInput('');
        }
    }

    return (
        <Container behavior={Platform.OS === "ios" ? 'padding': null} keyboardVerticalOffset={keyboardVerticalOffset} >
            <TitleDiv>
                <Text style={{fontSize:20}} >To: {chatName}</Text>
                <Text style={{fontSize:20}} ></Text>
            </TitleDiv>
            <ScrollView>
            <MessagesDiv>
                <FlatList 
                    data={messages}
                    keyExtractor={(message) => message.id}
                    renderItem={({item}) => {
                        return <Message
                        id={item.id}
                        keyExtractor={item => item.id}
                        contents={item.data}
                        />
                    }}
                    />
            </MessagesDiv>
            </ScrollView>
            <InputDiv>
                <Input 
                    onChangeText={input => setInput(input)}
                    value={input}
                     />
                <InputButton onPress={sendMessage} >
                    <Ionicons name="send-outline" size={24} color="white" style={{textAlign:'center'}} />
                </InputButton>
            </InputDiv>
        </Container>
    )
}

export default Chat;
