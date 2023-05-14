import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 35
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    songDiscContainer: {
        alignSelf: 'flex-start',
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'space-around', 
        marginTop: 10,
    },
    subContainer: {
        alignSelf: 'flex-start',
    }
})