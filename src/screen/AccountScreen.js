import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import PasswordCard from '../util/PasswordCard';

const AccountScreen = () => {
    const Navigate = useNavigation();
    return (
        <>
            {/* appBar start*/}
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => { Navigate.navigate('Home') }}>
                    <View style={styles.iconWrapper}>
                        <ChevronLeftIcon color={"blue"} height={24} width={24} />
                    </View>
                </TouchableOpacity>

                <View style={styles.txt}>
                    <Text style={styles.headerTitle}>Passwords</Text>
                </View>
            </View>
            {/* appBar end */}

            {/* totalcount  */}
            <View style={styles.totalCountContainer}>
                <View style={styles.txt}>
                    <Text style={styles.headerTitle}>Passwords saved</Text>
                </View>

                <View style={styles.txt}>
                    <Text style={styles.headerTitle}>10</Text>
                </View>
            </View>
            {/* totalcount  */}

            {/* Passwords cards goes here */}
            <ScrollView>
                <View>
                    <PasswordCard />
                </View>
            </ScrollView>
        </>
    )
}


const styles = StyleSheet.create({
    appBar: {
        marginTop: 15,
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        padding: 12,
        elevation: 1,
        borderRadius: 100,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 16,
    },
    txt: {
        marginTop: 8,
    },
    totalCountContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
    },
});

export default AccountScreen;