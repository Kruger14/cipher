import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, ScrollView, ToastAndroid, Alert, PermissionsAndroid, Platform } from 'react-native';
import { ChevronRightIcon, ArrowLeftIcon, PlusCircleIcon, BookmarkIcon, ArrowDownOnSquareIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import db from '../service/db';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('screen');

const Profilescreen = () => {
    const stack = useNavigation();
    const [data, setData] = useState("");
    const [obj, setObj] = useState([]);

    useEffect(() => {
        fetchData();
        selectAll();
    }, []);



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
                <View style={styles.Overlay}>
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
                                    <TouchableOpacity style={styles.settingsItem}  >
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
                </View>
            </View>
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
        backgroundColor: '#baddf0',
    },
    Overlay: {
        flex: 1,
        backgroundColor: '#baddf0',
        marginVertical: height * 0.01,
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
        color: '#05203e',
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
        backgroundColor: '#5acaf8',
        width: '100%',
        flex: 1,
        borderRadius: 16,
        padding: width * 0.04,
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
        backgroundColor: '#e5d5c8',
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
