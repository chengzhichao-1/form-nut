export class FormStore {
  constructor() {
    this.store = {}
    this.fieldEntries = []
  }
  getFieldsValue() {
    return this.store
  }
  getFieldValue(name) {
    return this.store[name]
  }
  setFieldValue(name, value) {
    this.store[name] = value
  }
  registerFieldEntry(name, entry) {
    this.store[name] = undefined
    // if (this.fieldEntries.findIndex(item => item === entry) === -1) {
    //   this.fieldEntries.push(entry)
    // }
    return () => {
      delete this.store[name]
      // this.fieldEntries = this.fieldEntries.filter(item => item !== entry)  
    }
  }
}

export function useForm() {
  return [new FormStore()]
}