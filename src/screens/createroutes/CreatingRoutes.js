import { Text, View, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useState } from 'react';
import { FireBase_DB } from '../../../data/FirebaseConfig'
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { stylesMain } from '../../stylesMain'
import ButtonBottom from '../../components/ButtonBottom'


export default function CreatingRoutes(props) {

    const [pressed, setPressed] = useState(false);

    const initialState = {
        nombre: '',
        inicio: '',
        fin: ''
    }

    const [state, setState] = useState(initialState)

    const handleChangeText = (value, name) => {
        setState({...state, [name]: value})
    }

    const saveRoute = async () => {
        if (!state.nombre.trim() || !state.inicio.trim() || !state.fin.trim()) {
            Alert.alert('Alerta', 'Todos los campos son obligatorios. Por favor, llénalos.');
            return;
        }

        const auth = getAuth();
        const user = auth.currentUser;
    
        if (user) {
            const uid = user.uid;
            try {
                const docRef = await addDoc(collection(FireBase_DB, 'usuarios', uid, 'Rutas'), {
                    ...state
                });
                props.navigation.navigate('WriteRoute', { routeId: docRef.id });
                Alert.alert('Alerta', 'Guardado con éxito');
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("No hay usuario autentificado")
        }
    };


    return (
        <View style={stylesMain.main}>
            <Text style={styles.title}>
                Estas a punto de crear tu ruta por favor llena los campos
            </Text>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre'
                    autoCapitalize='none'
                    onChangeText={(value)=>handleChangeText(value, 'nombre')}
                    value={state.nombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Inicio'
                    autoCapitalize='none'
                    onChangeText={(value)=>handleChangeText(value, 'inicio')}
                    value={state.inicio}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Fin'
                    autoCapitalize='none'
                    onChangeText={(value)=>handleChangeText(value, 'fin')}
                    value={state.fin}
                />
            </View>
            <View style={styles.containerBtnRoute}>
                <Pressable 
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}
                style={({ pressed }) => [
                    styles.btnRoute,
                    { opacity: pressed ? 0.6 : 1.0 }   
                ]} 
                onPress={saveRoute}
                >
                    <Text style={styles.textBtnRoute}>Crear Mi Camino</Text>
                </Pressable>
                
            </View>
            <ButtonBottom title='Regresar' onPress={()=> props.navigation.navigate('CreateRoute')}/>
        </View>
    )

}


const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 25,
        textAlign:'center',
        marginBottom: 25
    },
    btnNext: {
        height: 200,
        backgroundColor: 'white'
    },
    containerInput: {
        width: 300
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
    },
    containerBtnRoute: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnRoute:{
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: '#404040'
    },
    textBtnRoute: {
        fontSize: 20,
        color: '#fff'
    }
})