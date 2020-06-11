import React, { useEffect, useContext } from "react";
import { useParams } from "react-router";
import { IonContent } from "@ionic/react";
import gql from "graphql-tag";
import { DocumentNode } from "graphql";
import {
  useReadNotificationMutation,
  useGetNotificationQuery,
  IGetMessagesQuery,
  GetMessagesDocument,
  IReadNotificationMutation,
} from "../generated/graphql";
import MessageDetail from "../components/Messages/MessageDetail";
import MessageLoading from "../components/Loading/MessageLoading";
import { UserContext } from "../context/user-context";

const MessageDetailPage: React.FC & {
  mutation: DocumentNode;
  query: DocumentNode;
} = () => {
  const { id } = useParams();
  const [
    readNotification,
    readNotificationData,
  ] = useReadNotificationMutation();
  const ctx = useContext(UserContext);
  const { loading, data } = useGetNotificationQuery({
    variables: { input: id! },
  });

  const notification = data?.notification.notifications[0];

  useEffect(() => {
    if (notification && notification.read === false) {
      readNotification({
        variables: { input: notification.id },
        update: (store, { data }: { data: IReadNotificationMutation }) => {
          try {
            const notificationId = notification.id;
            if (data.readNotification.success && notificationId) {
              const notificationQuery = store.readQuery<IGetMessagesQuery>({
                query: GetMessagesDocument,
              });
              const notifications =
                notificationQuery?.notifications.notifications;
              const ntIdx = notifications?.findIndex(
                (n) => n!.id === notificationId
              );
              if (ntIdx !== undefined && notifications && ntIdx >= 0) {
                const message = notifications[ntIdx];
                const updateMessage = { ...message!, read: true };
                const updatedNotification = [...notifications];
                updatedNotification[ntIdx] = updateMessage;
                const updateNotificationResponse = {
                  ...notificationQuery!.notifications,
                  notifications: updatedNotification,
                };
                store.writeQuery<IGetMessagesQuery>({
                  query: GetMessagesDocument,
                  data: {
                    ...notificationQuery,
                    notifications: updateNotificationResponse,
                  },
                });
              }
            }
          } catch (error) {}
        },
      });
    }
  }, [notification, readNotification]);

  const success = readNotificationData.data?.readNotification.success;
  useEffect(() => {
    if (success && ctx) ctx.updateReadNotification!();
  }, [success, ctx]);

  //console.log("Rendering message page");
  

  if (loading) return <MessageLoading />;

  return (
    <IonContent>
      <MessageDetail data={notification} />
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
        id
        read
        ...NotificationInfo
      }
    }
  }
  ${MessageDetail.fragment}
`;

export default MessageDetailPage;
