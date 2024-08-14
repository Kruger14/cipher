import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ToastAndroid } from 'react-native';
import { updateData } from '../service/db';
const { width, height } = Dimensions.get('screen');

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
        }));
    }

    const updateButton = () => {
        const id = ID;
        if (data.username && data.password && data.netimageurl) {
            updateData(data.username, data.password, data.netimageurl, id);
            setData({ username: "", password: "", netimageurl: "" });
            closeSheet();
            ToastAndroid.show('Record updated', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("You can't leave field blank", ToastAndroid.SHORT);
        }
    };

    const closeSheet = () => {
        onClose.current.close();
    };

    return (
        <View style={styles.inset}>
            <View style={styles.modalContent}>
                {/* <Text style={styles.upBtn}>------</Text> */}
                <Text style={styles.modalTitle}>Update Information</Text>
                <View style={styles.Overlay}>

                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={data.username}
                            onChangeText={(text) => handleUpdate('username', text)}
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={data.password}
                            onChangeText={(text) => handleUpdate('password', text)}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.label}>Network image Or site name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Network image"
                            value={data.netimageurl}
                            onChangeText={(text) => handleUpdate('netimageurl', text)}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.updateButton} onPress={updateButton}>
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelButton} onPress={closeSheet}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inset: {
        backgroundColor: 'green',
    },
    modalContent: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    upBtn: {
        color: 'green',
        fontSize: 15,
        fontWeight: 'bold',
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
        fontWeight: '500',
        borderRadius: 1,
    },

    label: {
        color: 'black',
        fontSize: width * 0.04,
    },

    textContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
        paddingLeft: 10,
        paddingRight: 10,
        marginVertical: width * 0.05,
    },

    updateButton: {
        padding: 15,
        backgroundColor: "green",
        borderRadius: 16,
        elevation: 10,
    },

    cancelButton: {
        padding: 15,
        backgroundColor: "red",
        borderRadius: 16,
        elevation: 10,
    },

    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },

});

export default BottomSheet;
