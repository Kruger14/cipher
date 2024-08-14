import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, Dimensions, ScrollView, ToastAndroid, BackHandler } from 'react-native';
import db, { createTable, insertData } from '../service/db'; // Adjust the import path as necessary
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import IC from '../assets/icon.png';
const { width, height } = Dimensions.get('screen');

const HomeScreen = () => {
    const stack = useNavigation();
    const [userData, setUserData] = useState("");
    const [data, setData] = useState({
        username: "",
        password: "",
        netimage: "",
    });

    useEffect(() => {
        createTable();
    }, []);

    const clearAll = () => {
        AsyncStorage.clear();
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('name');
            return value;
        } catch (err) {
            ToastAndroid.show(err, ToastAndroid.SHORT);
            return null;
        }
    };

    const handleInputChange = (name, value) => {
        setData(prevdata => ({
            ...prevdata,
            [name]: value,
        }));
    };

    const handleAdd = () => {
        if (data.netimage && data.password && data.username) {
            insertData(data.username, data.password, data.netimage);
        } else {
            ToastAndroid.show("You can't leave field blank", ToastAndroid.SHORT);
        }
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

            const fetchData = async () => {
                const user = await getData();
                if (user) {
                    setUserData(user);
                }
            };

            fetchData();

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [stack])
    );

    const isValidImageUrl = (url) => {
        return url && /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(url);
    };


    return (
        <SafeAreaProvider>
            <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.overlay}>
                    <View style={styles.appbar}>
                        <View>
                            <Image source={IC} style={styles.icimg} />
                        </View>
                        <View>
                            <Text style={styles.txt}>Cipher</Text>
                        </View>
                    </View>

                    <ScrollView >
                        <View style={styles.welcomeBox}>
                            <Text style={styles.greet}>Welcome back!</Text>
                            <Text style={styles.user}>{userData}</Text>
                            <Text style={styles.saying}>Keep your Passwords safe with Cipher</Text>
                            <Text style={styles.note}>Note: Images load on active connection</Text>
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
                                secureTextEntry={true}
                            />

                            <Text style={styles.inptxt}>Network Image Or Name Of The Site</Text>
                            <TextInput
                                onChangeText={(text) => handleInputChange('netimage', text)}
                                value={data.netimage}
                                placeholder='Enter Network Image URL'
                                style={styles.inp}
                            />

                            <TouchableOpacity style={styles.btnBox} onPress={handleAdd}>
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Add</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaProvider >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    overlay: {
        flex: 1,
        backgroundColor: '#baddf0',
    },
    appbar: {
        marginTop: height * 0.02,
        flexDirection: 'row',
        marginHorizontal: width * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        color: "#05203e",
        fontSize: width * 0.06,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    icimg: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: (width * 0.4) / 2,
        objectFit: "contain",
        marginHorizontal: 5,
    },
    welcomeBox: {
        flexDirection: 'column',
        marginTop: height * 0.02,
        marginHorizontal: width * 0.04,
        borderWidth: 0.5,
        padding: width * 0.07,
        borderRadius: 16,
        backgroundColor: 'yellow',
        borderColor: '#DDDDDD',
    },
    greet: {
        color: "#333",
        fontSize: width * 0.05,
        fontWeight: '600',
    },
    note: {
        marginTop: height * 0.01,
        color: "black",
        fontSize: 12,
        fontWeight: '400',
    },
    user: {
        color: "#333",
        fontSize: width * 0.06,
        fontWeight: 'bold',
    },
    saying: {
        fontSize: width * 0.045,
        color: '#333',
    },
    form: {
        marginHorizontal: width * 0.04,
        padding: width * 0.025,
    },
    inp: {
        borderWidth: 1,
        height: height * 0.05,
        color: '#333',
        borderRadius: 8,
        marginBottom: height * 0.015,
        paddingHorizontal: width * 0.025,
        borderColor: '#DDDDDD',
        backgroundColor: '#FFFFFF',
    },
    img: {
        height: 120,
        width: 120,
        objectFit: 'scale-down',
        borderRadius: 8,
        backgroundColor: 'yelow',
    },
    inptxt: {
        color: '#333',
        fontSize: width * 0.035,
        marginBottom: height * 0.005,
        fontWeight: '700',
    },
    imgView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.05,
    },
    btnBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: width * 0.025,
        width: width / 1.20,
        backgroundColor: "#007BFF",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: height * 0.015,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    noImageContainer: {
        marginTop: height * 0.01,
        borderRadius: 8,
        overflow: 'hidden',
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
    },
    noImageText: {
        color: '#888',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default HomeScreen;
