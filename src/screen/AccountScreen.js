import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import PasswordCard from '../util/PasswordCard';

const { width, height } = Dimensions.get('screen');

const AccountScreen = () => {
    const Navigate = useNavigation();

    return (
        <>
            {/* appBar start */}
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => { Navigate.navigate('Home') }}>
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
                    <Text style={styles.headerTitle}>10</Text>
                </View>
            </View>
            {/* totalcount */}

            {/* Passwords cards go here */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.passwordbox}>
                    <PasswordCard />
                    <PasswordCard />
                    <PasswordCard />
                    <PasswordCard />
                    <PasswordCard />
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
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: height * 0.015,
        marginHorizontal: width * 0.04,
    },
    passwordbox: {
        paddingTop: height * 0.005,
        paddingBottom: height * 0.06,
    },
});

export default AccountScreen;
