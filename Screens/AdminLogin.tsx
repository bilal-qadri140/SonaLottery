import { View, TextInput, StyleSheet, Pressable, Text, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './App'
// TopBar import
import TopBar from '../Components/TopBar';
// import  Navigaton props from App.tsx
type AdminLoginProps = NativeStackScreenProps<RootStackParamList>

const AdminLogin = ({ navigation }: AdminLoginProps) => {

    // states for username and password
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    // login button press handling
    const loginPressed = () => {
        if (!username || !password)
            Alert.alert('Error!', 'All feilds are required!')
        else if (username === 'admin' && password === 'admin123') {
            navigation.navigate('AdminPannel')
            setUsername('')
            setPassword('')
        }
        else
            Alert.alert('Error!', 'Wrong username or password')
    }

    // Screen Navigations
    const homeIconPressed = () => {
        navigation.navigate('Home')
    }
    const tvIconPressed = () => {
        navigation.navigate('VideoPlayer')
    }
    const adminIconPressed = () => {
        navigation.navigate('AdminLogin')
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.topbarContainer}>
                <TopBar
                    tvIconPressed={tvIconPressed}
                    homeIconPressed={homeIconPressed}
                    adminIconPressed={adminIconPressed}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.heading}>Admin Log in</Text>
                <View style={styles.inputWrapper}>
                    <Icon name='user' size={25} color={'#000'}/>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Username'
                        value={username}
                        onChangeText={(text) => { setUsername(text) }}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Icon name='lock' size={25} color={'#000'}/>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Password'
                        secureTextEntry
                        value={password}
                        onChangeText={(text) => { setPassword(text) }}
                    />
                </View>

                <Pressable
                    style={styles.button}
                    onPress={loginPressed}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>

            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d8d0d0',
        height: '100%',
        // justifyContent: 'center',
        // marginTop:500
    },
    topbarContainer: {
        position: 'absolute',
        top: 0,
        width: '100%'
    },
    heading: {
        fontSize: 26,
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: -20,
        marginBottom: 20,
        color:'#000'
    },
    inputContainer: {
        justifyContent: 'center',
        marginTop: '50%'

    },
    inputWrapper: {
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 20,
        paddingLeft: 12,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 12,
        width: '100%',
        color:'#000'
    },
    button: {
        width: '70%',
        backgroundColor: '#17A05D',
        alignSelf: 'center',
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 30,

    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#fff'
    }
})
export default AdminLogin