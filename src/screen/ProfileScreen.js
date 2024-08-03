import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions, ScrollView } from 'react-native';
import { ChevronRightIcon, ChevronLeftIcon, PlusCircleIcon, BookmarkIcon, ArrowDownOnSquareIcon } from 'react-native-heroicons/outline';

const { width, height } = Dimensions.get('screen');

const Profilescreen = () => {
    const stack = useNavigation();
    return (
        <>
            {/* appBar start */}
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => { stack.navigate('Home') }}>
                    <View style={styles.iconWrapper}>
                        <ChevronLeftIcon color={"black"} height={width * 0.06} width={width * 0.06} />
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
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* settingsList  start*/}
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

                            <TouchableOpacity style={styles.settingsItem}>
                                <View style={styles.settingsItemin}>
                                    <ArrowDownOnSquareIcon color={"black"} width={width * 0.06} height={width * 0.06} />
                                    <Text style={styles.settingsText}>Save as JSON file</Text>
                                </View>
                                <ChevronRightIcon color={"black"} width={width * 0.06} height={width * 0.06} />
                            </TouchableOpacity>
                            {/* settingsList  end*/}
                        </View>
                    </ScrollView>
                </View>
            </View >
        </>
    );
}

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
    detailText: {
        fontSize: width * 0.05,
        color: 'black',
        fontWeight: '300',
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        padding: width * 0.04,
    },
    header: {
        color: '#fff',
        width: '100%',
        borderRadius: 30,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: height * 0.02,
    },
    profileWrapper: {
        position: 'relative',
        marginBottom: height * 0.02,
    },
    profileImage: {
        width: width * 0.24,
        height: width * 0.24,
        borderRadius: width * 0.12,
        borderWidth: 4,
        borderColor: '#f8f9fa',
    },
    status: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#28a745',
        color: '#fff',
        borderRadius: width * 0.12,
        padding: width * 0.01,
        fontSize: width * 0.03,
    },
    ownerName: {
        fontSize: width * 0.05,
        fontWeight: '600',
        marginTop: height * 0.01,
    },
    ownerEmail: {
        color: '#6c757d',
    },
    cardContainer: {
        backgroundColor: '#fff',
        width: '100%',
        flex: 1,
        borderRadius: 12,
        padding: width * 0.06,
        marginTop: height * 0.03,
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
        spaceVertical: height * 0.02,
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
    },
    arrow: {
        width: width * 0.06,
        height: width * 0.06,
    },
});

export default Profilescreen;