import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import Animated, {
    useSharedValue, withSpring,
    useAnimatedStyle
} from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import IC from '../assets/icon.png';

const { width, height } = Dimensions.get('screen');

const SplashScreen = () => {
    const circleOnePadding = useSharedValue(0);
    const circleTwoPadding = useSharedValue(0);
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => { circleTwoPadding.value = withSpring(35); }, 100);
        setTimeout(() => { circleOnePadding.value = withSpring(45); }, 200);
        setTimeout(async () => {
            const data = await getData()
            data ? navigation.navigate('Tab') : navigation.navigate('Onboard')
        }, 350);
    }, []);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('name');
            return value;
        } catch (err) {
            return null;
        }
    };

    const circleOneStyle = useAnimatedStyle(() => ({
        padding: circleOnePadding.value,
    }));

    const circleTwoStyle = useAnimatedStyle(() => ({
        padding: circleTwoPadding.value,
    }));

    return (
        <SafeAreaProvider>
            <View style={styles.mainContainer}>
                <Animated.View style={[styles.circleOne, circleOneStyle]}>
                    <Animated.View style={[styles.circleTwo, circleTwoStyle]}>
                        <View style={styles.circleThree}>
                            <Image source={IC} style={styles.circleThree} />
                        </View>
                    </Animated.View>
                </Animated.View>
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    ic: {},
    circleOne: {
        backgroundColor: '#4a90e2',
        borderRadius: (width * 0.9) / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleTwo: {
        backgroundColor: '#50e3c2',
        borderRadius: (width * 0.65) / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleThree: {
        width: width * 0.4,
        height: width * 0.4,
        borderRadius: (width * 0.4) / 2,
        objectFit: "contain",
    },
});

export default SplashScreen;
