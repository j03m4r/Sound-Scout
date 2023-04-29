import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: "#fff"
    },
    container: {
      margin: 30,
      flex: 1,
      justifyContent: 'space-between',
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
        fontSize: 25,
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
    likeText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 80
    },
    likeNumber: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 15
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileIconSmall: {
        width: 35,
        height: 35,
        borderRadius: 25,
        overflow: 'hidden'
    },
    listenersContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileInstance: {
        flexDirection: 'row',
        borderStyle: 'solid',
        borderColor: 'darkgray',
        padding: 10,
        height: 75,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 15,
        width: 200
    },
    profileIconLarge: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden',
        marginRight: 15
    },
});