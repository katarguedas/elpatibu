
import { forwardRef } from 'react';
import styled from 'styled-components';

//---------------------------------------------------------

const Input = forwardRef(({ name, id, type, handleChange, ...props }, ref) => {

  return (

    <div>

      <StyledInput
        type={type}
        name={name}
        id={id}
        onChange={handleChange}
        {...props}
        ref={ref}
      />

    </div>

  )
})

export default Input;

//---------------------------------------------------------


const StyledInput = styled.input`
  border: 2px solid ${(props) => props.theme.colors.col2};
  &:focus{
    border: 2px solid ${(props) => props.theme.colors.col1};
    background-color: ${(props) => props.theme.colors.white};
  };
  border-radius: 0.25rem;
  outline: none;
  font-size: 1.15rem;
  width: ${(props) => (props.text ? "100px" : "")};
  height: ${(props) => (props.text ? "2.0rem" : "1.75rem")};
  margin: ${(props) => (props.text ? "0.25rem 1.0rem 0.5rem 0.5rem" : "")};
  padding: 0.15rem;
`

