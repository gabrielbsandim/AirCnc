import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, Alert, Image, ScrollView, StyleSheet, AsyncStorage, Text, TouchableOpacity} from 'react-native';



import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.1.102:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA!' : 'REJEITADA!'}`);
            })
        })
    }, []);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    

    // async function handleLogout() {
    //     console.log('teste1', await AsyncStorage.getItem('user'));
    //     await console.log('testeeeee');
        
    //     await AsyncStorage.removeItem('user');
    //     console.log('teste1', AsyncStorage.getItem('user'));

    // }
    
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>

            {/* <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logout}>Sair</Text>
            </TouchableOpacity> */}
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
    },

    logout: {
        backgroundColor: '#fff',
        color: '#f05a5b',
    },
});     