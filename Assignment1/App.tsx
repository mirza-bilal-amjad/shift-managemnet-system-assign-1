import {StatusBar, StyleSheet, useColorScheme} from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import MainContainer from "./navigator/MainContainer";
import useTheme from "./hooks/useTheme";
import {useDispatch, useSelector} from "react-redux";
import {setTheme} from "./store/redux/LightDarkModeRedux/LightarkModeActions";

const Stack = createNativeStackNavigator();

const App = () => {
    const {colors} = useTheme();
    const darkMode = useColorScheme() === 'dark';
    return (
        <NavigationContainer>
            <StatusBar barStyle={!darkMode ? 'dark-content' : 'light-content'}
                       backgroundColor={colors.background}/>
            <Stack.Navigator>
                <Stack.Screen name={'MainContainer'} options={{headerShown: false}} component={MainContainer}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App
