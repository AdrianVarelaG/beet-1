import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { DocumentNode } from "graphql";
import { useGetUnReadNotificationNumberQuery } from "../generated/graphql";

interface IUserContext {
  unReadNotification: number;
}

export const UserContext = React.createContext<Partial<IUserContext>>({});

const UserContextProvider: React.FC & {
  fragment: DocumentNode;
} = (props) => {
  const [unReadNotification, setUnReadNotification] = useState<
    number | undefined
  >();
  const { data } = useGetUnReadNotificationNumberQuery({ pollInterval: 30000 });
  const unread = data?.unreadNotifications;

  useEffect(() => {
    if (unread && unread > 0) setUnReadNotification(unread);
    if (unread && unread === 0) setUnReadNotification(undefined);
  }, [unread]);

  return (
    <UserContext.Provider value={{ unReadNotification }}>
      {props.children}
    </UserContext.Provider>
  );
};

UserContextProvider.fragment = gql`
  query getUnReadNotificationNumber {
    unreadNotifications
  }
`;

export default UserContextProvider;
