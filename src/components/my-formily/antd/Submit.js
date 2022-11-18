import { useParentForm } from "@/which";

const Submit = ({
  children,
  onSubmit,
  onSubmitSuccess,
  onSubmitFailed,
  onClick,
}) => {
  const form = useParentForm();
  return (
    <button
      onClick={(e) => {
        if (onClick && onClick(e) === false) {
          return;
        }
        if (onSubmit) {
          form.submit(onSubmit).then(onSubmitSuccess).catch(onSubmitFailed);
        }
      }}
    >
      {children}
    </button>
  );
};

export default Submit;
