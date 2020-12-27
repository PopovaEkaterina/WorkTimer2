import {StyleSheet} from 'react-native';

const HistoryViewStyles = StyleSheet.create({
    historyItemContainer: {
        flexDirection:'row',
        borderBottomWidth:1,
        borderColor: '#EAEAEA',
        padding:12,
        height: 68
    },
    historyItemName: {
        fontSize:15
    },
    historyItemDetailsContainer: {
        flex:2,
        alignItems: 'flex-end',
        flexDirection: 'column',
        justifyContent:'space-between'
    },
    historyItemDetailsText: {
        fontSize:14
    },
    historyPageHeader: {
        fontSize: 40,
        textAlign:'center'
    }
});

export default HistoryViewStyles;