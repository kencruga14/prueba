export const environment = {
  production: false,
  local: false,
  UrlService: 'https://update-api-test.espe.edu.ec/updateWs',
  version: require('../../package.json').version,

  sso: {
    serverUrl: 'https://srvcas.espe.edu.ec',
    clientId: 'dBfCfbfkmByxUmrwMqtNPm_63_Ea',
    issuer: '/oauth2endpoints/token',
    redirectUri: window.location.origin,
    postredirectUrL: window.location.origin,
    scope: 'openid profile email',
    logout: '/oidc/logout',
    tokenEndpoint: '/oauth2endpoints/token',
    userinfoEndpoint: '/oauth2/userinfo',
    authorizationEndpoint: '/oauth2/authorize',
    jwksEndpoint: '/oauth2/jwks',
    showDebugInformation: true,
    requireHttps: false,
    responseType: 'id_token token'
  }
};
