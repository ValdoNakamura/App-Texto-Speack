import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//Screens
import HomeScreen from '../screens/HomeScreen';
import StackNavigation from './StackRouteExplorer';
import CreateRoute from '../screens/CreateRoute';

//componente del boton
import TabButton from '../components/TabButton'

const Tab = createMaterialTopTabNavigator();

export default function TabNavigate() {

    const tabs = [
        { id: 1, title: 'Home', screen: 'Home', icon: 'home', Component: HomeScreen },
        { id: 2, title: 'Tus Rutas', screen: 'Explorador De Rutas', icon: 'footsteps', Component: StackNavigation },
        { id: 3, title: 'Agregar Ruta', screen: 'Agregar Ruta', icon: 'add-outline', Component: CreateRoute },
    ];

    return (
            <Tab.Navigator
                initialRouteName={'Home'}
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.TabBar
                }}
            >
                {
                    tabs.map ((items) =>
                        <Tab.Screen
                        key={items.id}
                        name={items.screen}
                        component={items.Component}
                        options={{
                            tabBarShowLabel: false,
                            tabBarButton: (props) => <TabButton item={items} {...props}/>
                        }}
                        />
                    )
                }
            </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    TabBar: {
        height: 110,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#fff',
        top: 0
    }
})