import React from 'react';
import {View, Text, AppState, TouchableOpacity} from 'react-native';
import HomeViewStyles from "./HomeViewStyles";
import i18n from "../../i18n/i18n";
import StopWatchButton from "../StopWatchButton/StopWatchButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    TIME_STORAGE_KEY,
    IS_PAUSED_STORAGE_KEY,
    APP_STATE_CHANGED_TIMESTAMP_STORAGE_KEY
} from "../config/consts";

class HomeView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            paused: false
        };
        this.handleAppStateChange('initial');
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange)
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange)
    }

     handleAppStateChange = async(nextAppState) => {
        const now = new Date().getTime();
        const {time, paused} = this.state;
        const readTime = parseInt(await AsyncStorage.getItem(TIME_STORAGE_KEY));
        const readStateTimestamp = parseInt(await AsyncStorage.getItem(APP_STATE_CHANGED_TIMESTAMP_STORAGE_KEY));
        if((nextAppState === 'active' || nextAppState === 'initial') && !isNaN(readTime)) {
            const timeDifference = now - readStateTimestamp;
            const newTime = readTime !== 0 ? readTime + timeDifference : 0;
            const isPaused = await AsyncStorage.getItem(IS_PAUSED_STORAGE_KEY);
            const wasPaused = isPaused && isPaused === true;
            let newState = {
                paused: wasPaused,
                time: parseInt(readTime),
            };
            if(!wasPaused) {
                newState.time = newTime
            }
            this.setState(newState, () => {
                if (newState.time > 0) {
                    this.startOnPressAction();
                }
            })
        } else {
            await AsyncStorage.setItem(TIME_STORAGE_KEY, time.toString());
            await AsyncStorage.setItem(APP_STATE_CHANGED_TIMESTAMP_STORAGE_KEY, now.toString());
            await AsyncStorage.setItem(IS_PAUSED_STORAGE_KEY, paused);
        }
    }

    timerOnPressAction = () => {
        this.setState({
            paused: !this.state.paused
        })
    }

    startOnPressAction = () => {
        this.clearTimer()
        this.timerIntervalId = setInterval(() => {
            if(!this.state.paused) {
                this.setState({
                    time: this.state.time + 1000
                });
            }
        }, 1000)
    }

    clearTimer = () => {
        if(this.timerIntervalId) {
            clearInterval(this.timerIntervalId);
        }
    }

    renderFinishButton = () => {
        const {time, paused} = this.state;
        if(time && !paused) {
           return(
               <TouchableOpacity onPress={() => {
                   this.clearTimer();
                   this.props.navigation.navigate('Finish', {
                       timeSpent: time
                   });
                   this.setState({
                       time: 0,
                   })
               }}>
                   <Text style={HomeViewStyles.finishButtonText}>{i18n.HOME.FINISH}</Text>
               </TouchableOpacity>
           )
        }
        return null;
    }

    render() {
        return (
            <View style={[{flex:1}, HomeViewStyles.homeViewContainer]}>
                <View style={{flex:1}}>
                    <Text style={HomeViewStyles.welcomeHeader}>
                        {i18n.HOME.WELCOME_HEADER}
                    </Text>
                </View>
                <View style={[{flex:2}, HomeViewStyles.buttonsContainer]}>
                    <StopWatchButton
                        paused={this.state.paused}
                        time={this.state.time}
                        timerOnPressAction={this.timerOnPressAction}
                        startOnPressAction={this.startOnPressAction}
                    />
                    {this.renderFinishButton()}
                </View>
            </View>
        )
    }
};

export default HomeView;