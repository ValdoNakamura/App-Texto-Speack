import { Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Location from 'expo-location';
import * as Speech from 'expo-speech';
import { FireBase_DB } from '../../../data/FirebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

import { stylesMain } from "../../stylesMain";

export default function Walk(props) {
    const [steps, setSteps] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const routeId = props.route.params.docWalk;
    const [nextDistance, setNextDistance] = useState(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);

    useEffect(() => {
        const fetchSteps = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const uid = user.uid;
                try {
                    const querySnapshot = await getDocs(collection(FireBase_DB, 'usuarios', uid, 'Rutas', routeId, 'Pasos'));
                    const stepsData = [];
                    querySnapshot.forEach((doc) => {
                        const { description, latitude, longitude } = doc.data();
                        stepsData.push({ description, latitude, longitude });
                    });
                    setSteps(stepsData);
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("No hay usuario autentificado");
            }
        };
        fetchSteps();
    }, [routeId]);

    const startLocationUpdates = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        Location.watchPositionAsync({
            accuracy: Location.Accuracy.High,
            distanceInterval: 2
        }, (location) => {
            setUserLocation(location.coords);
            checkProximity(location.coords);
        });
    };

    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371000;
        const toRadians = (degree) => degree * (Math.PI / 180);

        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const lat1Rad = toRadians(lat1);
        const lat2Rad = toRadians(lat2);

        const a = Math.sin(dLat / 2) ** 2 +
                  Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                  Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const checkProximity = (coords) => {
        if (steps.length > 0 && currentStepIndex < steps.length - 1 && userLocation) {
            const nextStep = steps[currentStepIndex + 1];
            const distance = haversineDistance(coords.latitude, coords.longitude, nextStep.latitude, nextStep.longitude);

            setNextDistance(Math.round(distance));

            if (distance < 10) {
                Speech.speak(nextStep.description, {
                    language: 'es-MX',
                    pitch: 1.0,
                    rate: 0.75
                });
                setCurrentStepIndex(currentStepIndex + 1);
            }
        }
    };

    useEffect(() => {
        if (routeId) {
            startLocationUpdates();
        }
    }, [routeId]);

    return (
        <View style={stylesMain.main}>
            <Text style={stylesMain.title}>Caminando</Text>
            <Text style={stylesMain.title}>
                Metros para el siguiente punto: {nextDistance === null ? "Calculando..." : `${nextDistance} m`}
            </Text>
        </View>
    );
}