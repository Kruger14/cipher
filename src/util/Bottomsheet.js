import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ToastAndroid } from 'react-native';
import { updateData } from '../service/db';

const BottomSheet = ({ onClose, ID }) => {

    const [data, setData] = useState({
        username: "",
        password: "",
        netimageurl: "",
    });

    const handleUpdate = (name, value) => {
        setData(prev => ({
            ...prev,
            [name]: value,
        }))
    };

    const updateButton = () => {
        const id = ID;
        updateData(data.username, data.password, data.netimageurl, id),
            setData({ username: "", password: "", netimageurl: "" })
        closeSheet();
        ToastAndroid.show('Record updated', ToastAndroid.SHORT);
    }

    const closeSheet = () => {
        onClose.current.close()
    };

    return (
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Information</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={data.username}
                onChangeText={(text) => handleUpdate('username', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={data.password}
                onChangeText={(text) => handleUpdate('password', text)}
                secureTextEntry={true}
            />

            <TextInput
                style={styles.input}
                placeholder="Network image"
                value={data.netimageurl}
                onChangeText={(text) => handleUpdate('netimageurl', text)}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.updateButton} onPress={updateButton}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={closeSheet}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    modalContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
        color: 'black',
    },
    input: {
        width: Dimensions.get('screen').width - 50,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'black',
        fontWeight: '400',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    updateButton: {
        backgroundColor: '#337ab7',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#c0392b',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
});

export default BottomSheet;
