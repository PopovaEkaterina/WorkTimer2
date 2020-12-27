import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from "./src/components/Home/HomeView";
import FinishView from "./src/components/Finish/FinishView";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HistoryView from "./src/components/History/HistoryView";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function App() {
    const tabBarOptions = {
        activeTintColor: '#6D6D6D',
        inactiveTintColor: '#A3A3A3',
        labelStyle: {
            fontSize:30
        },
        style: {
            borderColor: 'rgba(140, 140, 140, 0.8)',
            backgroundColor: '#E0E0E0',
            borderTopWidth: 1
        }
    }
    return (
        <NavigationContainer>
            <Tab.Navigator tabBarOptions={tabBarOptions}>
                <Tab.Screen name="Home" component={HomeNavigator} />
                <Tab.Screen name="History" component={HistoryView} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const HomeNavigator = () => {
    return(
        <Stack.Navigator headerMode='none' >
            <Stack.Screen name="Home" component={HomeView} />
            <Stack.Screen name="Finish" component={FinishView} />
        </Stack.Navigator>
    )
}

export default App;
