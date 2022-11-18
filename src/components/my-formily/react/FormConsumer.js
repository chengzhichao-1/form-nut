import { observer } from '@/which'
import {FormContext} from "./context";
import {useContext} from "react";

const FormConsumer = observer(({ children }) => {
  const form = useContext(FormContext);
  return children(form);
});

export default FormConsumer;
