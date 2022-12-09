export const environment = {
  production: true,
  local: false,
  UrlService: 'https://update-api.espe.edu.ec/updateWs',
  version: require('../../package.json').version,
  urlGciService: 'http://localhost:8085/api',

  sso: {
    serverUrl: 'https://srvcas.espe.edu.ec',
    clientId: 'lViqfu5ROqf2bIr71vXqDxgEXYQa',
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
