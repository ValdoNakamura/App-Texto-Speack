import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

//Screens
import HomeScreen from '../screens/HomeScreen';
import StackNavigation from '../navigation/StackNavigation';
import CreateRuote from '../screens/CreateRuote';

//componente del boton
import TabButton from '../components/TabButton'

const Tab = createBottomTabNavigator();

export default function MyTabs() {

    const tabs = [ //Aqui podemos poner mas pantallas para el tab inferior
        {
            id: 1,
            title: 'Home',
            screen: 'Home',
            icon: 'home',
            Component: HomeScreen,
            thingToSay: 'Estas En Home'
        },
        {
            id: 2,
            title: 'Tus Rutas',
            screen: 'Explorador De Rutas',
            icon: 'footsteps',
            Component: StackNavigation,
            thingToSay: 'Estas En Explorador De Rutas'
        },
        {
            id: 3,
            title: 'Agregar Ruta',
            screen: 'Agregar Ruta',
            icon: 'add-outline',
            Component: CreateRuote,
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
                            tabBarButton: (props) => <TabButton item={items} thingToSay={items.thingToSay} {...props}/>
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
        borderColor: 'yellow'
    }
})