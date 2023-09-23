import {View} from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MyShifts from "../screens/MyShifts";
import AvailableShifts from "../screens/AvailableShifts";
import useTheme from "../hooks/useTheme";

const BottomTabs = createBottomTabNavigator();

const MainContainer = () => {
    const {colors} = useTheme();
    return (
        <BottomTabs.Navigator initialRouteName={'My Shifts'}
                              screenOptions={{
                                  tabBarLabelStyle: {
                                      position: 'absolute',
                                      fontSize: 16,
                                      top: 20,
                                      fontWeight: '900',
                                  },
                                  tabBarStyle: {
                                      flex: 1,
                                      maxHeight: 60,
                                      backgroundColor: colors.background,
                                      borderBottomWidth: 0.1,
                                      borderTopColor: colors.primaryInActive,
                                  },
                                  tabBarActiveTintColor: colors.primary,

                              }}
        >
            <BottomTabs.Screen name={'My Shifts'} component={MyShifts}
                               options={{
                                   headerShown: true,
                                   headerTitleStyle: {fontWeight: '900', color: colors.primary},
                                   tabBarIcon: () => (
                                       <View style={{height: 0}}
                                       ></View>
                                   ),
                                   headerStyle: {
                                       height: 70,
                                       borderBottomWidth: 0.145,
                                       borderBottomColor: colors.primaryInActive,
                                       backgroundColor: colors.background,
                                       elevation: 0
                                   }
                               }}/>
            <BottomTabs.Screen name={'Available Shifts'} component={AvailableShifts}
                               options={{
                                   headerShown: false,
                                   tabBarIcon: () => (
                                       <View style={{height: 0}}
                                       ></View>
                                   )
                               }}/>
        </BottomTabs.Navigator>
    );
}
export default MainContainer
