import React, { Fragment, useState } from "react";
import {
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import Messages from "../components/Messages/Messages";
import MessageLoading from "../components/Messages/MessageLoading";
import gql from "graphql-tag";
import { useGetMessagesQuery } from "../generated/graphql";

const MessagesPage = () => {
  const { loading, data } = useGetMessagesQuery();
  const [segment, setSegment] = useState("all");

  if (loading)
    return (
      <IonContent>
        <MessageLoading />
      </IonContent>
    );

  return (
    <Fragment>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="10" push="1">
              <IonSegment
                onIonChange={(e) => {
                  setSegment(e.detail.value!);
                }}
                //color="tertiary"
                value={segment}
              >
                <IonSegmentButton value="all">
                  <IonLabel>Todos</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="unread">
                  <IonLabel>No leidos</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-no-padding">
              <IonCard className="ion-no-margin ion-margin-start ion-margin-end">
                <Messages data={data?.notifications} filter={segment} />
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </Fragment>
  );
};

MessagesPage.fragment = gql`
  query getMessages {
    notifications {
      ...NotificationList
    }
  }
  ${Messages.fragment}
`;

export default MessagesPage;
