import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

export const setTheme = (theme: boolean) => {
    return {
        type: 'SET_THEME',
        data: theme
    }
}

