import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text } from 'react-native';

// TopBar import
import TopBar from '../Components/TopBar';

// video player import
import YoutubePlayer from 'react-native-youtube-iframe';

// navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './App'

// import { getChannelLink } from '../GlobalVariables/ChannelLink';
import ChannelLinkComponent from '../GlobalVariables/ChannelLink';

// import  Navigaton props from App.tsx
type VideoPlayerProps = NativeStackScreenProps<RootStackParamList>



// Main Screen
const VideoPlayer = ({ navigation }: VideoPlayerProps,linkUrl:string) => {

    // getting channel link to playVideo
    const link = ChannelLinkComponent();
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

    // Mobile Screen height 
    const screenHeight = Dimensions.get('window').height;
    // state for check video is playing or not
    const [playing, setPlaying] = useState(false);

    // if play pause it
    // if pause play it
    const togglePlaying = () => {
        setPlaying((prev) => !prev);
    }



    // accourding to state of video, play and pause the video
    const onStateChange = (state: string) => {
        switch (state) {
            case 'playing':
                setPlaying(true);
                break;
            case 'paused':
                setPlaying(false);
                break;
            case 'ended':
                setPlaying(false);
                // Video has ended
                break;
            case 'stopped':
                setPlaying(false);
                // Video has stopped
                break;
            case 'error':
                setPlaying(false);
                // Handle video loading error
                console.error('Video loading error');
                break;
            default:
                // Handle other states if needed
                break;
        }


    }

    return (
        <View style={[styles.container, { height: screenHeight * 0.969 }]}>
            <TopBar
                homeIconPressed={homeIconPressed}
                tvIconPressed={tvIconPressed}
                adminIconPressed={adminIconPressed}
            />
            <View style={[styles.videoWrapper,]}>
                <YoutubePlayer
                    height={300}
                    play={playing}
                    videoId={link}
                    onChangeState={onStateChange}

                />
                
                <Pressable style={[styles.button, styles.elevation]} onPress={togglePlaying} >
                    <Text style={styles.buttonText}>{playing ? 'PAUSE' : 'PLAY'}</Text>
                </Pressable>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d8d0d0'
    },

    videoWrapper: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 30,
    },
    button: {
        width: '70%',
        height: 'auto',
        backgroundColor: '#3bc19c',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: -40
    },
    elevation: {
        elevation: 10,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowColor: '#333',
        shadowOpacity: 0.6,
        shadowRadius: 2
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        paddingVertical: 6
    }
});

export default VideoPlayer;
