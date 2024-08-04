import React, { useRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { PencilSquareIcon, TrashIcon } from 'react-native-heroicons/outline';
import RBSheet from 'react-native-raw-bottom-sheet';
import Bottomsheet from './Bottomsheet';
import { deleteData } from '../service/db';

const PasswordCard = ({ attr }) => {
    const refRBSheet = useRef();


    // Function to check if the URL is valid
    const isValidImageUrl = (url) => {
        return url && /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(url);
    };

    const deleteButton = () => {
        deleteData(attr.ID)
        ToastAndroid.show('Record Deleted', ToastAndroid.SHORT)
    };

    return (
        <>
            <View style={styles.container}>
                {isValidImageUrl(attr.netimageurL) ? (
                    <Image source={{ uri: attr.netimageurL }} style={styles.image} />
                ) : (
                    <View style={styles.noImageContainer}>
                        <Text style={styles.noImageText}>{attr.netimageurL}</Text>
                    </View>
                )}
                <View style={styles.userInfo}>
                    <Text style={styles.username}>{attr.username}</Text>
                    <Text style={styles.userBio}>{attr.password}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        onPress={() => refRBSheet.current.open()}
                        style={[styles.button, styles.editButton]}
                        accessibilityLabel="Edit Password"
                    >
                        <PencilSquareIcon color={'white'} height={24} width={24} />
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={deleteButton} style={[styles.button, styles.deleteButton]} accessibilityLabel="Delete Password">
                        <TrashIcon color={'white'} height={24} width={24} />
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
                <Bottomsheet onClose={refRBSheet} ID={attr.ID} />
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
    noImageContainer: {
        width: 64,
        height: 64,
        borderRadius: 16,
        overflow: 'hidden',
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
    },
    noImageText: {
        color: '#888',
        fontSize: 14,
        textAlign: 'center',
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
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
        color: 'white',
        marginLeft: 8,
    },
    deleteButton: {
        backgroundColor: '#c0392b',
    },
    deleteButtonText: {
        color: 'white',
        marginLeft: 8,
    },
});

export default PasswordCard;
