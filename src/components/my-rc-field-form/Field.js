import React, { useContext, useEffect, useReducer, Fragment } from "react"
import FieldContext from "./FieldContext";

export default function Field({children, name, label}) {
  const form = useContext(FieldContext)

  console.log("field children", children);

  const [, forceRerender] = useReducer(x => x + 1, 0)

  useEffect(() => {
    const unRegisterFieldEntry = form.registerFieldEntry(name)
    return () => {
      unRegisterFieldEntry()
    }
  }, [])

  const childNodeProps = {
    value: form.getFieldValue(name),
    onChange: (e) => {
      form.setFieldValue(name, e.target.value)
      forceRerender()
    }
  }
  const childNode = React.cloneElement(children, childNodeProps);
  return (
    <>
      <span>{label && `${label}:`}</span>
      {childNode}
    </>
  );
}