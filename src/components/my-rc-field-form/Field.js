import React, { useContext, useEffect, useReducer, Fragment } from "react"
import FieldContext from "./FieldContext";

export default function Field(props) {
  const {children, name, label} = props
  const form = useContext(FieldContext)

  const [, forceRerender] = useReducer(x => x + 1, 0)

  useEffect(() => {
    const unRegisterFieldEntity = form.registerFieldEntity({
      props,
      onStoreChange
    })
    return () => {
      unRegisterFieldEntity()
    }
  }, [])

  const onStoreChange = () => {
    forceRerender()
  }

  const childNodeProps = {
    value: form.getFieldValue(name),
    onChange: (e) => {
      form.setFieldValue(name, e.target.value)
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