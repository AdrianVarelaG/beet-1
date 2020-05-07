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

export enum IReceiptStatus {
  InProgress = 'IN_PROGRESS',
  Generating = 'GENERATING',
  Done = 'DONE',
  Error = 'ERROR'
}

export type IReceiptConnection = {
   __typename?: 'ReceiptConnection';
  cursor: Scalars['String'];
  hasMore: Scalars['Boolean'];
  receipts: Array<Maybe<IReceipt>>;
};

export type IMutationResponse = {
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type IMutationReceiptResponse = IMutationResponse & {
   __typename?: 'MutationReceiptResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  receipt?: Maybe<IReceipt>;
};

export type IFile = {
   __typename?: 'File';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type IQuery = {
   __typename?: 'Query';
  receipts: Array<Maybe<IReceipt>>;
  receipt?: Maybe<IMutationReceiptResponse>;
};


export type IQueryReceiptsArgs = {
  filter?: Maybe<Scalars['String']>;
};


export type IQueryReceiptArgs = {
  id: Scalars['ID'];
};

export type IMutation = {
   __typename?: 'Mutation';
  createReceipt: IMutationReceiptResponse;
};


export type IMutationCreateReceiptArgs = {
  file: Scalars['Upload'];
};

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

export type IReceiptDataListFragment = (
  { __typename?: 'Receipt' }
  & Pick<IReceipt, 'id' | 'business' | 'createdDate' | 'amount' | 'status' | 'date'>
);

export type IReceiptsListFragment = (
  { __typename?: 'Query' }
  & { receipts: Array<Maybe<(
    { __typename?: 'Receipt' }
    & { ticket?: Maybe<(
      { __typename?: 'Ticket' }
      & Pick<ITicket, 'url'>
    )> }
    & IReceiptDataListFragment
  )>> }
);

export type IReceiptListQueryVariables = {
  filter?: Maybe<Scalars['String']>;
};


export type IReceiptListQuery = (
  { __typename?: 'Query' }
  & IReceiptsListFragment
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
export const ReceiptsListFragmentDoc = gql`
    fragment ReceiptsList on Query {
  receipts(filter: $filter) {
    ...ReceiptDataList
    ticket {
      url
    }
  }
}
    ${ReceiptDataListFragmentDoc}`;
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
export const ReceiptListDocument = gql`
    query ReceiptList($filter: String) {
  ...ReceiptsList
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
 *      filter: // value for 'filter'
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