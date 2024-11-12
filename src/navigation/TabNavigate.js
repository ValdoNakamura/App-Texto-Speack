import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

// Screens
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


    //const navigation = useNavigation();


    {/*useEffect(()=>{
        const HideTabBar = navigation.addListener('state', (e)=>{
            const routeName = e.data.state?.routes[e.data.state.index]?.name;

            if (routeName === 'Roads') {
                navigation.setOptions({ tabBarStyle: { display: 'none' } });
            } else {
                navigation.setOptions({ tabBarStyle: styles.TabBar });
            }
        })
        return HideTabBar
    },[navigation])*/}

    const getTabBarStyle = (route) => {
        // Obtén el nombre de la pantalla actualmente enfocada dentro de StackNavigation
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

        // Oculta la barra de pestañas si estamos en la pantalla "Details"
        if (routeName === 'Roads') {
            return { display: 'none' };
        }else if(routeName === 'CreatingRoute') {
            return { display: 'none' };
        }
        return styles.TabBar;
    };

    return (
        <Material.Navigator
            initialRouteName={'inicio'}
            screenOptions={({route})=>({
                headerShown: false,
                tabBarStyle: getTabBarStyle(route),
                tabBarIndicatorStyle: { backgroundColor: '#fff' },
                tabBarItemStyle: { height: 140}
            })}
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