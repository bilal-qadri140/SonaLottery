import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

type TopBarProps = {
    homeIconPressed: () => void
    tvIconPressed: () => void
    adminIconPressed: () => void
}

const TopBar = ({ homeIconPressed, tvIconPressed, adminIconPressed }: TopBarProps) => {

    return (
        <View style={styles.container}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#17A05D', '#3bc19c']}
                style={styles.topBar}>
                <View >
                    <Text style={styles.barText}>Sona Lottery</Text>
                </View>
                <View style={styles.iconWrapper}>
                    <View style={styles.icon}>
                        <Icon
                            name="home" size={35}
                            color="#fff"
                            onPress={homeIconPressed} />
                        <Text style={styles.iconText}>Home</Text>
                    </View>
                    <View style={styles.icon}>
                        <Icon
                            name="tv" size={35}
                            color="#fff"
                            onPress={tvIconPressed} />
                        <Text style={styles.iconText}>TV</Text>
                    </View>
                    <View style={styles.icon}>
                        <Icon
                            name="user" size={35}
                            color="#fff"
                            onPress={adminIconPressed} />
                        <Text style={styles.iconText}>Admin</Text>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
    },
    topBar: {
        height: 70,
        width: '100%',
        paddingLeft: 12,
        flexDirection: 'row',
        alignItems: 'center',
    }, 
    barText: {
        fontWeight: '900',
        color: '#f7f5b2',
        fontSize: 24,
        paddingHorizontal: 10
    },
    iconWrapper: {
        flex: 1,
        flexDirection: 'row',
        // paddingLeft: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginLeft: '10%'
    },
    icon: {
        alignItems:'center'
    },
    iconText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})
export default TopBar