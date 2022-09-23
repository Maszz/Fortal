import React from 'react';
import {View, Text} from 'react-native';
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
  User,
} from 'react-native-gifted-chat';

export const renderAvatar = (props: any) => (
  <Avatar
    {...props}
    // containerStyle={{left: {borderWidth: 3, borderColor: 'red'}, right: {}}}
    // imageStyle={{left: {borderWidth: 3, borderColor: 'blue'}, right: {}}}
  />
);

export const renderBubble = (props: any) => (
  <Bubble
    {...props}
    // renderTime={() => <Text>Time</Text>}
    // renderTicks={() => <Text>Ticks</Text>}
    renderUsername={() => <Text>Username</Text>}
    renderUsernameOnMessage={true}
    containerStyle={
      {
        // left: {borderColor: 'teal', borderWidth: 8},
        // right: {},
      }
    }
    wrapperStyle={
      {
        // left: {borderColor: 'tomato', borderWidth: 4},
        // right: {},
      }
    }
    bottomContainerStyle={
      {
        // left: {borderColor: 'purple', borderWidth: 4},
        // right: {},
      }
    }
    tickStyle={{}}
    // usernameStyle={{color: 'tomato', fontWeight: '100'}}
    // containerToNextStyle={{
    //   left: {borderColor: 'navy', borderWidth: 4},
    //   right: {},
    // }}
    // containerToPreviousStyle={{
    //   left: {borderColor: 'mediumorchid', borderWidth: 4},
    //   right: {},
    // }}
  />
);

export const renderSystemMessage = (props: any) => (
  <SystemMessage
    {...props}
    // containerStyle={{backgroundColor: 'pink'}}
    // wrapperStyle={{borderWidth: 10, borderColor: 'white'}}
    // textStyle={{color: 'crimson', fontWeight: '900'}}
  />
);

export const renderMessage = (props: any) => (
  <Message
    {...props}
    containerStyle={
      {
        // left: {backgroundColor: 'lime'},
        // right: {backgroundColor: 'gold'},
      }
    }
  />
);

export const renderMessageText = (props: any) => (
  <MessageText
    {...props}
    containerStyle={
      {
        // left: {backgroundColor: 'yellow'},
        // right: {backgroundColor: 'purple'},
      }
    }
    textStyle={
      {
        // left: {color: 'red'},
        // right: {color: 'green'},
      }
    }
    linkStyle={{
      left: {color: 'orange'},
      right: {color: 'orange'},
    }}
    // customTextStyle={{fontSize: 24, lineHeight: 24}}
  />
);

export const renderCustomView = ({user = {} as User}) => (
  <View
    style={{
      minHeight: 20,
      alignItems: 'flex-start',
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
    }}>
    <Text>{user.name}</Text>
  </View>
);
