import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: "#fff"
    },
    container: {
      margin: 30,
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    selector: {
        width: 200
    },
    popularityText: {
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    },
    genreText: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    button: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'darkgray',
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
    },
});