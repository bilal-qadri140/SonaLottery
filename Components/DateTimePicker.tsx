import { View, Text } from 'react-native'
import React, { useState } from 'react'
//date picker
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
const DateTimePicker = (currentMode: string) => {


    const [date, setDate] = useState(new Date());


    const showMode = (currentMode: 'date' | 'time') => {
        const setDates = (event: DateTimePickerEvent, date: Date) => {
            const {
                type,
                nativeEvent: { timestamp, utcOffset },
            } = event;

            setDate(date)
        };
        DateTimePickerAndroid.open({
            value: date,
            onChange: setDates,
            mode: currentMode,
            is24Hour: false,
            minimumDate: new Date(),
        });
    };

    return (
        <>
        
        </>
  )
}

export default DateTimePicker