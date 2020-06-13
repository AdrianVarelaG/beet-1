import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { DocumentNode } from "graphql";
import { useGetUnReadNotificationNumberQuery } from "../generated/graphql";

interface IUserContext {
  unReadNotification: number;
  updateReadNotification: () => void;
}

export const UserContext = React.createContext<Partial<IUserContext>>({});

const UserContextProvider: React.FC & {
  fragment: DocumentNode;
} = (props) => {
  const [unReadNotification, setUnReadNotification] = useState<
    number | undefined
  >();
  const { data, refetch } = useGetUnReadNotificationNumberQuery();
  const unread = data?.unreadNotifications;

  useEffect(() => {
    if (unread && unread > 0) setUnReadNotification(unread);
    else setUnReadNotification(undefined);
  }, [unread]);

  const updateReadNotificationHandler = () => {
    refetch();
  };

  return (
    <UserContext.Provider
      value={{
        unReadNotification,
        updateReadNotification: updateReadNotificationHandler,
      }}
    >
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
