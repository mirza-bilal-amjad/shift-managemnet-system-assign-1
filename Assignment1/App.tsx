import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import MyShifts from "./screens/bottom-tabs/MyShifts";
import MainContainer from "./screens/MainContainer";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'MainContainer'} options={{headerShown: false}} component={MainContainer}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App
const styles = StyleSheet.create({})
