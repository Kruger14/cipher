import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, ScrollView, ToastAndroid, PermissionsAndroid, Platform } from 'react-native';
import { ChevronRightIcon, ArrowLeftIcon, PlusCircleIcon, BookmarkIcon, ArrowDownOnSquareIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import db from '../service/db';
import RNFS from 'react-native-fs';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { UserCircleIcon } from "react-native-heroicons/outline";
import { SafeAreaProvider } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('screen');

const Profilescreen = () => {
    const stack = useNavigation();
    const [data, setData] = useState("");
    const [obj, setObj] = useState([]);

    useEffect(() => {
        selectAll();
        fetchData();
    }, [obj]);

    const selectAll = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM PASSWORDS',
                [],
                (tx, results) => {
                    let rows = results.rows;
                    let temp = [];
                    for (let i = 0; i < rows.length; i++) {
                        temp.push(rows.item(i));
                    }
                    setObj(temp);
                },
                (error) => {
                    ToastAndroid.show(error, ToastAndroid.SHORT);
                }
            );
        });
    };

    const requestStoragePermission = async () => {
        try {
            if (Platform.OS === 'android') {
                if (Platform.Version >= 30) {
                    return true;
                }
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission',
                        message: 'App needs access to your storage to download files.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
                return result === RESULTS.GRANTED;
            }
        } catch (err) {
            ToastAndroid.show(err, ToastAndroid.SHORT)
            return false;
        }
    };

    const saveObject = async () => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
            ToastAndroid.show('Storage permission denied', ToastAndroid.SHORT);
            return;
        }

        const jsonString = JSON.stringify(obj, null, 2);
        const path = `${RNFS.DownloadDirectoryPath}/cipher.txt`;

        try {
            await RNFS.writeFile(path, jsonString, 'utf8');
            ToastAndroid.show(`Stored in ${path}`, ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show(error, ToastAndroid.SHORT);
        }
    };

    const fetchData = async () => {
        const data = await AsyncStorage.getItem('name');
        setData(data);
    };

    return (
        <SafeAreaProvider>

            <View style={styles.container}>
                <View style={styles.appBar}>
                    <TouchableOpacity onPress={() => { stack.navigate('Home') }}>
                        <View style={styles.iconWrapper}>
                            <ArrowLeftIcon color={"black"} height={width * 0.06} width={width * 0.06} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.txt}>
                        <Text style={styles.headerTitle}>Profile</Text>
                    </View>
                </View>

                <View style={styles.mainContainer}>
                    <View style={styles.header}>
                        <Text style={styles.subheaderTitle}>Securely Store and manage your</Text>
                        <Text style={styles.subheaderTitle}>Passwords with ease</Text>
                        <UserCircleIcon height={width * 0.4} width={width * 0.4} color={"black"} />
                        <Text style={styles.ownerName}>{data}</Text>
                    </View>

                    <View style={styles.cardContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.settingsList}>
                                <TouchableOpacity onPress={() => { stack.navigate('Home') }} style={styles.settingsItem}>
                                    <View style={styles.settingsItemin}>
                                        <PlusCircleIcon color={"black"} width={width * 0.06} height={width * 0.06} />
                                        <Text style={styles.settingsText}>Add Another</Text>
                                    </View>
                                    <ChevronRightIcon color={"black"} width={width * 0.06} height={width * 0.06} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { stack.navigate('Passwords') }} style={styles.settingsItem}>
                                    <View style={styles.settingsItemin}>
                                        <BookmarkIcon color={"black"} width={width * 0.06} height={width * 0.06} />
                                        <Text style={styles.settingsText}>Total Passwords saved</Text>
                                    </View>
                                    <ChevronRightIcon color={"black"} width={width * 0.06} height={width * 0.06} />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.settingsItem} onPress={saveObject}>
                                    <View style={styles.settingsItemin}>
                                        <ArrowDownOnSquareIcon color={"black"} width={width * 0.06} height={width * 0.06} />
                                        <Text style={styles.settingsText}>Save as JSON file</Text>
                                    </View>
                                    <ChevronRightIcon color={"black"} width={width * 0.06} height={width * 0.06} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View >
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    appBar: {
        marginTop: height * 0.02,
        flexDirection: 'row',
        marginHorizontal: width * 0.04,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        padding: width * 0.03,
        elevation: 1,
        borderRadius: 100,
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        padding: width * 0.04,
    },
    header: {
        color: 'black',
        width: '100%',
        borderRadius: 30,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: 'black',
    },

    subheaderTitle: {
        fontSize: width * 0.04,
        color: 'black',
        fontFamily: 'Arial',
    },
    ownerName: {
        fontSize: width * 0.05,
        fontWeight: '600',
        color: 'black',
        marginTop: height * 0.01,
    },
    cardContainer: {
        justifyContent: "space-evenly",
        backgroundColor: '#fff',
        width: '100%',
        flex: 1,
        borderRadius: 16,
        padding: width * 0.06,
        marginTop: height * 0.08,
        marginBottom: height * 0.03,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    settingsList: {
        marginBottom: height * 0.02,
    },
    settingsItem: {
        elevation: 4,
        backgroundColor: '#f8f9fa',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: width * 0.04,
        borderRadius: 8,
        marginBottom: height * 0.01,
    },
    settingsItemin: {
        flexDirection: 'row',
        gap: width * 0.025,
    },
    settingsText: {
        fontSize: width * 0.04,
        color: 'black',
    },
});

export default Profilescreen;
