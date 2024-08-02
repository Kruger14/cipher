import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('screen');
import { BackHandler, ToastAndroid } from 'react-native';

const OnboardScreen = () => {
    const stack = useNavigation();


    useFocusEffect(
        React.useCallback(() => {
            // Prevent default behavior of going back
            const showToast = () => {
                ToastAndroid.show("you can't go back!", ToastAndroid.SHORT);
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', showToast);

            // Cleanup event listener on unmount
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', showToast);
            };
        }, [stack])
    );


    return (
        <View style={styles.container}>
            {/* Video Background */}
            <Video
                source={require("../assets/background.mp4")} // Replace with your video URL
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
                repeat={true}
                muted={true}
            />

            {/* Overlay Content */}
            <View style={styles.overlay}>
                {/* appbar */}
                <View style={styles.appbar}>
                    <Text style={styles.txt}>Thank you for installing Cipher,</Text>
                    <Text style={styles.txt}>placing your trust in us</Text>
                </View>
                {/* appbar */}

                <View style={styles.welcomeBox}>
                    <Text style={styles.welcomeText}>
                        Organize and protect all your passwords with SecureVault. Say goodbye to password fatigue and hello to seamless, secure access.
                    </Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.inptxt}>User Name</Text>
                    <TextInput placeholder='Enter your name to display in homepage' style={styles.inp} />
                </View>

                <TouchableOpacity style={styles.posogbtn} onPress={() => stack.navigate('Tab')}>
                    <View style={styles.button} >
                        <ChevronRightIcon color={"black"} height={width * 0.06} width={width * 0.06} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: width * 0.04,
    },
    appbar: {
        marginTop: height * 0.02,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        color: "white",
        fontSize: width * 0.06,
        textAlign: 'center',
    },
    welcomeBox: {
        flexDirection: 'column',
        marginTop: height * 0.07,
        marginHorizontal: width * 0.04,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'rgba(248, 249, 250, 0.8)', // Changed to a lighter gray with opacity for better readability
        padding: width * 0.07,
        borderRadius: 16,
    },
    welcomeText: {
        color: "black",
        fontSize: width * 0.045, // Slightly larger font size for better readability
        textAlign: 'center',
    },
    inp: {
        borderWidth: 1,
        borderColor: '#ddd',
        height: height * 0.06, // Made height relative to screen height
        color: 'black',
        width: width - 30,
        borderRadius: 8,
        marginBottom: height * 0.015,
        paddingHorizontal: width * 0.025,
        backgroundColor: '#fff', // Added background color for better readability
    },
    inptxt: {
        color: 'black',
        fontSize: width * 0.04, // Increased font size slightly
        marginBottom: height * 0.01, // Increased margin for better spacing
    },
    form: {
        marginTop: height * 0.05,
        padding: width * 0.025,
    },
    button: {
        height: width * 0.14,
        width: width * 0.14,
        backgroundColor: "#565d6d",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.07,
    },
    posogbtn: {
        marginTop: height * 0.2,
        marginBottom: height * 0.1,
        flexDirection: "row",
        justifyContent: "center",
    },
});

export default OnboardScreen;
