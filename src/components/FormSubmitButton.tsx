import * as React from 'react';
import styled from 'styled-components';

interface Props {
  disabled: boolean;
  text: string;
}
const FormSubmitButton: React.SFC<Props> = ({ disabled, text }) => {
  return (
    <div className="container-fluid px-0 py-0">
      <div className="d-flex py-0 w-100 justify-content-end">
        <StyledButton type="submit" disabled={disabled}>
          {text}
        </StyledButton>
      </div>
    </div>
  );
};

const StyledButton = styled.button.attrs({
  className: 'px-3 py-1 light-green text-white',
})`
  border: 1px solid #E0E0E0;
  border-radius: 2px;
`;

export default FormSubmitButton;
