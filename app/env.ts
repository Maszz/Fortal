const devConfig = {
  graphqlHttp: 'http://localhost:3333/graphql',
  graphqlWs: 'ws://localhost:3333/graphql',
  bypassUser: false,
  bypassRegister: false,
  goOnboard: false,
  apiBaseUrl: 'http://192.168.1.150:3333',
  // apiBaseUrl: 'http://localhost:4032',
};

/**
 * defalut value same as no debugger attached
 */
const prodConfig = {
  graphqlHttp: 'http://localhost:3333/graphql',
  graphqlWs: 'ws://localhost:3333/graphql',
  bypassUser: false,
  bypassRegister: false,
  goOnboard: false,
  apiBaseUrl: 'http://localhost:3333',
};

export const Config = __DEV__ ? devConfig : prodConfig;
