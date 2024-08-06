import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

const SplashScreen = () => {
    const circleonee = useSharedValue(0);
    const circletwoo = useSharedValue(0);
    const circlethreee = useSharedValue(0);
    const navigation = useNavigation();

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('name');
            return value;
        } catch (err) {
            console.log(err);
            return null;
        }
    };

    useEffect(() => {
        setTimeout(() => {
            circleonee.value = withSpring(1, { stiffness: 80 });
        }, 300);

        setTimeout(() => {
            circletwoo.value = withSpring(1, { stiffness: 80 });
        }, 600);

        setTimeout(() => {
            circlethreee.value = withSpring(1, { stiffness: 80 });
        }, 800);

        setTimeout(async () => {
            const name = await getData();
            if (name) {
                navigation.navigate('Tab');
            } else {
                navigation.navigate('Onboard');
            }
        }, 1200);
    }, []);

    const circleOneStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: circleonee.value }],
        };
    });

    const circleTwoStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: circletwoo.value }],
        };
    });

    const circleThreeStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: circlethreee.value }],
        };
    });

    return (
        <View style={styles.mainContainer}>
            <Animated.View style={[styles.circleOne, circleOneStyle]}>
                <Animated.View style={[styles.circleTwo, circleTwoStyle]}>
                    <Animated.View style={[styles.circleThree, circleThreeStyle]}>
                        <Text style={styles.txt}>Cipher</Text>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black', // Soft background color
    },
    txt: {
        fontFamily: 'Georgia',
        fontStyle: 'italic',
        fontWeight: '700',
        fontSize: 32,
        color: '#333', // Darker text color for contrast
    },
    circleOne: {
        backgroundColor: '#4a90e2', // Soft blue color
        height: 350,
        width: 350,
        borderRadius: 175,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleTwo: {
        backgroundColor: '#50e3c2', // Soft green color
        height: 250,
        width: 250,
        borderRadius: 125,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleThree: {
        shadowOffset: {
            height: 5,
            width: 2,
        },
        elevation: 5,
        borderWidth: 1,
        borderColor: '#ddd', // Soft border color
        backgroundColor: '#f8e71c', // Soft yellow color
        height: 150,
        width: 150,
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SplashScreen;
