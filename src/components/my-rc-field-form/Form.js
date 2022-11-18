import React, { useRef } from "react"
import FieldContext from "./FieldContext";
import useForm from "./useForm";

export default function Form({children, form, onFinish, onFinishFailed}, ref) {
  console.log("form children", children);
  const [formInstance] = useForm(form)

  React.useImperativeHandle(ref, () => formInstance);

  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  });

  const onSubmit = (e) => {
    e.preventDefault()
    formInstance.submit()
    console.log("form state:", formInstance.getFieldsValue());
  }
  
  return (
    <form onSubmit={onSubmit}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}