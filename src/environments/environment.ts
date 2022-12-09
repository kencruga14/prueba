export const environment = {
  production: false,
  local: true,
  UrlService: 'http://localhost:8080/api',
  version: require('../../package.json').version,
  menu: 'https://users-api.espe.edu.ec/adm/id/code/',
  urlGciService: 'http://localhost:8085/api',



  sso: {
    serverUrl: 'https://srvcas.espe.edu.ec',
    clientId: 'F_13VTNPdVHPSstUZtYmldfl2UYa',
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