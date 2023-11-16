import { View, Text, StyleSheet, ScrollView, Dimensions, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './App'
// TopBar import
import TopBar from '../Components/TopBar';
// import  Navigaton props from App.tsx

import { db } from '../Firebase/Config';
// import { QuerySnapshot, doc } from 'firebase/firestore';
import { FirebaseFirestoreTypes, firebase } from '@react-native-firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
//date picker
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';

type DrawProps = NativeStackScreenProps<RootStackParamList>
type DrawItem = {
    id: string;
    data: FirebaseFirestoreTypes.DocumentData;
};
const Draw = ({ navigation }: DrawProps) => {

    const [filteredDate, setFilteredDate] = useState(new Date())
    const [draws, setDraws] = useState<DrawItem[]>([]);
    // Screen height
    const screenHeight = Dimensions.get('window').height;

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



    const getDraw = async () => {

        const currentTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
        // Convert Firestore Timestamp to JavaScript Date
        const currentDate = currentTimestamp.toDate();

        // subtract one day to the JavaScript Date
        const prevDayDate = new Date(currentDate);
        prevDayDate.setDate(currentDate.getDate() - 1);

        const newDateSearch = firebase.firestore.Timestamp.fromDate(new Date())
        // console.log('time ', newDateSearch.toDate());
        try {
            // const querySnapshot = await db.collection("draw").orderBy("date", "asc").get();
            const querySnapshot = await db.collection("draw")
                .where("date", ">", prevDayDate) // Adjust the field name
                // .where("date", "<=", newDateSearch) // Add one day to cover the entire day
                .orderBy("date", "asc") // Order by timestamp if needed
                .get();
            const drawsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }));
            setDraws(drawsData);
            console.log('draw ', draws);

        } catch (error) {
            console.error("Error fetching draw data:", error);
        }
    };

    // Fetch draw data when the component mounts
    useEffect(() => {
        getDraw();
    }, []);

    // Function to format the date
    const formatDate = (timestamp: Timestamp) => {
        console.log(timestamp);
        const date = timestamp.toDate(); // Convert Timestamp to Date object
        return date.toLocaleTimeString(); // Format the date as a string
    };

    const showMode = (currentMode: 'date' | 'time') => {
        const setDates = (event: DateTimePickerEvent, date: Date) => {
            const {
                type,
                nativeEvent: { timestamp, utcOffset },
            } = event;

            setFilteredDate(date)
            console.log(filteredDate.toLocaleDateString(), 'hi');

        };
        DateTimePickerAndroid.open({
            value: filteredDate,
            onChange: setDates,
            mode: currentMode,
            is24Hour: false,
            // minimumDate: new Date(),
        });
    };
    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <View style={[styles.container, { height: screenHeight }]}>
            <View style={styles.topbarContainer}>
                <TopBar
                    tvIconPressed={tvIconPressed}
                    homeIconPressed={homeIconPressed}
                    adminIconPressed={adminIconPressed}
                />
            </View>
            <View style={styles.mainContainer}>

                {/* Display the draws data */}
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Draw Result</Text>
                    <Icon name='calendar' size={35}
                    // color={'#d49'}
                    // onPress={showFilteredResult}
                    />
                </View>
                {draws ? <FlatList
                    style={styles.list}
                    data={draws}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.drawItem}>
                            <Text style={styles.resultText1}>{formatDate(item.data.date)}</Text>
                            <Text style={styles.resultText2}>{item.data.number}</Text>
                        </View>
                    )}
                /> : <View style={styles.noDataShow}>
                    <Text style={styles.noDataShowText}> No data found</Text>
                    </View>}

               
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        // height: '100%',
        backgroundColor: '#d8d0d0',
        // justifyContent: 'center',
        paddingBottom: 50,
    },
    topbarContainer: {
        // position: 'absolute',
        top: 0,
        width: '100%'
    },
    headingContainer: {
        marginTop: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor:'#de3',
        height: 'auto',
        marginBottom: 20,
    },
    heading: {
        fontSize: 26,
        fontWeight: '800',
        alignSelf: 'center',
        // marginTop: -20,
        color:'#000'
    },
    mainContainer: {
        height: 'auto',
        marginBottom: 50,
    },
    drawItem: {
        backgroundColor: '#fff',
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        // justifyContent:'space-between',
        height: 'auto'
    },
    resultText1: {
        fontSize: 18,
        width: '35%',
        color:'#000',
        fontWeight:'bold'
    },
    resultText2: {
        fontSize: 18,
        marginLeft: 20,
        width: '60%',
        marginRight: 5,
        color:'#000',
        fontWeight:'bold'
    },
    list: {
        marginBottom: 100,
    },
    noDataShow:{
        width:'60%',
        height:200,
        // backgroundColor:'#f40',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    noDataShowText:{
        fontSize:25,
        fontWeight:'bold',
        color:'#000'
    }
})

export default Draw