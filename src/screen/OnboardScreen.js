import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';

const OnboardScreen = () => {
    const a = "https://cdn.pixabay.com/photo/2016/11/18/11/16/instagram-1834010_1280.png";

    return (
        <>
            <View style={styles.container}>
                {/* appbar */}
                <View style={styles.appbar}>
                    <Text style={styles.txt}>Thank you for installing Cipher, </Text>
                    <Text style={styles.txt}>placing your trust in us</Text>
                </View>
                {/* appbar */}


                <View style={styles.welcomeBox}>
                    <Text style={styles.txt}>Organize and protect all your passwords with SecureVault.
                        Say goodbye to password fatigue and hello to seamless, secure access.</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.inptxt}>User Name</Text>
                    <TextInput placeholder='Enter your name to display in homepage' style={styles.inp} />
                </View>

                <TouchableOpacity style={styles.posogbtn}>
                    <View style={styles.button}>
                        <ChevronRightIcon color={"black"} height={24} width={24} />
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
    },
    appbar: {
        marginTop: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        color: "black",
        fontSize: 24,
    },
    welcomeBox: {
        flexDirection: 'column',
        marginTop: 50,
        marginLeft: 15,
        marginRight: 15,
        borderWidth: 1,
        backgroundColor: 'gray',
        padding: 28,
        borderRadius: 16,
    },
    inp: {
        borderWidth: 1,
        height: 36,
        color: 'black',
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    inptxt: {
        color: 'black',
        fontSize: 14,
        marginBottom: 5,
    },
    form: {
        marginTop: 50,
        padding: 10,
    },

    button: {
        height: 75,
        width: 75,
        backgroundColor: "#565d6d",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },

    posogbtn: {
        marginTop: 135,
        flexDirection: "row",
        justifyContent: "center",
    },
});

export default OnboardScreen;