import React, {useState} from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TextInput,
} from "react-native";
import FinishViewStyles from "./FinishViewStyles";
import ResponsiveCentered from "./ResponsiveCentered";
import ActionButton from "./ActionButton";
import i18n from "../../i18n/i18n";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ACTIVITY_STORAGE_KEY} from "../config/consts";

const FinishView = props => {
    const timeSpent = props.route.params.timeSpent;
    const [name, setName] = useState('');

    const saveTime = async () => {
        let activities = await AsyncStorage.getItem(ACTIVITY_STORAGE_KEY);
        if(activities === null) {
            activities = [];
        } else {
            activities = JSON.parse(activities);
        }
        const date = new Date().getTime();
        activities.push({
            name,
            timeSpent,
            date
        });
        await AsyncStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(activities));
        props.navigation.goBack();
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:3, justifyContent: 'space-between'}}>
                <Text style={FinishViewStyles.mainHeader}>
                    {i18n.FINISH.MAIN_HEADER}
                </Text>
                <Text style={FinishViewStyles.timerSubHeader}>
                    {moment.utc(timeSpent).format(i18n.TIMER_FORMAT)}
                </Text>
                <View style={{flex:0.2}} />
            </View>

            <View style={{flex:1}}>
                <ResponsiveCentered>
                    <Text style={FinishViewStyles.activityNameLabel}>
                        {i18n.FINISH.ACTIVITY_NAME_LABEL}
                    </Text>
                </ResponsiveCentered>
                <ResponsiveCentered>
                    <TextInput
                        style={FinishViewStyles.activityNameInput}
                        onChangeText={(txt) => setName(txt)}
                        value={name}

                    />
                </ResponsiveCentered>
            </View>

            <View style={{flex:5}}>
                <ResponsiveCentered>
                    <View style={FinishViewStyles.actionButtonsContainer}>
                        <ActionButton
                            onPress={() => {
                                props.navigation.goBack();
                            }}
                            label={i18n.CANCEL}
                            backgroundColor={'#F39527'}
                            textColor={'#fff'}
                        />
                        <ActionButton
                            label={i18n.SAVE}
                            backgroundColor={'#00CD5E'}
                            textColor={'#fff'}
                            onPress={saveTime}
                        />
                    </View>

                </ResponsiveCentered>

            </View>

        </SafeAreaView>
    )
}

export default FinishView;