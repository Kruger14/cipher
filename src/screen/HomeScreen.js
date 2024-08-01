import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';

const HomeScreen = () => {

    const a = "https://cdn.pixabay.com/photo/2016/11/18/11/16/instagram-1834010_1280.png";

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : "height"}
            style={styles.container}
        >
            {/* appbar */}
            <View style={styles.appbar}>
                <Text style={styles.txt}>Cipher</Text>
            </View>
            {/* appbar */}

            <View style={styles.welcomeBox}>
                <Text style={styles.greet}>Welcome back!</Text>
                <Text style={styles.user}>User Name</Text>
                <Text style={styles.saying}>Keep your Passwords safe with Cipher</Text>
            </View>

            <View style={styles.imgView}>
                <Image source={{ uri: a }} style={styles.img} />
            </View>

            <View style={styles.form}>
                <Text style={styles.inptxt}>User Name</Text>
                <TextInput style={styles.inp} />

                <Text style={styles.inptxt}>Password</Text>
                <TextInput style={styles.inp} secureTextEntry />

                <Text style={styles.inptxt}>Network Image</Text>
                <TextInput style={styles.inp} />

                <TouchableOpacity>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Save</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appbar: {
        marginTop: 15,
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        color: "black",
        fontSize: 24,
    },
    welcomeBox: {
        flexDirection: 'column',
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        borderWidth: 1,
        backgroundColor: 'gray',
        padding: 28,
        borderRadius: 16,
    },
    greet: {
        color: "black",
        fontSize: 15,
    },
    user: {
        color: "black",
        fontSize: 24,
    },
    saying: {
        fontSize: 18,
        color: 'black',
    },
    form: {
        marginLeft: 15,
        marginRight: 15,
        padding: 10,
    },
    inp: {
        borderWidth: 1,
        height: 36,
        color: 'black',
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    img: {
        height: 200,
        width: 200,
    },
    inptxt: {
        color: 'black',
        fontSize: 14,
        marginBottom: 5,
    },
    imgView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    button: {
        padding: 10,
        width: 75,
        backgroundColor: "blue",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
    },
});

export default HomeScreen;
