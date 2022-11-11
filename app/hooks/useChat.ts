import {useMessages, useSendMessage} from '../graphql/cache/Messages';
import React, {useEffect, useState, useCallback} from 'react';

/**
 * useChat is a custom hook that returns the messages and a function to send a message
 * with support statfull react lifecycle hooks.
 */
export type GetMessagesType = {
  __typename?: 'Message';
  id: string;
  senderName?: string | null;
  message?: string | null;
  date: string;
};

export const useChat = ({
  senderName,
  eventChatId,
}: {
  senderName: string;
  eventChatId: string;
}) => {
  const sendMessage = useSendMessage({eventChatId});
  // const sendMessage = () => {
  //   sendMessage({senderName, message: 'Hello World'});

  //   setChatMessages([...data?.getMessage].reverse());
  // };
  const {data, loading, fetchMore} = useMessages({
    senderName,
    eventChatId,
  });

  const [chatMessages, setChatMessages] = useState<GetMessagesType[]>(
    [] as GetMessagesType[],
  );
  const [isStopFetchMore, setStopFetchMore] = useState(false);

  const prepareMessagesCallback = useCallback(() => {
    if (data) {
      // const formattedData = data.getMessage.map((item: GetMessagesType) => {
      //   return {

      //   };
      // });
      setChatMessages([...data?.getMessage]);
    }
  }, [data]);

  useEffect(() => {
    prepareMessagesCallback();
    console.log('data', data);
  }, [data]);

  return {chatMessages, data, loading, fetchMore, sendMessage};
};
