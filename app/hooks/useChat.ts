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
  date: any;
};

export const useChat = ({
  senderName,
  eventChatId,
}: {
  senderName: string;
  eventChatId: string;
}) => {
  const sendMessage = useSendMessage({eventChatId});
  const {data, loading, fetchMore} = useMessages({
    senderName,
    eventChatId,
  });

  const [chatMessages, setChatMessages] = useState<GetMessagesType[]>(
    [] as GetMessagesType[],
  );

  const prepareMessagesCallback = useCallback(() => {
    if (data) {
      setChatMessages([...data?.getMessage].reverse());
    }
  }, [data]);

  useEffect(() => {
    prepareMessagesCallback();
    console.log('data', data);
  }, [data]);

  return {chatMessages, data, loading, fetchMore, sendMessage};
};
