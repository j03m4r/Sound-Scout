import getAuthorizationCode from './getAuthorizationCode';

const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode()
    // const credsB64 = btoa(`4e98b92673284f10aee6970949ad722d:529e4ba740ee494ea1ed8cce218082bf`);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=https://auth.expo.io/@j03m4r/sound-scout&client_id=4e98b92673284f10aee6970949ad722d&client_secret=529e4ba740ee494ea1ed8cce218082bf`,
    });
    // const responseJson = await response.json();
    console.log(response);

    // const {
    //   access_token: accessToken,
    //   refresh_token: refreshToken,
    //   expires_in: expiresIn,
    // } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    console.log('accessToken ' + accessToken);
    console.log('refreshToken ' + refreshToken);
    console.log('expirationTime ' + expirationTime);
  } catch (err) {
    console.error(err);
  }
}

export default getTokens;