import { View, Text, StyleSheet, TextInput, Pressable, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './App'
// TopBar import
import TopBar from '../Components/TopBar';
// icon 
import Icon from 'react-native-vector-icons/FontAwesome';

// import  {initializeApp}  from '@react-native-firebase/app';
import "firebase/firestore";

import { db } from '../Firebase/Config';
//date picker
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
// import  Navigaton props from App.tsx
type AdminPannelProps = NativeStackScreenProps<RootStackParamList>


const AdminPannel = ({ navigation }: AdminPannelProps) => {

    const [date, setDate] = useState(new Date());
    // const [time, setTime] = useState(new Date(1598051730000));
    const [draw, setDraw] = useState('')
    const [youtubeLink, setYoutubeLink] = useState('')
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [value, setValue] = useState(dayjs());

    // console.log(date);

    // adding data to database
    async function addDraw() {
        // Alert.alert("Document successfully written!");
        if (!draw)
            Alert.alert('Error!', "Please enter draw!");
        else {
            await db.collection("draw").add({
                number: draw,
                date: date,
            }).then(() => {
                Alert.alert("Data added successfully!");
                // setDate
                setDraw('')
            }).catch((error) => {
                console.error("Error writing document: ", error);
                Alert.alert('Error!', 'Draw data is not uploaded.')
            });
        }
    }

    const deletePreviousLink = async (collectionPath: string) => {
        try {
            const querySnapshot = await db.collection(collectionPath).get();

            // Loop through all documents in the collection and delete them
            const deletionPromises = querySnapshot.docs.map(async (doc) => {
                await db.collection(collectionPath).doc(doc.id).delete();
            });

            // Wait for all deletions to complete
            await Promise.all(deletionPromises);

            console.log(`All documents in the collection '${collectionPath}' have been deleted.`);
        } catch (error) {
            console.error("Error deleting documents:", error);
        }
    };

    const addLink = async () => {
        if (!youtubeLink) {
            Alert.alert('Error!', "Please enter Youtube channel Id.");
        } else {
            try {
                // Delete all documents in the 'link' collection
                await deletePreviousLink('link');

                // Add the new link document
                await db.collection("link").add({
                    url: youtubeLink,
                });

                Alert.alert("Link added successfully!");
                setYoutubeLink('');
            } catch (error) {
                console.error("Error adding youtube link: ", error);
            }
        }
    };

    // showing date or time picker accourding to diven mode
    const showMode = (currentMode: 'date' | 'time') => {
        const setDates = (event: DateTimePickerEvent, date: Date) => {
            const {
                type,
                nativeEvent: { timestamp, utcOffset },
            } = event;

            setDate(date)
            console.log(date);

            console.log(date.toLocaleDateString());

        };
        DateTimePickerAndroid.open({
            value: date,
            onChange: setDates,
            mode: currentMode,
            is24Hour: false,
            minimumDate: new Date(),
        });
    };

    const showDatepicker = () => {
        showMode('date');
        //   showTimepicker
    };

    const showTimepicker = () => {
        showMode('time');
    };
    // } 


    const handleIconPress = () => {
        // Toggle the visibility of the component
        setIsDatePickerVisible(!isDatePickerVisible);
    };

    const addDrwaPressed = () => {
        Alert.alert('Succeed.', `${draw}   ${date}`)
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
                <Text style={styles.heading}>Adding Draw Data</Text>
                <View style={styles.inputWrapper}>
                    <Icon name='ticket' size={25} color={'#000'}/>
                    <TextInput
                        style={styles.inputText}
                        placeholder='Draw'
                        value={draw}
                        onChangeText={(text) => { setDraw(text) }}
                    />

                </View>
                <View style={[styles.inputWrapper, { paddingVertical: 10 }]}>
                    <Icon name='calendar' size={35} color={'#000'}
                        onPress={showTimepicker}
                    />
                    <Text style={[styles.textTime,]}>
                        {date.toLocaleTimeString()}

                    </Text>

                </View>


                <Pressable
                    style={styles.button}
                    onPress={addDraw}
                >
                    <Text style={styles.buttonText}>Add Draw</Text>
                </Pressable>


                {/* Youtube video link section */}
                <View style={styles.inputWrapper}>
                    <Icon name='link' size={25} color={'#000'} />
                    <TextInput
                        style={styles.inputText}
                        placeholder='Channel id'
                        value={youtubeLink}
                        onChangeText={(text) => { setYoutubeLink(text) }}
                    />
                </View>
                <Pressable
                    style={styles.button}
                    onPress={addLink}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#d8d0d0',
        // justifyContent: 'center'
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
        // backgroundColor:'#f04',
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
        paddingRight: 8,
        width: '90%',
        height: 'auto',
        color:'#000'
    },
    textTime: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
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
    },
    datePicker: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginHorizontal: 35,
        height: 'auto',
        borderRadius: 15,
    },
    todayButton: {
        paddingHorizontal: 16,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: '#17A05D',
        alignSelf: 'center',
        marginBottom: 15,

    },
    todayButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
    }
})

export default AdminPannel