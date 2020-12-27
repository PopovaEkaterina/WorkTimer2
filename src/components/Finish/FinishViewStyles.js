import {StyleSheet} from 'react-native';

const FinishViewStyles = StyleSheet.create({
    mainHeader:{
        fontSize: 40,
        textAlign: 'center',
        flex: 2
    },
    timerSubHeader:{
        fontSize: 40,
        flex: 2,
        textAlign: 'center'
    },
    activityNameLabel:{
        fontSize: 16
    },
    activityNameInput:{
        borderRadius: 5,
        borderColor: '#848484',
        borderWidth: 1,
        height: 44,
        marginTop: 7
    },
    actionButtonsContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:65
    }
});

export default FinishViewStyles;