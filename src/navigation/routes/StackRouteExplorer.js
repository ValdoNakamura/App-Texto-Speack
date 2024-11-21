import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RouteExplorer from '../../screens/routes/RouteExplorer';
import Roads from '../../screens/routes/Roads';
import InfoRoads from '../../screens/routes/InfoRoads';
import Walk from '../../screens/routes/Walk';

const RouteStack = createNativeStackNavigator()

export default function StackNavigation() {
    return (
        <RouteStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <RouteStack.Screen 
            name='RouteExplorer' 
            component={RouteExplorer} 
            />

            <RouteStack.Screen 
            name='Roads'
            component={Roads}
            />

            <RouteStack.Screen
            name='InfoRoads'
            component={InfoRoads}
            />

            <RouteStack.Screen
            name='Walk'
            component={Walk}
            />
        </RouteStack.Navigator>
    )
}