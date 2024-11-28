import { Text, View, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import * as Speech from 'expo-speech';
import { FireBase_DB } from '../../../data/FirebaseConfig';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

import { stylesMain } from "../../stylesMain";
import ButtomBottom from "../../components/ButtonBottom";

export default function Walk(props) {
    const [steps, setSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [hasEnded, setHasEnded] = useState(false);

    const routeId = props.route.params.docWalk;

    useEffect(() => {
        const fetchSteps = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const uid = user.uid;
                try {
                    const pasosQuery = query(
                        collection(FireBase_DB, 'usuarios', uid, 'Rutas', routeId, 'Pasos'),
                        orderBy('creationtime', 'asc')
                    );

                    const querySnapshot = await getDocs(pasosQuery);
                    const stepsData = [];
                    querySnapshot.forEach((doc) => {
                        const { description } = doc.data();
                        stepsData.push({ description });
                    });

                    const groupedSteps = [];
                    let count = 1;
                    for (let i = 0; i < stepsData.length; i++) {
                        if (
                            i < stepsData.length - 1 &&
                            stepsData[i].description === stepsData[i + 1].description &&
                            stepsData[i].description === "linea recta"
                        ) {
                            count++;
                        } else {
                            groupedSteps.push({
                                description:
                                    count > 1
                                        ? `Camina ${count} pasos en línea recta`
                                        : stepsData[i].description
                            });
                            count = 1;
                        }
                    }

                    setSteps(groupedSteps);
                } catch (error) {
                    console.log("Error al obtener los pasos: ", error);
                }
            } else {
                console.log("No hay usuario autentificado");
            }
        };
        fetchSteps();
    }, [routeId]);

    const speakStep = () => {
        if (steps.length > 0 && currentStepIndex < steps.length && !isSpeaking) {
            const currentStep = steps[currentStepIndex];
            setIsSpeaking(true);
            Speech.speak(currentStep.description, {
                language: 'es-MX',
                pitch: 1.0,
                rate: 0.75,
                onDone: () => {
                    setIsSpeaking(false);
                    if (currentStepIndex < steps.length - 1) {
                        setCurrentStepIndex(currentStepIndex + 1);
                    } else {
                        setHasEnded(true);
                        Speech.speak("Has completado la ruta. Buen trabajo.", {
                            language: 'es-MX',
                            pitch: 1.0,
                            rate: 0.75,
                        });
                    }
                },
            });
        }
    };

    const stopSpeaking = () => {
        Speech.stop();
        setIsSpeaking(false);
    };

    return (
        <View style={stylesMain.main}>
            <Text style={stylesMain.title}>Caminando</Text>
            <Text style={stylesMain.title}>
                {hasEnded
                    ? "Has completado la ruta."
                    : `Paso actual: ${currentStepIndex + 1} / ${steps.length}`}
            </Text>

            <Pressable
                onPress={speakStep}
                style={styles.button}
                disabled={isSpeaking || hasEnded}
            >
                <Text style={styles.buttonText}>
                    {hasEnded ? "Ruta Completa" : isSpeaking ? "Hablando..." : "Dictar Paso"}
                </Text>
            </Pressable>

            <ButtomBottom title='Regresar' onPress={() => {
                stopSpeaking();
                props.navigation.goBack();
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});