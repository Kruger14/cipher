import React, { useRef, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ToastAndroid, Dimensions } from 'react-native';
import { PencilSquareIcon, TrashIcon, EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';
import RBSheet from 'react-native-raw-bottom-sheet';
import Bottomsheet from './Bottomsheet';
import { deleteData } from '../service/db';

const { width, height } = Dimensions.get('screen');

const PasswordCard = ({ attr }) => {
    const refRBSheet = useRef();
    const [Mask, setMask] = useState(true);

    // Function to check if the URL is valid
    const isValidImageUrl = (url) => {
        return url && /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(url);
    };

    const deleteButton = () => {
        deleteData(attr.ID);
        ToastAndroid.show('Record Deleted', ToastAndroid.SHORT);
    };

    const mask = () => {
        setMask(!Mask);
    };

    return (
        <View>
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
                    <Text style={styles.userPass}>
                        {Mask ? '*'.repeat(attr.password.length) : attr.password}
                    </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={[styles.button, styles.iconButton]} onPress={mask}>
                        {Mask ? (
                            <EyeSlashIcon color={'black'} height={24} width={24} />
                        ) : (
                            <EyeIcon color={'black'} height={24} width={24} />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => refRBSheet.current.open()}
                        style={[styles.button, styles.editButton]}
                        accessibilityLabel="Edit Password"
                    >
                        <PencilSquareIcon color={'white'} height={24} width={24} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={deleteButton} style={[styles.button, styles.deleteButton]} accessibilityLabel="Delete Password">
                        <TrashIcon color={'white'} height={24} width={24} />
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: width * 0.04,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 7 },
        shadowOpacity: 0,
        shadowRadius: 5,
        elevation: 3,
        marginHorizontal: width * 0.04,
        marginTop: height * 0.01,
        marginVertical: width * 0.01,
    },
    image: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: width * 0.075,
        marginRight: width * 0.04,
        borderColor: 'black',
        borderWidth: 1,
    },
    noImageContainer: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: width * 0.075,
        overflow: 'hidden',
        marginRight: width * 0.04,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
    },
    noImageText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: width * 0.035,
        textAlign: 'center',
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: '#333',
    },
    userPass: {
        color: 'black',
        fontWeight: '600',
        fontSize: width * 0.04,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: width * 0.02,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: width * 0.02,
        borderRadius: 8,
    },
    iconButton: {
        backgroundColor: 'transparent',
    },
    editButton: {
        backgroundColor: '#337ab7',
    },
    editButtonText: {
        color: 'white',
        marginLeft: width * 0.02,
    },
    deleteButton: {
        backgroundColor: '#c0392b',
    },
    deleteButtonText: {
        color: 'white',
        marginLeft: width * 0.02,
    },
});

export default PasswordCard;
