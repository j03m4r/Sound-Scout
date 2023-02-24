import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30, 
        paddingVertical: 80,
    },
    loginContainer: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 175
    },
    textInput: {
        borderColor: 'darkgray',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        padding: 15,
        marginVertical: 15
    },
    button: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'darkgray',
        padding: 15,
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
    },
    signUpText: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
        marginVertical: 50,
    },
    backButton: {
        marginBottom: 75
    }
});
export default styles;