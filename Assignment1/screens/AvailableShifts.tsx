import {
    ActivityIndicator,
    FlatList,
    SectionList,
    StatusBar, StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import React, {useEffect, useState} from 'react'
import {fetchShifts} from "../components/backend_server/fetchBackend";
import {useDispatch, useSelector} from "react-redux";
import {addToShifts, setBookTrue} from "../store/redux/ShiftRedux/ShiftActions";
import {addToMyShifts} from "../store/redux/MyShiftRedux/MyShiftActions";
import colors from "../constants/colors";
import {convertTime} from "../utils/method";

const AvailableShifts = () => {
    const [helsinkiShifts, setHelsinkiShifts] = useState([]);
    const [tampereShifts, setTampereShifts] = useState([]);
    const [turkuShifts, setTurkuShifts] = useState([]);
    ///set area

    const avShifts = useSelector((state: any) => state.ShiftReducer);
    const myShifts = useSelector((state: any) => state.MyShiftReducer)
    // sort by date
    // const sortedShifts = avShifts.sort((a: any, b: any) => a.startTime - b.startTime);
    // console.log('sortedShifts', sortedShifts)

    const [menuName, setMenuName] = useState<any>('Helsinki');
    const [area, setArea] = useState([]);
    //fetch current date

    const dispatch = useDispatch();


    const formatDate = (date: any) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else {
            return date.toDateString();
        }
    };
    const compareShifts = (shift1: any, shift2: any) => {
        // Check if the start and end times of the two shifts overlap.
        return (shift1.startTime < shift2.endTime && shift1.endTime > shift2.startTime);
    };


    const SectionListItem = ({item, index, section}: any) => {
        const [isLoading, setIsLoading] = useState(false);
        const overlapFlag = myShifts.some((myItem: any) => compareShifts(item, myItem));
        const handleClick = () => {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        };

        return (
            <TouchableOpacity
                style={[{
                    borderTopWidth: index === 0 ? 0.2 : 0,
                    borderBottomWidth: index === section.data.length - 1 ? 0.2 : 0,
                }, styles.sectionListCard]}
                activeOpacity={0.8}
            >
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
                        color: colors.bookedText,
                        fontSize: 18,
                    }}
                    >-</Text>
                    <Text style={{
                        color: colors.bookedText,
                        fontSize: 18,
                        fontWeight: '400'
                    }}>{convertTime(item.endTime)}</Text>
                </View>


                <View style={{
                    width: 200,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <Text style={{
                        color: item.booked ? colors.bookedText : overlapFlag ? colors.danger : colors.primaryInActive,
                        fontSize: 16,
                        fontWeight: '500'
                    }}>{item.booked ? 'Booked' : overlapFlag ? 'Overlapped' : ''}</Text>
                    <TouchableOpacity
                        style={[{

                            borderColor: item.booked || overlapFlag ? colors.primaryInActive : colors.secondary
                        },styles.bookCancelButton]}
                        disabled={!!item.booked || overlapFlag}
                        activeOpacity={item.booked ? 0.1 : 1}
                        onPress={() => {
                            !item.booked &&
                            handleClick();
                            dispatch(setBookTrue(item))
                            dispatch(addToMyShifts(item))

                        }}
                    >
                        {
                            isLoading && !item.booked ?
                                <ActivityIndicator size={'small'} color={colors.secondary}/> :
                                <Text
                                    style={{
                                        color: item.booked ? colors.primaryInActive : overlapFlag ? colors.primaryInActive : colors.secondary,
                                        // color: 'black',
                                        textAlign: 'center',
                                        fontSize: 18,
                                        fontWeight: 'bold'
                                    }}>{'Book'}</Text>
                        }
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
            try {
                fetchShifts().then((r) => {
                        r.map((item: any) => dispatch(addToShifts(item)))
                    }
                )
            } catch
                (e) {
                console.log(e)
            }
        }
        ,
        []
    )

    useEffect(() => {
        const storeHelsinki: any = [];
        const storeTampere: any = [];
        const storeTurku: any = [];
        const storeArea: any = [];

        const HelsinkiData = avShifts.filter((item: any) => (item.area === 'Helsinki'));
        const TampereData = avShifts.filter((item: any) => (item.area === 'Tampere'));
        const TurkuData = avShifts.filter((item: any) => (item.area === 'Turku'));

        const HelsinkiShifts = HelsinkiData.reduce((acc: any, curr: any) => {
            const date = formatDate(new Date(curr.startTime));
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(curr)
            return acc;
        }, {})
        const TampereShifts = TampereData.reduce((acc: any, curr: any) => {
            const date = formatDate(new Date(curr.startTime));
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(curr)
            return acc;
        }, {})
        const TurkuShifts = TurkuData.reduce((acc: any, curr: any) => {
            const date = formatDate(new Date(curr.startTime));
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(curr)
            return acc;
        }, {})

        for (const [key] of Object.entries(HelsinkiShifts)) {
            storeHelsinki.push({title: key, data: HelsinkiShifts[key]})
        }
        for (const [key] of Object.entries(TampereShifts)) {
            storeTampere.push({title: key, data: TampereShifts[key]})
        }
        for (const [key] of Object.entries(TurkuShifts)) {
            storeTurku.push({title: key, data: TurkuShifts[key]})
        }

        setHelsinkiShifts(storeHelsinki);
        setTampereShifts(storeTampere);
        setTurkuShifts(storeTurku);
        // setTurkuShifts(TurkuData);


        const AreaData = avShifts.reduce((acc: any, curr: any) => {
            const area = curr.area;
            if (!acc[area]) {
                acc[area] = []
            }
            acc[area].push(curr)
            return acc;
        }, {})


        for (const [key] of Object.entries(AreaData)) {
            storeArea.push({area: key})
        }

        setArea(storeArea);
        // @ts-ignore
    }, [avShifts]);
    // @ts-ignore
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>

            <StatusBar
                backgroundColor={'white'}
                barStyle={'dark-content'}
                showHideTransition={'none'}
            />

            <View
                style={{
                    height: 70
                }}
            >
                <FlatList
                    data={area}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={() => {
                                // @ts-ignore
                                setMenuName(item.area);
                            }}
                        >
                            <Text style={{
                                padding: 20,
                                // backgroundColor: 'pink',
                                borderRadius: 20,
                                color: item.area === menuName
                                    ? colors.primary
                                    : colors.primaryInActive,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}
                            >{item.area}{` (${item.area === 'Helsinki' ? helsinkiShifts.length : item.area === 'Turku' ? turkuShifts.length : item.area === 'Tampere' ? tampereShifts.length : null})`}</Text>
                        </TouchableOpacity>

                    )}
                    // style={{width: "100%"}}
                    contentContainerStyle={{
                        flexDirection: "row",
                        height: 70,
                        flexShrink: 1,
                        paddingHorizontal: 10,
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: 'white'
                    }}
                />
                <Text style={{
                    borderBottomWidth: .2,
                    height: 0,
                }}/>
            </View>
            {helsinkiShifts.length === 0 && tampereShifts.length === 0 && turkuShifts.length === 0 ?
                <ActivityIndicator size={'large'} color={colors.black}
                                   style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

                </ActivityIndicator> :

                <SectionList
                    sections={menuName === 'Helsinki' ? helsinkiShifts : menuName === 'Tampere' ? tampereShifts : turkuShifts}
                    keyExtractor={(item, index) => item + index}
                    ItemSeparatorComponent={() => <Text style={{
                        borderBottomWidth: .2,
                        // marginHorizontal: 10,
                        height: 0
                    }}/>}
                    renderItem={SectionListItem}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={{
                            paddingHorizontal: 20,
                            paddingVertical: 15,
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: colors.bookedText,
                            backgroundColor: colors.grey
                        }}>
                            {title}
                        </Text>
                    )}
                />}
        </View>
    );
}
export default AvailableShifts
const styles = StyleSheet.create({
    sectionListCard: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    bookCancelButton: {
        borderRadius: 30,
        borderWidth: .5,
        paddingHorizontal: 25,
        paddingVertical: 9,
        width: 110,
        height: 50,
        justifyContent: 'center',
    }

});
