import { View, StyleSheet, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'

// Components
import TopBar from '../Components/TopBar';
import Items from '../Components/Items';
// import { setChannelLink }  from '../GlobalVariables/ChannelLink';
// for Internet connectivity
import NetInfo from "@react-native-community/netinfo";

// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './App'
import { db } from '../Firebase/Config';


// import navigation props from App.tsx
type HomeProps = NativeStackScreenProps<RootStackParamList>


// Mian Screen 
const Home = ({ navigation }: HomeProps) => {
    
    const [linkUrl, setLinkUrl] = useState('')


    // Screen height
    const screenHeight = Dimensions.get('window').height;

    // check for internet connectivity

    const checkConnection = () => {
        return new Promise((resolve, reject) => {
            NetInfo.addEventListener((networkState) => {
                if (networkState.isConnected) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    };

    const getLink = async () => {
        try {
            const querySnapshot = await db.collection("link").get();

            if (!querySnapshot.empty) {
                const drawData = querySnapshot.docs.map((doc) => {
                    return {
                        url: doc.data().url, // Replace 'date' with the actual field name in your document
                    };
                });

                // Log the date information
                drawData.forEach((linkId) => {
                    console.log(linkId.url);
                    // setChannelLink(linkId.url)
                    // console.log(channelLink)
                });
            } else {
                Alert.alert('Error!', 'No Video Found.')
            }
        } catch (error) {
            console.error("Error fetching draw data:", error);
        }
    };


    // images URL from assets folder
    const tvImageURL = require('../assets/images/TV.png')
    const ticketImageURL = require('../assets/images/tickets-ticket.png')


    //Screen Navigations 
    const tvImagePressed = () => {
        getLink()
        checkConnection().then((isConnected) => {
            if (isConnected) {
                navigation.navigate('VideoPlayer')
            } else {
                Alert.alert('Alert!', 'Please Connect to the internet', [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    }
                ])
            }
        });
    }

    const drawImagePressed = () => {
        navigation.navigate('DrawResult')
    }
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
        <View style={[styles.container, { height: screenHeight }]}>
            <TopBar
                homeIconPressed={homeIconPressed}
                tvIconPressed={tvIconPressed}
                adminIconPressed={adminIconPressed}
            />
            <View style={styles.mainContainer}>
                <Items
                    imageURL={tvImageURL} imageTitle='Live TV'
                    onPress={tvImagePressed}
                    
                />
                <Items
                    imageURL={ticketImageURL} imageTitle='Draw Result'
                    onPress={drawImagePressed}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        backgroundColor: '#d8d0d0'
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    }
})
export default Home