import { StyleSheet } from "react-native";

export const stylesMain = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E2022'
    },
    btnGrande: {
        width: 360,
        height: 500,
        marginBottom: 20,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    textoBtn: {
        fontSize: 26,
        color: '#fff',
        fontWeight: 'bold'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    }
});