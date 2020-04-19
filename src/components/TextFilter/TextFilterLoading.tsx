import React, { Fragment } from "react";
import {
  IonSkeletonText
} from "@ionic/react";
import "./textFilterLoading.css";


const TextFilterLoading: React.FC = () => {

  return (
    <Fragment>
      <IonSkeletonText animated className="loading-receipt__search" />
    </Fragment>
  );
};

export default TextFilterLoading;
