import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

//componente del boton
import TabButton from './src/components/TabButton'


//Screens
import HomeScreen from './src/screens/HomeScreen';
import BotonRutas from './src/screens/ExploradorRutas';
import BotonCrear from './src/screens/CreateRuote';




const Tab = createBottomTabNavigator();

function MyTabs() {

    const tabs = [ //Aqui podemos poner mas pantallas para el tab inferior
        {
            id: 1,
            title: 'Home',
            screen: 'Home',
            icon: 'home',
            Component: HomeScreen
        },
        {
            id: 2,
            title: 'Tus Rutas',
            screen: 'Explorador De Rutas',
            icon: 'footsteps',
            Component: BotonRutas
        },
        {
            id: 3,
            title: 'Agregar Ruta',
            screen: 'Agregar Ruta',
            icon: 'add-outline',
            Component: BotonCrear
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

export default function Navigation(){
    return (
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
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