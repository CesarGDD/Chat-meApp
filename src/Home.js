import React from 'react';
import { Text } from 'react-native';
import Login from './Login';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import styled from 'styled-components';

const Container = styled.View`
    flex: 1;
    display: flex;
    justify-content:center;
    width: 100%;
`;

const Buttons = styled.TouchableOpacity`
    display: flex;
    align-items:center;
    padding: 15px;
    margin: 10px;
    border-radius: 10px;
    background-color: #90206b;
`;

const Home = ({navigation}) => { 
    const user = useSelector(selectUser);

    return (
        <Container>
            {user ? navigation.navigate('Chats'): <Login />}
            {user
                ?
                <Buttons onPress={() => navigation.navigate('Chats')} >
                    <Text style={{color:"#fff", fontWeight:"bold"}} >CHATS</Text>
                </Buttons>
                : null
            }
        </Container>
    )
}

export default Home;
