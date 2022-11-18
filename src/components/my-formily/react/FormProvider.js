import {useEffect} from "react";
import { FormContext } from "./context";

const FormProvider = ({ form, children }) => {
  useEffect(() => {
    form.onMount();
    return () => {
      form.onUnmount();
    };
  }, []);
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
};

export default FormProvider;
