import * as React from 'react';

import {MessageSubscription, GetMessagesQuery} from '../queries/Messages';
import {
  useMessagesQuery,
  useSaveMessageMutation,
  SaveMessageInput,
  SaveMessageMutation,
  MessagesQuery,
  GetMessageInput,
  MessageSubscription as MessageSubscriptionType,
  QueryGetMessageArgs,
  SubscripionInput,
} from '../graphql';

export const useMessages = ({
  senderName,
  eventChatId,
}: {
  senderName: string;
  eventChatId: string;
}) => {
  const [isStopFetchMore, setStopFetchMore] = React.useState(false);
  const {
    data,
    fetchMore: fetchMoreMessages,
    loading,
    subscribeToMore,
    ...other
  } = useMessagesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {input: {offset: 0, limit: 20, eventChatId: eventChatId}},
  });

  React.useEffect(() => {
    if (!data) {
      subscribeToMore<MessageSubscriptionType, {input: SubscripionInput}>({
        document: MessageSubscription,
        variables: {input: {eventChatId: eventChatId}},
        updateQuery: (prev, {subscriptionData}) => {
          if (!subscriptionData) {
            return prev;
          }
          const newMessage = subscriptionData.data.messageAdded;
          // if (senderName === newMessage.senderName) {
          //   return prev;
          // }

          return {
            getMessage: [
              newMessage,
              ...(prev.getMessage as {
                __typename?: 'Message';
                id: string;
                senderName?: string | null;
                message?: string | null;
                date: any;
              }[]),
            ],
          };
        },
      });
    }
    console.log('effeft in useMessages');
  }, [subscribeToMore]);

  const fetchMoreAndUpdateCache = React.useMemo(() => {
    return async (offset: number) => {
      console.log('offsrt in fetchmore' + offset);
      await fetchMoreMessages({
        variables: {input: {offset, limit: 20, eventChatId: eventChatId}},
        updateQuery: (prev, {fetchMoreResult}) => {
          if (!fetchMoreResult) {
            return prev;
          }

          const moreItems = fetchMoreResult.getMessage;
          if (moreItems.length < 1) {
            setStopFetchMore(true);
          }

          return {
            getMessage: [
              ...(prev.getMessage as {
                __typename?: 'Message';
                id: string;
                senderName?: string | null;
                message?: string | null;
                date: any;
              }[]),
              ...(moreItems as {
                __typename?: 'Message';
                id: string;
                senderName?: string | null;
                message?: string | null;
                date: any;
              }[]),
            ],
          };
        },
      });
    };
  }, []);

  const fetchMore = React.useCallback(() => {
    if (!data || loading || isStopFetchMore) {
      return;
    }

    const offset = data.getMessage.length;
    console.log('offset: ' + offset);
    if (offset >= 20) {
      fetchMoreAndUpdateCache(offset);
    }
  }, [isStopFetchMore, loading, data]);

  return {...other, data, fetchMore, loading};
};

export const useSendMessage = ({eventChatId}: {eventChatId: string}) => {
  const [mutate] = useSaveMessageMutation();

  const sendMessage = React.useCallback(
    async ({senderName, message}: SaveMessageInput) => {
      const optimisticResponse: SaveMessageMutation = {
        saveMessage: {
          __typename: 'Message',
          //   _id: UUID(),
          //   sender_id,
          senderName,
          date: +new Date(),
          message,
        },
      };

      await mutate({
        variables: {
          input: {
            // sender_id,
            senderName,
            message,
            eventChatId,
          },
        },
        optimisticResponse,
        //   update(client, {data}) {
        //     try {
        //       const q = client.readQuery<
        //         MessagesQuery,
        //         {input: {offset: number; limit: number; eventChatId: string}}
        //       >({
        //         query: GetMessagesQuery,
        //         variables: {input: {offset: 0, limit: 20, eventChatId}},
        //       });
        //       console.log('in mutate' + q?.getMessage);

        //       if (!q?.getMessage) {
        //         console.log('in mutate if');
        //         return;
        //       }

        //       const _message = data?.saveMessage;
        //       console.log('in mutate' + _message);
        //       if (!_message) {
        //         return;
        //       }
        //       client.writeQuery<MessagesQuery>({
        //         query: GetMessagesQuery,
        //         variables: {input: {offset: 0, limit: 20, eventChatId}},
        //         data: {
        //           getMessage: [...q?.getMessage, _message],
        //         },
        //       });
        //     } catch (err) {
        //       console.log('thisiserr' + err);
        //     }
        //   },
        // }).catch(err => {
        //   // UNauthorized should get new
        //   console.log('thisiserr' + err);
      });
    },
    [],
  );

  return sendMessage;
};
