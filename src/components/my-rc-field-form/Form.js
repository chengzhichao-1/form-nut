import React, { useRef } from "react"
import FieldContext from "./FieldContext";
import { useForm } from "./useForm";

export default function Form({children, form}) {
  console.log("form children", children);
  const formStore = useRef(useForm()[0])

  const onSubmit = (e) => {
    e.preventDefault()
    console.log("form state:", formStore.current.getFieldsValue());
  }
  
  return (
    <form onSubmit={onSubmit}>
      <FieldContext.Provider value={form ?? formStore.current}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}