import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

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
        backgroundColor: 'black',
    },
    txt: {
        fontFamily: 'Georgia',
        fontStyle: 'italic',
        fontWeight: '700',
        fontSize: width * 0.08,
        color: '#333',
    },
    circleOne: {
        backgroundColor: '#4a90e2',
        height: width * 0.9,
        width: width * 0.9,
        borderRadius: (width * 0.9) / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleTwo: {
        backgroundColor: '#50e3c2',
        height: width * 0.65,
        width: width * 0.65,
        borderRadius: (width * 0.65) / 2,
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
        borderColor: '#ddd',
        backgroundColor: '#f8e71c',
        height: width * 0.4,
        width: width * 0.4,
        borderRadius: (width * 0.4) / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SplashScreen;
