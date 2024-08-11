import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import PasswordCard from '../util/PasswordCard';
import db from '../service/db';

const { width, height } = Dimensions.get('screen');

const AccountScreen = () => {
    const navigate = useNavigation();
    const [data, setData] = useState([]);

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
                    setData(temp);
                },
                (error) => {
                    ToastAndroid.show(error, ToastAndroid.SHORT)
                }
            );
        });
    };

    useEffect(() => {
        selectAll();
    }, [data]);

    return (
        <View style={styles.container}>
            {/* appBar start */}
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => navigate.navigate('Home')}>
                    <View style={styles.iconWrapper}>
                        <ChevronLeftIcon color={"black"} height={width * 0.06} width={width * 0.06} />
                    </View>
                </TouchableOpacity>

                <View style={styles.txt}>
                    <Text style={styles.headerTitle}>Passwords</Text>
                </View>
            </View>
            {/* appBar end */}

            {/* totalcount */}
            <View style={styles.totalCountContainer}>
                <Text style={styles.totalCountText}>Passwords saved</Text>
                <Text style={styles.totalCountNumber}>{data.length}</Text>
            </View>
            {/* totalcount */}

            {/* Passwords cards go here */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.passwordbox}>
                    {data.map((item) => (
                        <PasswordCard key={item.ID} attr={item} /> // Ensure each item has a unique key
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
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
        borderRadius: 50,
    },
    headerTitle: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: 'black',
    },
    txt: {
        marginTop: height * 0.01,
    },
    totalCountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: height * 0.015,
        marginLeft: width * 0.04,
        marginRight: width * 0.04,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    totalCountText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
    },
    totalCountNumber: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: 'blue',
    },
    scrollViewContent: {
        paddingVertical: height * 0.01,
    },
    passwordbox: {
        paddingBottom: height * 0.06,
    },
});

export default AccountScreen;
