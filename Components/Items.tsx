import { View, Text, StyleSheet, Image, Pressable, ImageSourcePropType } from 'react-native'
import React, { PropsWithChildren } from 'react'


// Item Props
type ItemProps = PropsWithChildren<{
    imageURL: ImageSourcePropType;
    imageTitle: string;
    onPress: () => void
}>

// main Screen
const Items = ({ imageURL, imageTitle, onPress }: ItemProps) => {
    return (
        <Pressable
            style={styles.container}
            onPress={onPress}
        >
            <View>
                <Image
                    source={imageURL}
                    style={styles.image}
                />
            </View>
            <View>
                <Text style={styles.imageText}>{imageTitle}</Text>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '50%',
        height: 'auto',
        marginVertical: 20,
        alignItems: 'center'
    },
    image: {
        width: 120,
        height: 120,
        
    },
    imageText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color:'#000'
    }
})
export default Items