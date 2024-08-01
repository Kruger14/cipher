import React, { useRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PencilSquareIcon, TrashIcon } from 'react-native-heroicons/outline';
import RBSheet from 'react-native-raw-bottom-sheet';
import Bottomsheet from './Bottomsheet';

const PasswordCard = () => {
    const refRBSheet = useRef();

    return (
        <>
            <View style={styles.container}>
                <Image source={require('../assets/img.png')} style={styles.image} />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>Username</Text>
                    <Text style={styles.userBio}>bio</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() => refRBSheet.current.open()}
                        style={[styles.button, styles.editButton]}
                        accessibilityLabel="Edit Password"
                    >
                        <PencilSquareIcon color={'black'} height={24} width={24} />
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.deleteButton]} accessibilityLabel="Delete Password">
                        <TrashIcon color={'black'} height={24} width={24} />
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                closeOnPressBack={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                    container: {
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        padding: 20,
                        alignItems: 'center',
                    },
                }}
            >
                <Bottomsheet />
            </RBSheet>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 7 },
        shadowOpacity: 0,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: 15,
        marginTop: 10,
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 50,
        marginRight: 16,
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userBio: {
        color: '#999',
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
    },
    editButton: {
        backgroundColor: '#337ab7',
    },
    editButtonText: {
        color: 'black',
    },
    deleteButton: {
        backgroundColor: '#c0392b',
    },
    deleteButtonText: {
        color: 'black',
    },
});

export default PasswordCard;
