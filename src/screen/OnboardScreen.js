import React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';

const { width, height } = Dimensions.get('screen');

const OnboardScreen = () => {
    return (
        <View style={styles.container}>
            {/* appbar */}
            <View style={styles.appbar}>
                <Text style={styles.txt}>Thank you for installing Cipher,</Text>
                <Text style={styles.txt}>placing your trust in us</Text>
            </View>
            {/* appbar */}

            <View style={styles.welcomeBox}>
                <Text style={styles.welcomeText}>Organize and protect all your passwords with SecureVault. Say goodbye to password fatigue and hello to seamless, secure access.</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.inptxt}>User Name</Text>
                <TextInput placeholder='Enter your name to display in homepage' style={styles.inp} />
            </View>

            <TouchableOpacity style={styles.posogbtn}>
                <View style={styles.button}>
                    <ChevronRightIcon color={"black"} height={width * 0.06} width={width * 0.06} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: width * 0.04,
    },
    appbar: {
        marginTop: height * 0.02,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        color: "black",
        fontSize: width * 0.06,
        textAlign: 'center',
    },
    welcomeBox: {
        flexDirection: 'column',
        marginTop: height * 0.07,
        marginHorizontal: width * 0.04,
        borderWidth: 1,
        backgroundColor: 'gray',
        padding: width * 0.07,
        borderRadius: 16,
    },
    welcomeText: {
        color: "black",
        fontSize: width * 0.04,
        textAlign: 'center',
    },
    inp: {
        borderWidth: 1,
        height: 35,
        color: 'black',
        borderRadius: 8,
        marginBottom: height * 0.015,
        paddingHorizontal: width * 0.025,
    },
    inptxt: {
        color: 'black',
        fontSize: width * 0.035,
        marginBottom: height * 0.005,
    },
    form: {
        marginTop: height * 0.07,
        padding: width * 0.025,
    },
    button: {
        height: 50,
        width: 50,
        backgroundColor: "#565d6d",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.5,
    },
    posogbtn: {
        marginTop: height * 0.18,
        marginBottom: height * 0.18,
        flexDirection: "row",
        justifyContent: "center",
    },
});

export default OnboardScreen;
