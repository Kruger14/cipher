import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomeScreen from './src/screen/HomeScreen';
import AccountScreen from './src/screen/AccountScreen';
import ProfileScreen from './src/screen/ProfileScreen';


// Import Heroicons
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screen/SplashScreen';
import OnboardScreen from './src/screen/OnboardScreen';
import { HomeIcon, EyeIcon, UserIcon } from 'react-native-heroicons/solid';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
    <Tab.Navigator
        initialRouteName="Home"
        backBehavior="initialRoute"
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let IconComponent;
                if (route.name === 'Home') {
                    IconComponent = HomeIcon;
                } else if (route.name === 'Passwords') {
                    IconComponent = EyeIcon;
                } else if (route.name === 'Profile') {
                    IconComponent = UserIcon;
                }
                return <IconComponent width={size} height={size} fill={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: styles.tabBarStyle,
        })}
    >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Passwords" component={AccountScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
);

const App = () => (
    <NavigationContainer>
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
        >
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Onboard" component={OnboardScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
            </Stack.Navigator>
        </KeyboardAvoidingView>
    </NavigationContainer>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
    },
});

export default App;
