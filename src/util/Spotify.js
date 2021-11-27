const clientId = '1134681b65294c12b8b5f8d0071af5a5';
const redirectUri = "http://localhost:3000/";

let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        } 

        //check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
                accessToken = accessTokenMatch[1];
                const expireTime = Number(expiresInMatch[1]);

            //clear parameters ready for new access token when expired
            window.setTimeout(() => accessToken = '', expireTime * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

            window.location = accessUrl;
        }

    }
}

export default Spotify;