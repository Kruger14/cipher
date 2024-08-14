import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions, BackHandler, ToastAndroid, ImageBackground } from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Back from '../assets/Back.jpeg';
const { width, height } = Dimensions.get('screen');

const OnboardScreen = () => {
    const stack = useNavigation();
    const [data, setData] = useState("");

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('name', value);
        } catch (err) {
            ToastAndroid.show(err, ToastAndroid.SHORT);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            const showToast = () => {
                ToastAndroid.show("You can't go back!", ToastAndroid.SHORT);
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', showToast);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', showToast);
            };
        }, [stack])
    );

    const textChange = (text) => {
        setData(text);
    };

    const goFront = () => {
        storeData(data);
        if (data === "") {
            ToastAndroid.show('Field required', ToastAndroid.SHORT);
        } else {
            stack.navigate('Tab');
        }
    };

    return (
        <SafeAreaProvider>

            <View style={styles.container}>
                <ImageBackground source={Back} resizeMode="cover" style={styles.backgroundImg}>

                    <View style={styles.overlay}>
                        <View style={styles.appbar}>
                            <Text style={styles.txt}>Thank you for installing Cipher,</Text>
                            <Text style={styles.txt}>placing your trust in us</Text>
                        </View>

                        <View style={styles.welcomeBox}>
                            <Text style={styles.welcomeText}>
                                Organize and protect all your passwords with Cipher. Say goodbye to password fatigue and hello to seamless, secure access.
                            </Text>
                        </View>

                        <View style={styles.note}>
                            <Text style={styles.noteTxt}>Note: You cannot change this name later</Text>
                        </View>

                        <View style={styles.form}>
                            <Text style={styles.inptxt}>User Name</Text>
                            <TextInput
                                placeholder='Enter your name to display on the homepage'
                                style={styles.inp}
                                value={data}
                                onChangeText={textChange}
                            />
                        </View>

                        <TouchableOpacity style={styles.posogbtn} onPress={goFront}>
                            <View style={styles.button}>
                                <ChevronRightIcon color={"black"} height={width * 0.06} width={width * 0.06} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaProvider >
    );
};

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
        marginTop: height * 0.07,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImg: {
        objectFit: 'contain',
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
        backgroundColor: 'rgba(248, 249, 250, 0.8)',
        padding: width * 0.07,
        borderRadius: 16,
    },
    note: {
        flexDirection: 'column',
        marginTop: height * 0.02,
        padding: width * 0.04,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: 'rgba(248, 249, 250, 0.8)',
        borderRadius: 16,
    },
    noteTxt: {
        color: "red",
        fontStyle: 'italic',
        fontWeight: '300',
    },
    welcomeText: {
        color: "black",
        fontSize: width * 0.045,
        textAlign: 'center',
    },
    inp: {
        borderWidth: 1,
        borderColor: '#ddd',
        height: height * 0.06,
        color: 'black',
        width: width * 0.9,
        borderRadius: 8,
        marginBottom: height * 0.015,
        paddingHorizontal: width * 0.025,
        backgroundColor: '#fff',
    },
    inptxt: {
        color: 'black',
        fontSize: 16,
        marginBottom: 2,
        fontWeight: '400',
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
