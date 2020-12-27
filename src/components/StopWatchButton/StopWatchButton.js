import {Text, TouchableOpacity, Animated} from "react-native";
import React from 'react';
import i18n from "../../i18n/i18n";
import moment from "moment";
import StopWatchButtonsStyles from "./StopWatchButtonStyles";

const StopWatchButton = ({time, timerOnPressAction, startOnPressAction, paused}) => {
    const timerOpacity = new Animated.Value(1);
    const BLINK_DELAY = 1500;
    const blinker = (toValue) => {
        if(paused) {
            Animated.timing(timerOpacity, {
                toValue,
                duration: BLINK_DELAY,
                useNativeDriver: true
            }).start(() => blinker(toValue === 1 ? 0: 1));
        } else {
            Animated.timing(timerOpacity, {
                toValue: 1,
                duration: BLINK_DELAY,
                useNativeDriver: true
            }).start();
        }
    }

    blinker(0);

    if(time > 0) {
        return(
            <TouchableOpacity
                style={StopWatchButtonsStyles.mainActionButton}
                onPress={timerOnPressAction}>
                <Animated.View style={[StopWatchButtonsStyles.mainActionButton, {opacity: timerOpacity}]}>
                    <Text style={StopWatchButtonsStyles.mainActionButtonText}>
                        {moment.utc(time).format(i18n.TIMER_FORMAT)}
                    </Text>
                    <Text style={[
                        StopWatchButtonsStyles.mainActionButtonText,
                        StopWatchButtonsStyles.mainActionButtonPauseText
                    ]}>
                        {i18n.STOP_WATCH.PAUSE}
                    </Text>
                </Animated.View>

            </TouchableOpacity>
        )
    }
    return(
        <TouchableOpacity
            style = {StopWatchButtonsStyles.mainActionButton}
            onPress={startOnPressAction}>
            <Text style={StopWatchButtonsStyles.mainActionButtonText}>
                {i18n.STOP_WATCH.START}
            </Text>
        </TouchableOpacity>
    )
}

export default StopWatchButton;