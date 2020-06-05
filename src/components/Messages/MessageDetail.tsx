import React, { Fragment } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
} from "@ionic/react";
import "./messageDetail.css";
import gql from "graphql-tag";
import { INotificationInfoFragment } from "../../generated/graphql";
import Receipt from "../Receipts/Receipt";

interface Props {
  data?: INotificationInfoFragment | null;
}

const MessageDetail = (props: Props) => {
  const { data } = props;
  const receipt = data?.receipt;
  console.log("Rendering details");

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>{data?.date}</IonCardSubtitle>
        <IonCardTitle>
          <strong>{data?.title}</strong>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p className="message-detail__content">{data?.message}</p>
        {receipt && (
          <Fragment>
            <br />
            <Receipt receipt={receipt} />
          </Fragment>
        )}
      </IonCardContent>
    </IonCard>
  );
};

MessageDetail.fragment = gql`
  fragment NotificationInfo on Notification {
    title
    message
    date
    receipt {
      ...ReceiptDataList
    }
  }
  ${Receipt.fragment}
`;

export default MessageDetail;
