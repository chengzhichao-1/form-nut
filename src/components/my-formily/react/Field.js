import React from "react"
import { observer } from '@/which'
import { FieldContext, FormContext } from "./context"

const Field = observer((props) => {
  const form = React.useContext(FormContext)
  const field = form.createField(props)

  const component = React.createElement(field.component[0], {
    ...field.component[1],
    value: field.value,
    onChange: field.onInput,
  })

  const decorator = field.decorator ? React.createElement(
    field.decorator[0],
    field.decorator[1],
    component
  ) : null
  
  return (
    <FieldContext.Provider value={field}>{decorator ?? component}</FieldContext.Provider>
  )
})

export default Field