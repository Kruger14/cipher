import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const BottomSheet = () => {
    const [network, setNetwork] = useState('');
    const [imageUsername, setImageUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUpdate = () => {
        // Handle the update logic here
        console.log('Network:', network);
        console.log('Image Username:', imageUsername);
        console.log('Password:', password);
    };

    const closeSheet = () => {
        // Logic to close the bottom sheet
        console.log('Closing sheet');
    };

    return (
        <View style={styles.container}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Update Information</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Network"
                    value={network}
                    onChangeText={setNetwork}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Image Username"
                    value={imageUsername}
                    onChangeText={setImageUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={closeSheet}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        width: Dimensions.get('screen').width - 50,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
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
        color: 'white',
        fontWeight: 'bold',
    },
});

export default BottomSheet;
