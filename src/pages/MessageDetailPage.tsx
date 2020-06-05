import React, { useEffect } from "react";
import { useParams } from "react-router";
import {
  IonContent,
} from "@ionic/react";
import gql from "graphql-tag";
import { DocumentNode } from "graphql";
import {
  useReadNotificationMutation,
  useGetNotificationQuery,
} from "../generated/graphql";
import MessageDetail from "../components/Messages/MessageDetail";
import MessageLoading from "../components/Loading/MessageLoading";

const MessageDetailPage: React.FC & {
  mutation: DocumentNode;
  query: DocumentNode;
} = () => {
  const { id } = useParams();
  const [readNotification] = useReadNotificationMutation();
  const { loading, data } = useGetNotificationQuery({
    variables: { input: id! },
  });
  useEffect(() => {
    if (id) readNotification({ variables: { input: id } });
  }, [id, readNotification]);

  if(loading) return <MessageLoading/>

  return (
    <IonContent>
      <MessageDetail data={data?.notification.notifications[0]} />
    </IonContent>
  );
};

MessageDetailPage.mutation = gql`
  mutation readNotification($input: ID!) {
    readNotification(input: $input) {
      success
    }
  }
`;

MessageDetailPage.query = gql`
  query getNotification($input: ID!) {
    notification(input: $input) {
      totalCount
      notifications {
        ...NotificationInfo
      }
    }
  }
  ${MessageDetail.fragment}
`;

export default MessageDetailPage;
