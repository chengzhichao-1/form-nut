import React from 'react'

export class FormStore {
  constructor() {
    this.store = {}
    this.fieldEntities = []
    this.callbacks = []
  }
  getFieldsValue = () => {
    return this.store
  }
  getFieldValue = (name) => {
    return this.store[name] ?? ''
  }
  setFieldValue = (name, value) => {
    if (value === this.store[name]) return
    this.store[name] = value
    const entity = this.fieldEntities.find(entity => entity.props.name === name)
    entity?.onStoreChange()
  }
  setFieldsValue = (newStore) => {
    this.store = {...this.store, ...newStore}
    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  }
  registerFieldEntity = (entity) => {
    this.fieldEntities.push(entity)
    return () => {
      delete this.store[entity.props.name]
      this.fieldEntities = this.fieldEntities.filter(item => item !== entity)
    }
  }
  validate = () => {
    // 简单校验rule.required
    const errorFields = []
    this.fieldEntities.forEach(entity => {
      const errorField = {
        name: [entity.props.name],
        errors: []
      }
      entity.props?.rules?.forEach(rule => {
        if (rule.required && (this.store[entity.props.name] === "" || this.store[entity.props.name] === undefined)) {
          errorField.errors.push(rule.message)
        }
      })
      if (errorField.errors.length !== 0) {
        errorFields.push(errorField)
      }
    })
    return errorFields
  }
  submit = () => {
    const { onFinish, onFinishFailed } = this.callbacks
    const errorFields = this.validate()
    if (errorFields.length === 0) {
      onFinish && onFinish(this.store)
    } else {
      onFinishFailed && onFinishFailed({values: this.store, errorFields})
    }
  }
  setCallbacks = (callbacks) => {
    this.callbacks = {...this.callbacks, ...callbacks}
  }

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      setFieldValue: this.setFieldValue,
      registerFieldEntity: this.registerFieldEntity,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
    };
  };
}

export default function useForm(form) {
  const formRef = React.useRef(null)
  
  if (!formRef.current) {
    if (form) {
      formRef.current = form
    } else {
      formRef.current = new FormStore().getForm()
    }
  }

  return [formRef.current]
}