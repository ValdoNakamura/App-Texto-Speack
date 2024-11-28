import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import StackRouteExplorer from './routes/StackRouteExplorer';
import StackCreateRoute from '../navigation/createroutes/StackCreateRoutes';

import TabButton from '../components/TabButton';

const Material = createMaterialTopTabNavigator();

export default function TabNavigate() {
    const tabs = [
        { id: 1, title: 'Home', screen: 'Home', icon: 'home', Component: HomeScreen },
        { id: 2, title: 'Tus Rutas', screen: 'ExploradorDeRutas', icon: 'footsteps', Component: StackRouteExplorer },
        { id: 3, title: 'Agregar Ruta', screen: 'AgregarRuta', icon: 'add-outline', Component: StackCreateRoute },
    ];

    const getTabBarStyle = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

        if (['Roads', 'CreatingRoute', 'InfoRoads', 'Walk', 'WriteRoute'].includes(routeName)) {
            return { display: 'none' };
        }
        return styles.TabBar;
    };

    const getSwipeEnabled = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

        if (['Roads', 'CreatingRoute', 'InfoRoads', 'Walk', 'WriteRoute'].includes(routeName)) {
            return false;
        }
        return true;
    };

    return (
        <Material.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: getTabBarStyle(route),
                swipeEnabled: getSwipeEnabled(route),
                tabBarIndicatorStyle: { backgroundColor: '#fff' },
                tabBarItemStyle: { height: 140 }
            })}
        >
            {tabs.map((item, index) => (
                <Material.Screen
                    key={index}
                    name={item.screen}
                    component={item.Component}
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <TabButton
                                key={index}
                                item={item}
                                accessibilityState={{ selected: focused }}
                            />
                        ),
                    }}
                />
            ))}
        </Material.Navigator>
    );
}

const styles = StyleSheet.create({
    TabBar: {
        height: 125,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 0.5,
        borderColor: '#ddd',
    },
});