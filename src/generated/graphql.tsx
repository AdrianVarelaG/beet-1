import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '../hooks/apollo';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A currency string, such as $21.25 */
  MXCurrency: any;
  Upload: any;
};

export type IConfiguration = {
   __typename?: 'Configuration';
  invoiceProfile?: Maybe<IInvoiceProfile>;
  notification?: Maybe<IConfigNotification>;
};

export type IConfigNotification = {
   __typename?: 'ConfigNotification';
  invoiceResult: Scalars['Boolean'];
};

export type IInvoiceProfile = {
   __typename?: 'InvoiceProfile';
  rfc: Scalars['String'];
  razonSocial: Scalars['String'];
  direccion?: Maybe<IAddress>;
};

export type IInputAdress = {
  calle?: Maybe<Scalars['String']>;
  numeroExterior?: Maybe<Scalars['String']>;
  numeroInterior?: Maybe<Scalars['String']>;
  colonia?: Maybe<Scalars['String']>;
  codigoPostal?: Maybe<Scalars['String']>;
};

export type IInvoiceProfileInput = {
  rfc: Scalars['String'];
  razonSocial: Scalars['String'];
  direccion?: Maybe<IInputAdress>;
};

export type IAddress = {
   __typename?: 'Address';
  calle?: Maybe<Scalars['String']>;
  numeroExterior?: Maybe<Scalars['String']>;
  numeroInterior?: Maybe<Scalars['String']>;
  colonia?: Maybe<Scalars['String']>;
  codigoPostal?: Maybe<Scalars['String']>;
};

export type IMutationConfigNotification = IMutationResponse & {
   __typename?: 'MutationConfigNotification';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  notification?: Maybe<IConfigNotification>;
};

export type IMutationInvoiceProfile = IMutationResponse & {
   __typename?: 'MutationInvoiceProfile';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  invoiceProfile?: Maybe<IInvoiceProfile>;
};

export type IQuery = {
   __typename?: 'Query';
  configuration?: Maybe<IConfiguration>;
  notifications: INotificationResponse;
  notification: INotificationResponse;
  unreadNotifications: Scalars['Int'];
  receipts: IReceiptResponse;
  receipt?: Maybe<IReceipt>;
};


export type IQueryNotificationsArgs = {
  input?: Maybe<INotificationFilter>;
};


export type IQueryNotificationArgs = {
  input: Scalars['ID'];
};


export type IQueryReceiptsArgs = {
  input?: Maybe<IReceiptFilter>;
};


export type IQueryReceiptArgs = {
  id: Scalars['ID'];
};

export type IMutation = {
   __typename?: 'Mutation';
  updateNotificationInvoiceResult?: Maybe<IMutationConfigNotification>;
  updateInvoiceProfile?: Maybe<IMutationInvoiceProfile>;
  readNotification: IMutationReadNotification;
  createReceipt: IMutationReceiptResponse;
};


export type IMutationUpdateNotificationInvoiceResultArgs = {
  input: Scalars['Boolean'];
};


export type IMutationUpdateInvoiceProfileArgs = {
  input: IInvoiceProfileInput;
};


export type IMutationReadNotificationArgs = {
  input: Scalars['ID'];
};


export type IMutationCreateReceiptArgs = {
  file: Scalars['Upload'];
};

export type INotification = {
   __typename?: 'Notification';
  id: Scalars['ID'];
  title: Scalars['String'];
  message: Scalars['String'];
  date: Scalars['String'];
  read: Scalars['Boolean'];
  receipt?: Maybe<IReceipt>;
};

export type INotificationResponse = IResponse & {
   __typename?: 'NotificationResponse';
  totalCount: Scalars['Int'];
  notifications: Array<Maybe<INotification>>;
};

export type IMutationReadNotification = IMutationResponse & {
   __typename?: 'MutationReadNotification';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  notification?: Maybe<INotification>;
};

export type INotificationFilter = {
  receiptId?: Maybe<Scalars['ID']>;
  read?: Maybe<Scalars['Boolean']>;
};

export type IReceipt = {
   __typename?: 'Receipt';
  id: Scalars['ID'];
  business?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['MXCurrency']>;
  createdAt: Scalars['String'];
  createdDate: Scalars['String'];
  ticket?: Maybe<ITicket>;
  invoice?: Maybe<IInvoice>;
  status: IReceiptStatus;
};

export type IInvoice = {
   __typename?: 'Invoice';
  xml: Scalars['String'];
  pdf: Scalars['String'];
};

export type ITicket = {
   __typename?: 'Ticket';
  url: Scalars['String'];
};

export enum IResponsable {
  User = 'USER',
  System = 'SYSTEM'
}

export enum IReceiptStatus {
  InProgress = 'IN_PROGRESS',
  Generating = 'GENERATING',
  Done = 'DONE',
  Error = 'ERROR'
}

export type IReceiptFilter = {
  text?: Maybe<Scalars['String']>;
  status?: Maybe<Array<Maybe<IReceiptStatus>>>;
};

export type IReceiptResponse = IResponse & {
   __typename?: 'ReceiptResponse';
  totalCount: Scalars['Int'];
  receipts: Array<Maybe<IReceipt>>;
};

export type IMutationReceiptResponse = IMutationResponse & {
   __typename?: 'MutationReceiptResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  receipt?: Maybe<IReceipt>;
};



export type IMutationResponse = {
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type IResponse = {
  totalCount: Scalars['Int'];
};

export type INotificationDataListFragment = (
  { __typename?: 'Notification' }
  & Pick<INotification, 'id' | 'title' | 'message' | 'read' | 'date'>
);

export type INotificationInfoFragment = (
  { __typename?: 'Notification' }
  & Pick<INotification, 'title' | 'message' | 'date'>
  & { receipt?: Maybe<(
    { __typename?: 'Receipt' }
    & IReceiptDataListFragment
  )> }
);

export type INotificationListFragment = (
  { __typename?: 'NotificationResponse' }
  & Pick<INotificationResponse, 'totalCount'>
  & { notifications: Array<Maybe<(
    { __typename?: 'Notification' }
    & INotificationDataListFragment
  )>> }
);

export type IReceiptDataListFragment = (
  { __typename?: 'Receipt' }
  & Pick<IReceipt, 'id' | 'business' | 'createdDate' | 'amount' | 'status' | 'date'>
);

export type IReceiptsListFragment = (
  { __typename?: 'ReceiptResponse' }
  & { receipts: Array<Maybe<(
    { __typename?: 'Receipt' }
    & IReceiptDataListFragment
  )>> }
);

export type IInvoiceProfileInfoFragment = (
  { __typename?: 'InvoiceProfile' }
  & Pick<IInvoiceProfile, 'rfc' | 'razonSocial'>
  & { direccion?: Maybe<(
    { __typename?: 'Address' }
    & Pick<IAddress, 'calle' | 'numeroExterior' | 'numeroInterior' | 'colonia' | 'codigoPostal'>
  )> }
);

export type IGetUnReadNotificationNumberQueryVariables = {};


export type IGetUnReadNotificationNumberQuery = (
  { __typename?: 'Query' }
  & Pick<IQuery, 'unreadNotifications'>
);

export type IReadNotificationMutationVariables = {
  input: Scalars['ID'];
};


export type IReadNotificationMutation = (
  { __typename?: 'Mutation' }
  & { readNotification: (
    { __typename?: 'MutationReadNotification' }
    & Pick<IMutationReadNotification, 'success'>
  ) }
);

export type IGetNotificationQueryVariables = {
  input: Scalars['ID'];
};


export type IGetNotificationQuery = (
  { __typename?: 'Query' }
  & { notification: (
    { __typename?: 'NotificationResponse' }
    & Pick<INotificationResponse, 'totalCount'>
    & { notifications: Array<Maybe<(
      { __typename?: 'Notification' }
      & Pick<INotification, 'id' | 'read'>
      & INotificationInfoFragment
    )>> }
  ) }
);

export type IGetMessagesQueryVariables = {};


export type IGetMessagesQuery = (
  { __typename?: 'Query' }
  & { notifications: (
    { __typename?: 'NotificationResponse' }
    & INotificationListFragment
  ) }
);

export type IReceiptListQueryVariables = {
  input?: Maybe<IReceiptFilter>;
};


export type IReceiptListQuery = (
  { __typename?: 'Query' }
  & { receipts: (
    { __typename?: 'ReceiptResponse' }
    & IReceiptsListFragment
  ) }
);

export type IUploadFileMutationVariables = {
  file: Scalars['Upload'];
};


export type IUploadFileMutation = (
  { __typename?: 'Mutation' }
  & { createReceipt: (
    { __typename?: 'MutationReceiptResponse' }
    & Pick<IMutationReceiptResponse, 'success'>
    & { receipt?: Maybe<(
      { __typename?: 'Receipt' }
      & IReceiptDataListFragment
    )> }
  ) }
);

export type IGetInvoiceProfileQueryVariables = {};


export type IGetInvoiceProfileQuery = (
  { __typename?: 'Query' }
  & { configuration?: Maybe<(
    { __typename?: 'Configuration' }
    & { invoiceProfile?: Maybe<(
      { __typename?: 'InvoiceProfile' }
      & IInvoiceProfileInfoFragment
    )> }
  )> }
);

export type IReceiptCountQueryVariables = {
  input?: Maybe<IReceiptFilter>;
};


export type IReceiptCountQuery = (
  { __typename?: 'Query' }
  & { receipts: (
    { __typename?: 'ReceiptResponse' }
    & Pick<IReceiptResponse, 'totalCount'>
  ) }
);

export type ISetInvoiceProfileMutationVariables = {
  input: IInvoiceProfileInput;
};


export type ISetInvoiceProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateInvoiceProfile?: Maybe<(
    { __typename?: 'MutationInvoiceProfile' }
    & Pick<IMutationInvoiceProfile, 'success'>
    & { invoiceProfile?: Maybe<(
      { __typename?: 'InvoiceProfile' }
      & Pick<IInvoiceProfile, 'rfc'>
    )> }
  )> }
);

export type IGetMenuConfigQueryVariables = {};


export type IGetMenuConfigQuery = (
  { __typename?: 'Query' }
  & { configuration?: Maybe<(
    { __typename?: 'Configuration' }
    & { notification?: Maybe<(
      { __typename?: 'ConfigNotification' }
      & Pick<IConfigNotification, 'invoiceResult'>
    )>, invoiceProfile?: Maybe<(
      { __typename?: 'InvoiceProfile' }
      & Pick<IInvoiceProfile, 'rfc'>
    )> }
  )> }
);

export type IUpdateInvoiceResultNotificationMutationVariables = {
  input: Scalars['Boolean'];
};


export type IUpdateInvoiceResultNotificationMutation = (
  { __typename?: 'Mutation' }
  & { updateNotificationInvoiceResult?: Maybe<(
    { __typename?: 'MutationConfigNotification' }
    & Pick<IMutationConfigNotification, 'success'>
    & { notification?: Maybe<(
      { __typename?: 'ConfigNotification' }
      & Pick<IConfigNotification, 'invoiceResult'>
    )> }
  )> }
);

export const ReceiptDataListFragmentDoc = gql`
    fragment ReceiptDataList on Receipt {
  id
  business
  createdDate
  amount
  status
  date
}
    `;
export const NotificationInfoFragmentDoc = gql`
    fragment NotificationInfo on Notification {
  title
  message
  date
  receipt {
    ...ReceiptDataList
  }
}
    ${ReceiptDataListFragmentDoc}`;
export const NotificationDataListFragmentDoc = gql`
    fragment NotificationDataList on Notification {
  id
  title
  message
  read
  date
}
    `;
export const NotificationListFragmentDoc = gql`
    fragment NotificationList on NotificationResponse {
  totalCount
  notifications {
    ...NotificationDataList
  }
}
    ${NotificationDataListFragmentDoc}`;
export const ReceiptsListFragmentDoc = gql`
    fragment ReceiptsList on ReceiptResponse {
  receipts {
    ...ReceiptDataList
  }
}
    ${ReceiptDataListFragmentDoc}`;
export const InvoiceProfileInfoFragmentDoc = gql`
    fragment InvoiceProfileInfo on InvoiceProfile {
  rfc
  razonSocial
  direccion {
    calle
    numeroExterior
    numeroInterior
    colonia
    codigoPostal
  }
}
    `;
export const GetUnReadNotificationNumberDocument = gql`
    query getUnReadNotificationNumber {
  unreadNotifications
}
    `;

/**
 * __useGetUnReadNotificationNumberQuery__
 *
 * To run a query within a React component, call `useGetUnReadNotificationNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnReadNotificationNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnReadNotificationNumberQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnReadNotificationNumberQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IGetUnReadNotificationNumberQuery, IGetUnReadNotificationNumberQueryVariables>) {
        return ApolloReactHooks.useQuery<IGetUnReadNotificationNumberQuery, IGetUnReadNotificationNumberQueryVariables>(GetUnReadNotificationNumberDocument, baseOptions);
      }
export function useGetUnReadNotificationNumberLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IGetUnReadNotificationNumberQuery, IGetUnReadNotificationNumberQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IGetUnReadNotificationNumberQuery, IGetUnReadNotificationNumberQueryVariables>(GetUnReadNotificationNumberDocument, baseOptions);
        }
export type GetUnReadNotificationNumberQueryHookResult = ReturnType<typeof useGetUnReadNotificationNumberQuery>;
export type GetUnReadNotificationNumberLazyQueryHookResult = ReturnType<typeof useGetUnReadNotificationNumberLazyQuery>;
export type GetUnReadNotificationNumberQueryResult = ApolloReactCommon.QueryResult<IGetUnReadNotificationNumberQuery, IGetUnReadNotificationNumberQueryVariables>;
export const ReadNotificationDocument = gql`
    mutation readNotification($input: ID!) {
  readNotification(input: $input) {
    success
  }
}
    `;
export type IReadNotificationMutationFn = ApolloReactCommon.MutationFunction<IReadNotificationMutation, IReadNotificationMutationVariables>;

/**
 * __useReadNotificationMutation__
 *
 * To run a mutation, you first call `useReadNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readNotificationMutation, { data, loading, error }] = useReadNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReadNotificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<IReadNotificationMutation, IReadNotificationMutationVariables>) {
        return ApolloReactHooks.useMutation<IReadNotificationMutation, IReadNotificationMutationVariables>(ReadNotificationDocument, baseOptions);
      }
export type ReadNotificationMutationHookResult = ReturnType<typeof useReadNotificationMutation>;
export type ReadNotificationMutationResult = ApolloReactCommon.MutationResult<IReadNotificationMutation>;
export type ReadNotificationMutationOptions = ApolloReactCommon.BaseMutationOptions<IReadNotificationMutation, IReadNotificationMutationVariables>;
export const GetNotificationDocument = gql`
    query getNotification($input: ID!) {
  notification(input: $input) {
    totalCount
    notifications {
      id
      read
      ...NotificationInfo
    }
  }
}
    ${NotificationInfoFragmentDoc}`;

/**
 * __useGetNotificationQuery__
 *
 * To run a query within a React component, call `useGetNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetNotificationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IGetNotificationQuery, IGetNotificationQueryVariables>) {
        return ApolloReactHooks.useQuery<IGetNotificationQuery, IGetNotificationQueryVariables>(GetNotificationDocument, baseOptions);
      }
export function useGetNotificationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IGetNotificationQuery, IGetNotificationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IGetNotificationQuery, IGetNotificationQueryVariables>(GetNotificationDocument, baseOptions);
        }
export type GetNotificationQueryHookResult = ReturnType<typeof useGetNotificationQuery>;
export type GetNotificationLazyQueryHookResult = ReturnType<typeof useGetNotificationLazyQuery>;
export type GetNotificationQueryResult = ApolloReactCommon.QueryResult<IGetNotificationQuery, IGetNotificationQueryVariables>;
export const GetMessagesDocument = gql`
    query getMessages {
  notifications {
    ...NotificationList
  }
}
    ${NotificationListFragmentDoc}`;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IGetMessagesQuery, IGetMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<IGetMessagesQuery, IGetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
      }
export function useGetMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IGetMessagesQuery, IGetMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IGetMessagesQuery, IGetMessagesQueryVariables>(GetMessagesDocument, baseOptions);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = ApolloReactCommon.QueryResult<IGetMessagesQuery, IGetMessagesQueryVariables>;
export const ReceiptListDocument = gql`
    query ReceiptList($input: ReceiptFilter) {
  receipts(input: $input) {
    ...ReceiptsList
  }
}
    ${ReceiptsListFragmentDoc}`;

/**
 * __useReceiptListQuery__
 *
 * To run a query within a React component, call `useReceiptListQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceiptListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceiptListQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReceiptListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IReceiptListQuery, IReceiptListQueryVariables>) {
        return ApolloReactHooks.useQuery<IReceiptListQuery, IReceiptListQueryVariables>(ReceiptListDocument, baseOptions);
      }
export function useReceiptListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IReceiptListQuery, IReceiptListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IReceiptListQuery, IReceiptListQueryVariables>(ReceiptListDocument, baseOptions);
        }
export type ReceiptListQueryHookResult = ReturnType<typeof useReceiptListQuery>;
export type ReceiptListLazyQueryHookResult = ReturnType<typeof useReceiptListLazyQuery>;
export type ReceiptListQueryResult = ApolloReactCommon.QueryResult<IReceiptListQuery, IReceiptListQueryVariables>;
export const UploadFileDocument = gql`
    mutation uploadFile($file: Upload!) {
  createReceipt(file: $file) {
    success
    receipt {
      ...ReceiptDataList
    }
  }
}
    ${ReceiptDataListFragmentDoc}`;
export type IUploadFileMutationFn = ApolloReactCommon.MutationFunction<IUploadFileMutation, IUploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<IUploadFileMutation, IUploadFileMutationVariables>) {
        return ApolloReactHooks.useMutation<IUploadFileMutation, IUploadFileMutationVariables>(UploadFileDocument, baseOptions);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = ApolloReactCommon.MutationResult<IUploadFileMutation>;
export type UploadFileMutationOptions = ApolloReactCommon.BaseMutationOptions<IUploadFileMutation, IUploadFileMutationVariables>;
export const GetInvoiceProfileDocument = gql`
    query getInvoiceProfile {
  configuration {
    invoiceProfile {
      ...InvoiceProfileInfo
    }
  }
}
    ${InvoiceProfileInfoFragmentDoc}`;

/**
 * __useGetInvoiceProfileQuery__
 *
 * To run a query within a React component, call `useGetInvoiceProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInvoiceProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IGetInvoiceProfileQuery, IGetInvoiceProfileQueryVariables>) {
        return ApolloReactHooks.useQuery<IGetInvoiceProfileQuery, IGetInvoiceProfileQueryVariables>(GetInvoiceProfileDocument, baseOptions);
      }
export function useGetInvoiceProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IGetInvoiceProfileQuery, IGetInvoiceProfileQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IGetInvoiceProfileQuery, IGetInvoiceProfileQueryVariables>(GetInvoiceProfileDocument, baseOptions);
        }
export type GetInvoiceProfileQueryHookResult = ReturnType<typeof useGetInvoiceProfileQuery>;
export type GetInvoiceProfileLazyQueryHookResult = ReturnType<typeof useGetInvoiceProfileLazyQuery>;
export type GetInvoiceProfileQueryResult = ApolloReactCommon.QueryResult<IGetInvoiceProfileQuery, IGetInvoiceProfileQueryVariables>;
export const ReceiptCountDocument = gql`
    query ReceiptCount($input: ReceiptFilter) {
  receipts(input: $input) {
    totalCount
  }
}
    `;

/**
 * __useReceiptCountQuery__
 *
 * To run a query within a React component, call `useReceiptCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceiptCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceiptCountQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReceiptCountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IReceiptCountQuery, IReceiptCountQueryVariables>) {
        return ApolloReactHooks.useQuery<IReceiptCountQuery, IReceiptCountQueryVariables>(ReceiptCountDocument, baseOptions);
      }
export function useReceiptCountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IReceiptCountQuery, IReceiptCountQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IReceiptCountQuery, IReceiptCountQueryVariables>(ReceiptCountDocument, baseOptions);
        }
export type ReceiptCountQueryHookResult = ReturnType<typeof useReceiptCountQuery>;
export type ReceiptCountLazyQueryHookResult = ReturnType<typeof useReceiptCountLazyQuery>;
export type ReceiptCountQueryResult = ApolloReactCommon.QueryResult<IReceiptCountQuery, IReceiptCountQueryVariables>;
export const SetInvoiceProfileDocument = gql`
    mutation setInvoiceProfile($input: InvoiceProfileInput!) {
  updateInvoiceProfile(input: $input) {
    success
    invoiceProfile {
      rfc
    }
  }
}
    `;
export type ISetInvoiceProfileMutationFn = ApolloReactCommon.MutationFunction<ISetInvoiceProfileMutation, ISetInvoiceProfileMutationVariables>;

/**
 * __useSetInvoiceProfileMutation__
 *
 * To run a mutation, you first call `useSetInvoiceProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetInvoiceProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setInvoiceProfileMutation, { data, loading, error }] = useSetInvoiceProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetInvoiceProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ISetInvoiceProfileMutation, ISetInvoiceProfileMutationVariables>) {
        return ApolloReactHooks.useMutation<ISetInvoiceProfileMutation, ISetInvoiceProfileMutationVariables>(SetInvoiceProfileDocument, baseOptions);
      }
export type SetInvoiceProfileMutationHookResult = ReturnType<typeof useSetInvoiceProfileMutation>;
export type SetInvoiceProfileMutationResult = ApolloReactCommon.MutationResult<ISetInvoiceProfileMutation>;
export type SetInvoiceProfileMutationOptions = ApolloReactCommon.BaseMutationOptions<ISetInvoiceProfileMutation, ISetInvoiceProfileMutationVariables>;
export const GetMenuConfigDocument = gql`
    query getMenuConfig {
  configuration {
    notification {
      invoiceResult
    }
    invoiceProfile {
      rfc
    }
  }
}
    `;

/**
 * __useGetMenuConfigQuery__
 *
 * To run a query within a React component, call `useGetMenuConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenuConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenuConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMenuConfigQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IGetMenuConfigQuery, IGetMenuConfigQueryVariables>) {
        return ApolloReactHooks.useQuery<IGetMenuConfigQuery, IGetMenuConfigQueryVariables>(GetMenuConfigDocument, baseOptions);
      }
export function useGetMenuConfigLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IGetMenuConfigQuery, IGetMenuConfigQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IGetMenuConfigQuery, IGetMenuConfigQueryVariables>(GetMenuConfigDocument, baseOptions);
        }
export type GetMenuConfigQueryHookResult = ReturnType<typeof useGetMenuConfigQuery>;
export type GetMenuConfigLazyQueryHookResult = ReturnType<typeof useGetMenuConfigLazyQuery>;
export type GetMenuConfigQueryResult = ApolloReactCommon.QueryResult<IGetMenuConfigQuery, IGetMenuConfigQueryVariables>;
export const UpdateInvoiceResultNotificationDocument = gql`
    mutation updateInvoiceResultNotification($input: Boolean!) {
  updateNotificationInvoiceResult(input: $input) {
    success
    notification {
      invoiceResult
    }
  }
}
    `;
export type IUpdateInvoiceResultNotificationMutationFn = ApolloReactCommon.MutationFunction<IUpdateInvoiceResultNotificationMutation, IUpdateInvoiceResultNotificationMutationVariables>;

/**
 * __useUpdateInvoiceResultNotificationMutation__
 *
 * To run a mutation, you first call `useUpdateInvoiceResultNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInvoiceResultNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInvoiceResultNotificationMutation, { data, loading, error }] = useUpdateInvoiceResultNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateInvoiceResultNotificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<IUpdateInvoiceResultNotificationMutation, IUpdateInvoiceResultNotificationMutationVariables>) {
        return ApolloReactHooks.useMutation<IUpdateInvoiceResultNotificationMutation, IUpdateInvoiceResultNotificationMutationVariables>(UpdateInvoiceResultNotificationDocument, baseOptions);
      }
export type UpdateInvoiceResultNotificationMutationHookResult = ReturnType<typeof useUpdateInvoiceResultNotificationMutation>;
export type UpdateInvoiceResultNotificationMutationResult = ApolloReactCommon.MutationResult<IUpdateInvoiceResultNotificationMutation>;
export type UpdateInvoiceResultNotificationMutationOptions = ApolloReactCommon.BaseMutationOptions<IUpdateInvoiceResultNotificationMutation, IUpdateInvoiceResultNotificationMutationVariables>;