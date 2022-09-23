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
} from '../generated';

export const useMessages = ({senderName}: {senderName: string}) => {
  const [isStopFetchMore, setStopFetchMore] = React.useState(false);
  const {
    data,
    fetchMore: fetchMoreMessages,
    loading,
    subscribeToMore,
    ...other
  } = useMessagesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {input: {offset: 0, limit: 20}},
  });

  React.useEffect(() => {
    if (!data) {
      subscribeToMore<MessageSubscriptionType>({
        document: MessageSubscription,
        updateQuery: (prev, {subscriptionData}) => {
          if (!subscriptionData) {
            return prev;
          }
          const newMessage = subscriptionData.data.messageAdded;
          if (senderName === newMessage.senderName) {
            return prev;
          }

          return {
            getMessage: [newMessage, ...prev.getMessage],
          };
        },
      });
    }
  }, [subscribeToMore]);

  const fetchMoreAndUpdateCache = React.useMemo(() => {
    return async (offset: number) => {
      console.log('offsrt in fetchmore' + offset);
      await fetchMoreMessages({
        variables: {input: {offset, limit: 20}},
        updateQuery: (prev, {fetchMoreResult}) => {
          if (!fetchMoreResult) {
            return prev;
          }

          const moreItems = fetchMoreResult.getMessage;
          if (moreItems.length < 1) {
            setStopFetchMore(true);
          }

          return {getMessage: [...prev.getMessage, ...moreItems]};
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

export const useSendMessage = () => {
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
          },
        },
        optimisticResponse,
        update(client, {data}) {
          try {
            const q = client.readQuery<
              MessagesQuery,
              {input: {offset: number; limit: number}}
            >({
              query: GetMessagesQuery,
              variables: {input: {offset: 0, limit: 20}},
            });
            console.log('in mutate' + q?.getMessage);

            if (!q?.getMessage) {
              return;
            }

            const _message = data?.saveMessage;
            if (!_message) {
              return;
            }
            client.writeQuery<MessagesQuery>({
              query: GetMessagesQuery,
              // variables: { input: { offset: 0, limit: 20 } },
              data: {
                getMessage: [...q?.getMessage, _message],
              },
            });
          } catch (err) {
            console.log('thisiserr' + err);
          }
        },
      }).catch(err => {
        // UNauthorized should get new
        console.log('thisiserr' + err);
      });
    },
    [],
  );

  return sendMessage;
};
