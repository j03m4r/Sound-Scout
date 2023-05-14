import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container0: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 80,
    },
    loadingText: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    },
    container1: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        borderRadius: 12
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "center",
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 30,
        marginVertical: 30
    },
    listScreenHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    conversationScreenHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: 30
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        zIndex: 1,
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16
    },
    statsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 200,
        height: 200,
        borderRadius: 12,
        overflow: "visible",
        marginHorizontal: 20
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 12,
        marginRight: 20
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    songDiscContainer: {
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        borderColor: 'black',
        height: '100%',
        padding: 10
    },
    rotatedView: {
        transform: [{ rotateY: '180deg' }],
        textAlign: 'center'
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 3},
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    personalDms: {
        alignSelf: 'flex-end',
        flexDirection: "row",
        marginVertical: 30,
        marginHorizontal: 30,
        backgroundColor: "#41444B",
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center" 
    },
    usernameText: {
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: 'center'
    },
    profileIconLarge: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden',
        marginRight: 15
    },
    conversationScreenContainer: {
        flex: 1,
        paddingTop: 80,
    },
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginLeft: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'gray'
    },
    textInput: { 
        flex: 1,
        paddingVertical: 10,
        paddingRight: 15,
        paddingLeft: 5,
        fontSize: 18
    },
    sendButton: {
        zIndex: 2,
        borderRadius: 25,
        backgroundColor: '#006AFF',
        marginLeft: 5,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: 10,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0)'
    },
    likedTracksButton: {
        borderRadius: 25,
        backgroundColor: '#3f3f3f',
        marginRight: 5,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendTrackButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        borderColor: '#006AFF',
        borderWidth: 1,
        bottom: 0,
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 50
    },
    messageInput: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'black'
    }
});
export default styles;