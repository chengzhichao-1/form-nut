import { useObserver } from "./hooks";
import { memo } from "react";

export default function observer(component) {
  const WrappedComponent = (props) => {
    return useObserver(() => component({...props}))
  }

  const MemoComponent = memo(WrappedComponent)

  return MemoComponent
}