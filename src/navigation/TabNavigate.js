import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

//Screens
import HomeScreen from '../screens/HomeScreen';
import StackNavigation from './StackRouteExplorer';
import CreateRoute from '../screens/CreateRoute';

//componente del boton
import TabButton from '../components/TabButton'

const Tab = createBottomTabNavigator();

export default function TabNavigate() {

    const tabs = [ //Aqui podemos poner mas pantallas para el tab inferior
        {
            id: 2,
            title: 'Tus Rutas',
            screen: 'Explorador De Rutas',
            icon: 'footsteps',
            Component: StackNavigation,
            thingToSay: 'Estas En Explorador De Rutas'
        },
        {
            id: 1,
            title: 'Home',
            screen: 'Home',
            icon: 'home',
            Component: HomeScreen,
            thingToSay: 'Estas En Home'
        },
        
        {
            id: 3,
            title: 'Agregar Ruta',
            screen: 'Agregar Ruta',
            icon: 'add-outline',
            Component: CreateRoute,
            thingToSay: 'Estas En Agregar Ruta'
        }
    ];

    return (
            <Tab.Navigator
                initialRouteName={'Home'}
                screenOptions={{
                    headerShown: true,
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
        height: 70,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#fff',
        top: 100,
        borderRadius: 100,
        marginLeft: 10,
        marginRight: 10
    }
})