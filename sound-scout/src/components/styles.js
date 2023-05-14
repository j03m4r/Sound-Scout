import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
        fontSize: 25,
        textAlign: 'center'
    },
    usernameText: {
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
        width: 45,
        height: 45,
        borderRadius: 25,
        overflow: 'hidden'
    },
    listenersContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    verticleLine: {
        height: 35,
        width: 1,
        backgroundColor: '#909090',
        marginHorizontal: 10
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
    senderMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#006AFF',
        borderRadius: 15,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 15,
        maxWidth: '60%'
    },
    senderTrackMessage: {
        flex: 1,
        backgroundColor: '#3f3f3f',
        alignSelf: 'flex-end',
        borderRadius: 15,
        marginVertical: 5,
        overflow: "visible",
    },
    receiverMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#3f3f3f',
        borderRadius: 15,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 15,
        maxWidth: '60%'
    },
    receiverTrackMessage: {
        flex: 1,
        backgroundColor: '#3f3f3f',
        alignSelf: 'flex-start',
        borderRadius: 15,
        marginVertical: 5,
        overflow: "visible",
    },
    senderShadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    senderShadowPropWithMargin: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginBottom: 10
    },
    receiverShadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: 4, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    receiverShadowPropWithMargin: {
        shadowColor: '#171717',
        shadowOffset: {width: 4, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginBottom: 10
    },
    textMessage: {
        color: 'white'
    },
    track: {
        width: 250,
        height: 250,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    trackPlayerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    playButtonContainer: {
        borderRadius: 25,
        backgroundColor: '#006AFF',
        padding: 5,
        marginHorizontal: 15,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 32,
        height: 32,
    },
    trackDisplayImage: {
        width: 150,
        height: 150,
        borderRadius: 15,
    },
    sendButton: {
        borderRadius: 25,
        backgroundColor: '#006AFF',
        marginLeft: 5,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 18,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 15,
        width: '90%',
    },
    placeholderStyle: {
        color: 'black'
    }
});