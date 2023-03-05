import * as AuthSession from 'expo-auth-session';

const scopesArr = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'user-read-private',
'user-top-read', 'app-remote-control', 'user-read-playback-position']
const scopes = scopesArr.join(' ');

const getAuthorizationCode = async () => {
    try {
      const redirectUrl = AuthSession.getRedirectUrl('redirect'); //this will be something like https://auth.expo.io/@your-username/your-app-slug
      const result = await AuthSession.startAsync({
        authUrl:
          'https://accounts.spotify.com/authorize?response_type=code&client_id=4e98b92673284f10aee6970949ad722d&scope=&scopes&redirect_uri=https://auth.expo.io/@j03m4r/sound-scout',
      })
      return result.params.code
    } catch (err) {
      console.error(err)
    }
}

export default getAuthorizationCode;