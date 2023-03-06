import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    songDiscContainer: {
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'space-around', 
        marginTop: 10
    },
    subContainer: {
        alignSelf: 'flex-start',
        marginLeft: 37
    }
})