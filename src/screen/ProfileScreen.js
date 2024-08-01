import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { PlusCircleIcon, BookmarkIcon, ArrowDownOnSquareIcon } from 'react-native-heroicons/outline';

const Profilescreen = () => {
    const Navigate = useNavigation();
    return (
        <>
            {/* appBar start */}
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => { Navigate.navigate('Home') }}>
                    <View style={styles.iconWrapper}>
                        <ChevronLeftIcon color={"black"} height={24} width={24} />
                    </View>
                </TouchableOpacity>
            </View>
            {/* appBar end */}


            {/* mainContainer */}
            <View style={styles.mainContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <View style={styles.profileWrapper}>
                        <Image
                            source={require("../assets/img.png")}
                            style={styles.profileImage}
                        />
                    </View>
                    <Text style={styles.ownerName}>Martina Alex</Text>
                    <Text style={styles.ownerEmail}>martina.alex2015@gmail.com</Text>
                </View>

                <View style={styles.cardContainer}>
                    {/* settingsList  start*/}
                    <View style={styles.settingsList}>

                        <TouchableOpacity style={styles.settingsItem}>
                            <View style={styles.settingsItemin}>
                                <PlusCircleIcon color={"black"} width={24} height={24} />
                                <Text>Add Another</Text>
                            </View>
                            <ChevronRightIcon color={"black"} width={24} height={24} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingsItem}>
                            <View style={styles.settingsItemin}>
                                <BookmarkIcon color={"black"} width={24} height={24} />
                                <Text>Total Passwords saved</Text>
                            </View>
                            <ChevronRightIcon color={"black"} width={24} height={24} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingsItem}>
                            <View style={styles.settingsItemin}>
                                <ArrowDownOnSquareIcon color={"black"} width={24} height={24} />
                                <Text>save as json file</Text>
                            </View>
                            <ChevronRightIcon color={"black"} width={24} height={24} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingsItem}>
                            <View style={styles.settingsItemin}>
                                <Text>Support and Feedback</Text>
                            </View>
                            <ChevronRightIcon color={"black"} width={24} height={24} />
                        </TouchableOpacity>
                        {/* settingsList  start*/}
                    </View>
                </View>
            </View>
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
    detailText: {
        fontSize: 20,
        color: 'black',
        fontWeight: '300',
    },

    mainContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    header: {
        color: '#fff',
        width: '100%',
        borderRadius: 30,
        padding: 24,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 16,
    },
    profileWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    profileImage: {
        width: 96,
        height: 96,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#f8f9fa',
    },
    status: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#28a745',
        color: '#fff',
        borderRadius: 50,
        padding: 4,
        fontSize: 12,
    },
    ownerName: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 8,
    },
    ownerEmail: {
        color: '#6c757d',
    },
    cardContainer: {
        backgroundColor: '#fff',
        width: '100%',
        flex: 1,
        borderRadius: 12,
        padding: 24,
        marginTop: 24,
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
        spaceVertical: 16,
    },
    settingsItem: {
        elevation: 4,
        backgroundColor: '#f8f9fa',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    settingsItemin: {
        flexDirection: 'row',
        gap: 10
    },
    arrow: {
        width: 24,
        height: 24,
    },
});


export default Profilescreen;