import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RouteExplorer from "../screens/RouteExplorer";
import Roads from '../screens/Roads'

const RouteStack = createNativeStackNavigator()

export default function StackNavigation() {
    return (
        <RouteStack.Navigator
            initialRouteName="Explorador De Rutas"
            screenOptions={{ headerShown: false }}
        >
            <RouteStack.Screen name='RouteExplorer' component={RouteExplorer} />
            <RouteStack.Screen name="Roads" component={Roads} />
        </RouteStack.Navigator>
    )
}