import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, Dimensions, ScrollView, ToastAndroid, BackHandler } from 'react-native';

const { width, height } = Dimensions.get('screen');

const HomeScreen = () => {

    const stack = useNavigation();
    const a = "https://cdn.pixabay.com/photo/2016/11/18/11/16/instagram-1834010_1280.png";

    const [data, setData] = useState({
        username: "",
        password: "",
        netimage: "",
    });



    const handleInputChange = (name, value) => {
        setData(prevdata => ({
            ...prevdata,
            [name]: value,
        }));
    }


    const btnn = (e) => {
        console.log(data)
        setData({
            username: "",
            password: "",
            netimage: "",
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                ToastAndroid.show("You can't go back", ToastAndroid.SHORT)
                return true;
            }

            BackHandler.addEventListener("hardwareBackPress", onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', () => stack.goBack());
            }
        }, [stack])
    );

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

            <ScrollView showsVerticalScrollIndicator={false}>
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
                    <TextInput
                        onChangeText={(text) => handleInputChange('username', text)}
                        value={data.username}
                        placeholder='Enter Username'
                        style={styles.inp}
                    />

                    <Text style={styles.inptxt}>Password</Text>
                    <TextInput
                        onChangeText={(text) => handleInputChange('password', text)}
                        value={data.password}
                        placeholder='Enter password'
                        style={styles.inp}
                    />

                    <Text style={styles.inptxt}>Network Image</Text>
                    <TextInput
                        onChangeText={(text) => handleInputChange('netimage', text)}
                        value={data.netimage}
                        placeholder='Enter Username'
                        style={styles.inp}
                    />

                    <TouchableOpacity onPress={btnn}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appbar: {
        marginTop: height * 0.02,
        flexDirection: 'row',
        marginHorizontal: width * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        color: "black",
        fontSize: width * 0.06,
    },
    welcomeBox: {
        flexDirection: 'column',
        marginTop: height * 0.02,
        marginHorizontal: width * 0.04,
        borderWidth: 1,
        padding: width * 0.07,
        borderRadius: 16,
        backgroundColor: 'rgba(248, 249, 250, 0.8)',
    },
    greet: {
        color: "black",
        fontSize: width * 0.04,
    },
    user: {
        color: "black",
        fontSize: width * 0.06,
    },
    saying: {
        fontSize: width * 0.045,
        color: 'black',
    },
    form: {
        marginHorizontal: width * 0.04,
        padding: width * 0.025,
    },
    inp: {
        borderWidth: 1,
        height: height * 0.05,
        color: 'black',
        borderRadius: 8,
        marginBottom: height * 0.015,
        paddingHorizontal: width * 0.025,
    },
    img: {
        height: height * 0.25,
        width: height * 0.25,
    },
    inptxt: {
        color: 'black',
        fontSize: width * 0.035,
        marginBottom: height * 0.005,
    },
    imgView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: width * 0.04,
    },
    button: {
        padding: width * 0.025,
        width: width * 0.25,
        backgroundColor: "blue",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: height * 0.015,
    },
    buttonText: {
        color: 'white',
    },
});

export default HomeScreen;
