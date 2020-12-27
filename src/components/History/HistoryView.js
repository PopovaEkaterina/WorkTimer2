import React from 'react';
import {View, Text, FlatList, SafeAreaView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import i18n from "../../i18n/i18n";
import HistoryViewStyles from "./HistoryViewStyles";
import {ACTIVITY_STORAGE_KEY} from "../config/consts";

class HistoryView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            parsedActivities: []
        }
        props.navigation.addListener('willFocus', this.getActivities);
        this.getActivities();
    }

    getActivities = async () => {
        const activities = await AsyncStorage.getItem(ACTIVITY_STORAGE_KEY);
        console.log('activities = '+ JSON.stringify(activities, null, 4))
        let parsedActivities = [];
        if(activities !== null) {
            parsedActivities = JSON.parse(activities);
        }
        this.setState({
            parsedActivities: parsedActivities.reverse()
        })
    }

    renderItem = ({item}) => {
        return(
            <View style={HistoryViewStyles.historyItemContainer}>
                <View style={{flex:4}}>
                    <Text style={HistoryViewStyles.historyItemName}>{item.name}</Text>
                </View>
                <View style={HistoryViewStyles.historyItemDetailsContainer}>
                    <View>
                        <Text style={HistoryViewStyles.historyItemDetailsText}>
                            {moment.utc(item.date).format(i18n.DATE_FORMAT)}
                        </Text>
                    </View>
                    <View>
                        <Text style={HistoryViewStyles.historyItemDetailsText}>
                            {moment.utc(item.timeSpent).format(i18n.TIMER_FORMAT)}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const {parsedActivities} = this.state;
        return(
            <SafeAreaView style={{flex:1}}>
                <Text style={HistoryViewStyles.historyPageHeader}>
                    {i18n.HISTORY.SAVED_ACTIVITIES_HEADER}
                </Text>
                <FlatList
                data={parsedActivities}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => {return item.name+index}}
                />
            </SafeAreaView>
        )
    }



}

export default HistoryView;