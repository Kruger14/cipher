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
                    console.log('Error: ', error);
                }
            );
        });
    };

    useEffect(() => {
        selectAll();
    }, [data])


    return (
        <>
            {/* appBar start */}
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => navigate.navigate('Home')}>
                    <View style={styles.iconWrapper}>
                        <ChevronLeftIcon color={"blue"} height={width * 0.06} width={width * 0.06} />
                    </View>
                </TouchableOpacity>

                <View style={styles.txt}>
                    <Text style={styles.headerTitle}>Passwords</Text>
                </View>
            </View>
            {/* appBar end */}

            {/* totalcount */}
            <View style={styles.totalCountContainer}>
                <View style={styles.txt}>
                    <Text style={styles.headerTitle}>Passwords saved</Text>
                </View>

                <View style={styles.txt}>
                    <Text style={styles.headerTitle}>{data.length}</Text>
                </View>
            </View>
            {/* totalcount */}

            {/* Passwords cards go here */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.passwordbox}>
                    {data.map((item) => (
                        <PasswordCard key={item.ID} attr={item} /> // Ensure each item has a unique key
                    ))}
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
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
        marginHorizontal: width * 0.04,
    },
    passwordbox: {
        paddingTop: height * 0.005,
        paddingBottom: height * 0.06,
    },
});

export default AccountScreen;
