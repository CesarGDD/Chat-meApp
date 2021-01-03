import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import UserAvatar from 'react-native-user-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase';
import { selectChatId, selectChatName, setChat } from './features/chatSlice';

const Container = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
    border-bottom-color: lightgray;
    border-bottom-width: 1px;
`;

const ChatInfo = styled.View`
    margin-left: 15px;
    width: 100%;
`;

const Timestamp = styled.Text`
    position: absolute;
    top: 5px;
    right: 70px;
`


const InfoChats = ({name, id, navigation}) => {
    const dispatch = useDispatch();
    const [chatInfo, setChatInfo] = useState([]);

    useEffect(() => {
        db.collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map(doc => doc.data())))
    },[id]);

    const chatHandle = () => {
        dispatch(
            setChat({
                chatId: id,
                chatName: name
            })
        );
        navigation.navigate('Chat');
    }

    return (
        <Container onPress={chatHandle} >
            {!chatInfo[0]?.photo ? <ActivityIndicator /> 
            : <UserAvatar size={50} src={chatInfo[0]?.photo} />
            }
            <ChatInfo>
                <Text style={{fontSize: 16, fontWeight:'bold'}} >{name}</Text>
                <Text>{chatInfo[0]?.message}</Text>
                <Timestamp>{!chatInfo[0]?.timestamp ? 'No messages yet' : new Date(chatInfo[0]?.timestamp?.toDate()).toLocaleDateString()}</Timestamp>
            </ChatInfo>
        </Container>
    )
}

export default InfoChats;
