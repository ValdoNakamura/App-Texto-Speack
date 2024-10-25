import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RouteExplorer from "../screens/RouteExplorer";


import Roads from '../screens/Roads'

const StackRoads = createNativeStackNavigator()

export default function StackNavigation() {
    return (
        <StackRoads.Navigator
            initialRouteName="Explorador De Rutas"
        >
            <StackRoads.Screen
                name='Page Roads'
                component={RouteExplorer}
                options={{
                    headerShown: false
                }}
            />
            <StackRoads.Screen
                name="Roads"
                component={Roads}
                options={{
                    headerShown: false
                }}
            />
        </StackRoads.Navigator>
    )
}