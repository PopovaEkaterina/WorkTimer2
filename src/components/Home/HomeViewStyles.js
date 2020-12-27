import {StyleSheet} from 'react-native';

const HomeViewStyles = StyleSheet.create({
    welcomeHeader: {
        textAlign: 'center',
        fontSize: 40,
        color: '#000',
        marginTop: 50,
    },
    homeViewContainer: {
        alignItems: 'center'
    },
    finishButtonText: {
        fontSize: 60,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#EA4C4C',
    },
    buttonsContainer: {
        alignItems:'center',
        justifyContent: 'space-between'
    }
});

export default HomeViewStyles;