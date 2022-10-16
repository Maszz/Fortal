/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
/*eslint eslint-comments/no-unlimited-disable: error */
import React, {useState, useEffect, useCallback} from 'react';
import {Alert} from 'react-native';
import AccessoryBar from './AccessoryBar';
import {Text} from 'native-base';

import {
  GiftedChat,
  IMessage,
  Bubble,
  SystemMessage,
  User,
} from 'react-native-gifted-chat';
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
} from './MessageContainer';
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from './InputToolBar';

/**
 * Non ready prebuild components `from react-native-gifted-chat`
 * @CONTRIBUTIONS if have time enough, please help to build these components and make a PR
 *                we will build them anyway, but if not, we will use this as default
 * @TODO build full functionality of these components with native-base
 * @PROPS messages from useChat hooks or any other sources.
 */
const ChatComponent = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [textInput, setTextInput] = useState<string>('');
  const [isLoadingEarlier, setIsLoadingEarlier] = useState<boolean>(false);
  const [isTyping, setTyping] = useState<boolean>(false);
  const user = {
    _id: 1,
    name: 'Developer',
  };
  const otherUser = {
    _id: 2,
    name: 'React Native',
    avatar: 'https://facebook.github.io/react/img/logo_og.png',
  };

  const onSend = useCallback(
    (newMessages: IMessage[] = []) => {
      console.log(newMessages);
      const onRecive = GiftedChat.append(messages, newMessages); //
      console.log('onRecive', onRecive);
      setMessages(onRecive);
    },
    [messages],
  );

  const onLoadEarlier = () => {
    setIsLoadingEarlier(true);
  };
  const onQuickReply = (replies: any) => {
    const createdAt = new Date();
    if (replies.length === 1) {
      onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user,
        },
      ]);
    } else if (replies.length > 1) {
      onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies.map((reply: any) => reply.title).join(', '),
          user,
        },
      ]);
    } else {
      console.warn('replies param is not set correctly');
    }
  };

  const renderQuickReplySend = () => <Text>{' custom send =>'}</Text>;

  //   const renderAccessory = () => (
  //     <AccessoryBar onSend={mess => onSend(mess)} isTyping={setTyping} />
  //   );

  useEffect(() => {
    // setMessages([

    // ]);
    onSend([
      {
        _id: 10,
        text: 'This is a system message',
        createdAt: new Date(Date.now()),
        system: true,
        user: {} as User,
        // Any additional custom parameters are passed through
      },
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          // avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
    // onSend([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       // avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ]);
  }, []);
  return (
    <GiftedChat
      renderUsernameOnMessage={true}
      messages={messages}
      text={textInput}
      onInputTextChanged={eText => setTextInput(eText)}
      onSend={mess => onSend(mess)}
      user={user}
      loadEarlier={isLoadingEarlier}
      onLoadEarlier={onLoadEarlier}
      onLongPressAvatar={userIcon => Alert.alert(JSON.stringify(userIcon))}
      //   onPress={() => {
      //     Alert.alert('Bubble pressed');
      //   }}
      wrapInSafeArea={true}
      onPressAvatar={_ => Alert.alert('Bubble pressed')}
      onQuickReply={onQuickReply}
      renderQuickReplySend={renderQuickReplySend}
      keyboardShouldPersistTaps="never"
      placeholder="Dummy placeholderIdentifier"
      scrollToBottom
      renderBubble={renderBubble}
      renderSystemMessage={renderSystemMessage}
      isTyping={isTyping}
      //   renderAccessory={renderAccessory}
      renderAvatar={renderAvatar}
      renderMessage={renderMessage}
      renderMessageText={renderMessageText}
      //   renderCustomView={renderCustomView}
      //   renderActions={renderActions}
      //   renderComposer={renderComposer}
      renderSend={renderSend}
      renderInputToolbar={renderInputToolbar}
      messagesContainerStyle={{backgroundColor: 'indigo'}}
      parsePatterns={linkStyle => [
        {
          pattern: /#(\w+)/,
          style: linkStyle,
          onPress: (tag: string) => {
            console.log(`Pressed on hashtag: ${tag}`);
          },
        },
      ]}
    />
  );
};

export default ChatComponent;
