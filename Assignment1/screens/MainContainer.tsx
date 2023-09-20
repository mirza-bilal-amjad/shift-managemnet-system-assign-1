import {View} from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MyShifts from "./bottom-tabs/MyShifts";
import AvailableShifts from "./bottom-tabs/AvailableShifts";
import colors from "../constants/colors";

const BottomTabs = createBottomTabNavigator();

const MainContainer = () => {
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
                                      backgroundColor: colors.grey,
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
                                       borderBottomWidth: 1,
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
