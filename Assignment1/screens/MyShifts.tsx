import {SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {cancelMyShifts} from "../store/redux/MyShiftRedux/MyShiftActions";
import {cancelShiftAndSetFalse} from "../store/redux/ShiftRedux/ShiftActions";
import colors from "../constants/colors";
import {convertTime} from "../utils/method";

const MyShifts = () => {
    const myShifts = useSelector((state: any) => state.MyShiftReducer)
    const [sectionShifts, setSectionShifts] = useState<any>([])
    const dispatch = useDispatch();

    const formatDate = (date: any) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            // Format the date as you prefer (e.g., "DD/MM/YYYY")
            return date.toDateString();
        }
    }


    const returnShifts = () => {
        const storeShifts = [];

        const MYSHIFTSS = myShifts.reduce((acc: any, curr: any) => {
            const date = formatDate(new Date(curr.startTime));
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(curr)
            return acc;
        }, {})
        for (const [key] of Object.entries(MYSHIFTSS)) {
            storeShifts.push({title: key, data: MYSHIFTSS[key]})
        }
        setSectionShifts(storeShifts)
    }
    useEffect(() => {
        returnShifts();
    }, [myShifts])
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>

            {myShifts.length === 0 ? <View style={{flex: 1, justifyContent: "center", alignItems: 'center'}}>
                    <Text
                        style={{justifyContent: "center", color: colors.primary}}
                    >No booked shifts...</Text></View> :
                <SectionList
                    sections={sectionShifts}
                    keyExtractor={(item, index) => item + index}
                    ItemSeparatorComponent={() => <Text style={{
                        borderBottomWidth: .2,
                        // marginHorizontal: 10,
                        height: 0
                    }}/>}
                    renderItem={({item, index, section}) => (
                        <TouchableOpacity
                            style={{
                                borderTopWidth: index === 0 ? 0.2 : 0,
                                borderBottomWidth: index === section.data.length - 1 ? 0.2 : 0,
                                paddingHorizontal: 20,
                                paddingVertical: 15,
                                // marginHorizontal: 10,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                            activeOpacity={0.8}
                        >
                            <View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: 100,

                                }}>
                                    <Text style={{
                                        color: colors.bookedText,
                                        fontSize: 18,
                                        fontWeight: '400'
                                    }}>{convertTime(item.startTime)}</Text>
                                    <Text style={{
                                        color: 'black',
                                        fontSize: 18,

                                    }}
                                    >-</Text>
                                    <Text style={{
                                        color: colors.bookedText,
                                        fontSize: 18,
                                        fontWeight: '400'
                                    }}>{convertTime(item.endTime)}</Text>
                                </View>
                                <Text
                                    style={{
                                        color: colors.primaryInActive,
                                        fontSize: 16,
                                        fontWeight: '500'
                                    }}
                                >{item.area}</Text>
                            </View>

                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <TouchableOpacity
                                    style={{
                                        borderRadius: 30,
                                        borderWidth: .5,
                                        paddingHorizontal: 25,
                                        paddingVertical: 9,
                                        borderColor: colors.danger,
                                    }}
                                    activeOpacity={.5}
                                    onPress={() => {
                                        dispatch(cancelShiftAndSetFalse(item))
                                        dispatch(cancelMyShifts(item))
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: colors.danger,
                                            fontSize: 18,
                                            fontWeight: 'bold'
                                        }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: colors.grey,
                            paddingHorizontal: 18,
                            paddingVertical: 15,


                        }}>
                            <Text style={{
                                fontSize: 15,
                                paddingHorizontal: 5,
                                fontWeight: 'bold',
                                color: colors.bookedText,
                            }}>
                                {title}
                            </Text>
                            <Text style={{
                                fontSize: 15,
                                paddingHorizontal: 10,
                                fontWeight: '400',
                                color: colors.primaryInActive,
                            }}>{
                                myShifts.filter((item: any) => formatDate(new Date(item.startTime)) === title).length
                            }
                                {
                                    myShifts.filter((item: any) => formatDate(new Date(item.startTime)) === title).length === 1 ? ' shift' : ' shifts'
                                }, {myShifts.filter((item: any) => formatDate(new Date(item.startTime)) === title).reduce((acc: any, curr: any) => acc + (curr.endTime - curr.startTime), 0) / 3600000} hrs
                            </Text>
                        </View>
                    )}
                />
            }

        </SafeAreaView>
    );
}
export default MyShifts
