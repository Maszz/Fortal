const devConfig = {
  graphqlHttp: 'http://localhost:3333/graphql',
  graphqlWs: 'ws://localhost:3333/graphql',
  bypassUser: false,
  bypassRegister: false,
  goOnboard: true,
};

/**
 * defalut value same as no debugger attached
 */
const prodConfig = {
  graphqlHttp: 'http://localhost:3333/graphql',
  graphqlWs: 'ws://localhost:3333/graphql',
  bypassUser: false,
  bypassRegister: false,
  goOnboard: true,
};

export const Config = __DEV__ ? devConfig : prodConfig;
