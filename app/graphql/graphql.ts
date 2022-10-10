import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type GetMessageInput = {
  eventChatId: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID'];
  date: Scalars['DateTime'];
  message?: Maybe<Scalars['String']>;
  senderName?: Maybe<Scalars['String']>;
  sender_id?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  saveMessage: Message;
};


export type MutationSaveMessageArgs = {
  saveMessageData: SaveMessageInput;
};

export type Query = {
  __typename?: 'Query';
  getMessage: Array<Message>;
};


export type QueryGetMessageArgs = {
  getMessageInput: GetMessageInput;
};

export type SaveMessageInput = {
  eventChatId?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  senderName: Scalars['String'];
};

export type SubscripionInput = {
  eventChatId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: Message;
};


export type SubscriptionMessageAddedArgs = {
  subsciptionInput: SubscripionInput;
};

export type MessagesQueryVariables = Exact<{
  input: GetMessageInput;
}>;


export type MessagesQuery = { __typename?: 'Query', getMessage: Array<{ __typename?: 'Message', senderName?: string | null, message?: string | null, date: any }> };

export type SaveMessageMutationVariables = Exact<{
  input: SaveMessageInput;
}>;


export type SaveMessageMutation = { __typename?: 'Mutation', saveMessage: { __typename?: 'Message', senderName?: string | null, message?: string | null, date: any } };

export type MessageSubscriptionVariables = Exact<{
  input: SubscripionInput;
}>;


export type MessageSubscription = { __typename?: 'Subscription', messageAdded: { __typename?: 'Message', senderName?: string | null, message?: string | null, date: any } };


export const MessagesDocument = gql`
    query Messages($input: GetMessageInput!) {
  getMessage(getMessageInput: $input) {
    senderName
    message
    date
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const SaveMessageDocument = gql`
    mutation saveMessage($input: SaveMessageInput!) {
  saveMessage(saveMessageData: $input) {
    senderName
    message
    date
  }
}
    `;
export type SaveMessageMutationFn = Apollo.MutationFunction<SaveMessageMutation, SaveMessageMutationVariables>;

/**
 * __useSaveMessageMutation__
 *
 * To run a mutation, you first call `useSaveMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveMessageMutation, { data, loading, error }] = useSaveMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveMessageMutation(baseOptions?: Apollo.MutationHookOptions<SaveMessageMutation, SaveMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveMessageMutation, SaveMessageMutationVariables>(SaveMessageDocument, options);
      }
export type SaveMessageMutationHookResult = ReturnType<typeof useSaveMessageMutation>;
export type SaveMessageMutationResult = Apollo.MutationResult<SaveMessageMutation>;
export type SaveMessageMutationOptions = Apollo.BaseMutationOptions<SaveMessageMutation, SaveMessageMutationVariables>;
export const MessageDocument = gql`
    subscription Message($input: SubscripionInput!) {
  messageAdded(subsciptionInput: $input) {
    senderName
    message
    date
  }
}
    `;

/**
 * __useMessageSubscription__
 *
 * To run a query within a React component, call `useMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSubscription({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageSubscription, MessageSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageSubscription, MessageSubscriptionVariables>(MessageDocument, options);
      }
export type MessageSubscriptionHookResult = ReturnType<typeof useMessageSubscription>;
export type MessageSubscriptionResult = Apollo.SubscriptionResult<MessageSubscription>;