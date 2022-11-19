import Field from "./Field";
import { define, observable } from "@/which";
import {batchSubmit, batchValidate} from "./internals";

export default class Form {
  constructor(props) {
    this.initialize(props);
    this.makeObservable();
  }

  initialize = (props) => {
    this.props = { ...props };
    this.fields = {};
    this.initialValues = { ...props?.initialValues };
    this.values = { ...props?.initialValues };
  };

  makeObservable = () => {
    define(this, {
      fields: observable.shallow,
      values: observable,
    });
  };

  onMount = () => {};

  onUnmount = () => {};

  validate = () => {
    return batchValidate(this);
  };

  submit = (onSubmit) => {
    return batchSubmit(this, onSubmit);
  };

  createField = (props) => {
    const { name } = props;
    if (!this.fields[name]) {
      new Field(name, props, this);
    }

    return this.fields[name];
  };
}
