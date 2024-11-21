import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateRoute from '../../screens/createroutes/CreateRoute';
import CreatingRoute from '../../screens/createroutes/CreatingRoutes';
import WriteRoute from '../../screens/createroutes/WriteRoute';


const RouteStack = createNativeStackNavigator()

export default function StackNavigation() {
    return (
        <RouteStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <RouteStack.Screen 
            name='CreateRoute' 
            component={CreateRoute} 
            />

            <RouteStack.Screen 
            name='CreatingRoute'
            component={CreatingRoute}
            />

            <RouteStack.Screen
            name='WriteRoute'
            component={WriteRoute}
            />
        </RouteStack.Navigator>
    )
}