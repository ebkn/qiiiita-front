import * as React from 'react';

interface Props {
  disabled: boolean;
  text: string;
}
const FormSubmitButton: React.SFC<Props> = ({ disabled, text }) => {
  return (
    <div className="container-fluid px-0 py-0">
      <div className="d-flex py-0 w-100 justify-content-end">
        <button
          type="submit"
          disabled={disabled}
          className="py-1"
        >
          {text}
        </button>
      </div>
    </div>
  );
};
export default FormSubmitButton;
