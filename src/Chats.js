import React, { useEffect, useState } from 'react';
import { View, TextInput, Modal, Text, Button, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import InfoChats from './InfoChats';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/userSlice';
import {db} from '../firebase';

const Container = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
    width: 100%;
`;

const Header = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    height: 100px;
    border-bottom-color: lightgrey;
    border-bottom-width: 1px;
`;

const AddChat = styled.TouchableOpacity`
    flex: 1;
    background-color: #e1e1e1;
    border-radius: 30px;
    padding: 12px;
    margin: 10px;
`;

const Logout = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 20%;
`;
const Input = styled.TextInput`
    width: 100%;
    border-color: lightgray;
    border-width: 2px;
    border-radius: 15px;
    padding: 5px;
    background-color: #fff;
    margin-bottom: 20px;
`;

const ModalContainer = styled.View`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 250px;
    margin-left: 9%;
    align-items: center;
    width: 80%;

`;

const ModalView = styled.View`
    display: flex;
    width: 100%;
    align-items: center;
    border-radius: 10px;
    background-color: lightgray;
    padding: 15px;
`;

const ModalButtonsView = styled.View`
    display:flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-around;
`;

const ModalButtons = styled.TouchableOpacity `
    background-color: #90206b;
    border-radius: 15px;
    padding: 10px;
`;


const Chats = ({navigation}) => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [chats, setChats] = useState([]);
    const [modal, setModal] = useState(false);
    const [input, setInput] = useState('');

    useEffect(()=> {
        db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    },[]);

    const signOut = () => {
        firebase.auth().signOut().then(function() {
            navigation.navigate('Home');
              dispatch(logout());
          }).catch(function(error) {
            alert('cant signout')
          });
        
      }

      const addChat = e => {
          e.preventDefault();
          if(input.length !== 0) {
              db.collection('chats').add({
                  chatName: input
              });
              setInput('');
              setModal(false);
          }
      }


    return (
        <Container>
             <Modal visible={modal} animationType='fade' transparent={true} >
                    <ModalContainer>
                        <ModalView>
                            <Text style={{fontSize:18, fontWeight: 'bold'}} >NAME OF THE CHAT</Text>
                            <Input value={input} onChangeText={input => setInput(input)} />
                            <ModalButtonsView>
                                <ModalButtons onPress={()=> setModal(false)} >
                                    <Text style={{color:'#fff', fontWeight:'bold'}}>CLOSE</Text>
                                </ModalButtons>
                                <ModalButtons onPress={addChat} >
                                    <Text style={{color:'#fff', fontWeight:'bold'}}>ADD CHAT</Text>
                                </ModalButtons>
                            </ModalButtonsView>
                        </ModalView>
                    </ModalContainer>
                </Modal>
            <Header>
                <UserAvatar size={50} name={user?.name} src={user?.photo} />
                <AddChat onPress={()=>setModal(true) } >
                    <Text style={{fontWeight: 'bold', fontSize:20, textAlign:'center'}} > NEW CHAT </Text>
                </AddChat>
                <Logout onPress={signOut} >
                    <Text style={{color: 'gray', marginRight:3}} >Logout</Text>
                    <Ionicons name="exit-outline" size={24} color="gray" />
                </Logout>
            </Header>
                <FlatList 
                data={chats}
                keyExtractor={(item) => item.id }
                renderItem={({item}) => {
                    return  <InfoChats 
                        name={item.data.chatName}
                        id={item.id}
                        keyExtractor={item => item.id}
                        navigation={navigation}
                        />
                }}
                />
        </Container>
    )
}

export default Chats;
