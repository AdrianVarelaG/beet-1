import React from 'react';
import TextFilterLoading from "./TextFilterLoading";
import { IonSearchbar } from '@ionic/react';

interface TextFilterProps {
  isError: boolean;
  onChange: (text: string) => void;
}

const TextFilter:React.FC<TextFilterProps> = ({isError, onChange}) => {  
  if(isError)  return <TextFilterLoading/>
  return (
    <IonSearchbar className="ion-padding-start ion-padding-end" placeholder="Buscar" debounce={1000} onIonChange={e => onChange(e.detail.value!)} />
  );
}

export default TextFilter;