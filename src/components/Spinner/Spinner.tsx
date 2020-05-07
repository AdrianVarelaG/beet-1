import React, { Fragment } from "react";
import { IonBackdrop, IonSpinner } from "@ionic/react";

import "./spinner.css";

interface SpinnerProps {}

const Spinner: React.FC<SpinnerProps> = () => {
  return (
    <Fragment>
      <IonBackdrop className="backdrop"></IonBackdrop>
      <IonSpinner name="lines" className="spinner" />
    </Fragment>
  );
};

export default Spinner;
