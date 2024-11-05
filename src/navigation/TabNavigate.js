import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import StackRouteExplorer from './routes/StackRouteExplorer';
import StackCreateRoute from '../navigation/createroutes/StackCreateRoutes';


import TabButton from '../components/TabButton';

const Material = createMaterialTopTabNavigator();

export default function TabNavigate() {

    const tabs = [
        { id: 1, title: 'Home', screen: 'Home', icon: 'home', Component: HomeScreen },
        { id: 2, title: 'Tus Rutas', screen: 'Explorador De Rutas', icon: 'footsteps', Component: StackRouteExplorer },
        { id: 3, title: 'Agregar Ruta', screen: 'Agregar Ruta', icon: 'add-outline', Component: StackCreateRoute },
    ];

    return (
        <Material.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                tabBarStyle: styles.TabBar,
                tabBarIndicatorStyle: { backgroundColor: '#fff' },
                tabBarItemStyle: { height: 140}
            }}
        >
            {tabs.map((item) => (
                <Material.Screen
                    key={item.id}
                    name={item.screen}
                    component={item.Component}
                    options={{
                        tabBarLabel: '',
                        tabBarIcon: ({ focused }) => (
                            <TabButton
                                item={item}
                                accessibilityState={{ selected: focused }}
                                onPress={() => navigation.navigate(item.screen)}
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
    }
});