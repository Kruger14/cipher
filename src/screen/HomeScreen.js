import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, Dimensions, ScrollView, ToastAndroid, BackHandler } from 'react-native';
import db, { createTable, insertData } from '../service/db'; // Adjust the import path as necessary

const { width, height } = Dimensions.get('screen');

const HomeScreen = () => {
    const stack = useNavigation();

    useEffect(() => {
        createTable();
    }, []);


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
    };

    const handleAdd = () => {
        insertData(data.username, data.password, data.netimage);
        ToastAndroid.show("Data inserted successfully", ToastAndroid.SHORT);
        setData({
            username: "",
            password: "",
            netimage: "",
        });
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                ToastAndroid.show("You can't go back", ToastAndroid.SHORT);
                return true;
            };

            BackHandler.addEventListener("hardwareBackPress", onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [stack])
    );

    const isValidImageUrl = (url) => {
        return url && /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(url);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.appbar}>
                <Text style={styles.txt}>Cipher</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.welcomeBox}>
                    <Text style={styles.greet}>Welcome back!</Text>
                    <Text style={styles.user}>User Name</Text>
                    <Text style={styles.saying}>Keep your Passwords safe with Cipher</Text>
                </View>

                {/* image preview */}
                <View style={styles.imgView}>
                    <Text style={styles.txt}>Image Preview</Text>
                    {isValidImageUrl(data.netimage) ? (
                        < Image source={{ uri: data.netimage }} style={styles.img} />
                    ) :
                        (
                            <View style={styles.noImageContainer}>
                                <Text style={styles.noImageText}>{data.netimage}</Text>
                            </View>
                        )
                    }
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
                        placeholder='Enter Network Image URL'
                        style={styles.inp}
                    />

                    <TouchableOpacity onPress={handleAdd}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

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
        height: 150,
        width: 150,
        objectFit: 'fill',
    },
    inptxt: {
        color: 'black',
        fontSize: width * 0.035,
        marginBottom: height * 0.005,
    },
    imgView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.05,
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
    noImageContainer: {
        marginTop: height * 0.01,
        width: 64,
        height: 64,
        borderRadius: 16,
        overflow: 'hidden',
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
    },
    noImageText: {
        color: '#888',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default HomeScreen;
