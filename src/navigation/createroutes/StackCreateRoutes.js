import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateRoute from "../../screens/createroutes/CreateRoute";
import CreatingRoute from "../../screens/createroutes/CreatingRoutes"


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
        </RouteStack.Navigator>
    )
}