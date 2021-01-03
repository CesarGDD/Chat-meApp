import React from 'react';
import { View, Text } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import styled from 'styled-components';

const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    width: 80%;
    justify-content: space-between;
    margin: 15px;
`;

const MessageText = styled.Text`
    background-color:  #f3f3f5;
    font-size: 20px;
    padding: 15px;
    border-radius: 20px;
    margin: 10px;
    margin-right: auto;
`;

const Timestamp = styled.Text`
    color: gray;
    position: absolute;
    bottom: -5px;
    right: 0px;
    font-size: 10px;
`;

const Message = ({contents}) => {
    const user = useSelector(selectUser);
    const userChat = user.email === contents.email;

    return (
        <Container style={userChat
            ?{ flexDirection: 'row-reverse', marginLeft:'auto' } 
            : null} >
            <UserAvatar size={50} src={contents.photo} 
                style={userChat ?{ marginLeft: 10, marginRight: 10 }: null} />
            <MessageText 
            style={userChat
            ?{overflow:"hidden", backgroundColor: '#90206b', color:'#fff',} 
            : {overflow:'hidden'}} > {contents.message} </MessageText>
            <Timestamp  >{new Date(contents.timestamp?.toDate()).toLocaleDateString()}</Timestamp>
        </Container>
    )
}

export default Message;
