import { useUserContext } from "../../providers/userContext";
import { LoginSendButton } from "../Buttons";

import { RxEyeOpen } from "react-icons/rx";
import styled from 'styled-components';
import { InputField, LabelText } from "../../styled/globalStyles";

//---------------------------------------------------------

const RegisterForm = ({ handleSubmit, handleChange, handleMouseEnter, handleMouseLeave, type }) => {

    const { registerData } = useUserContext();

    return (
        <FormField onSubmit={handleSubmit}>
            <RegisterLabel >
                <LabelText>Name:</LabelText>
                <InputField
                    type="text"
                    name={'name'}
                    required
                    value={registerData.name || ''}
                    onChange={handleChange}
                />
            </RegisterLabel>
            <RegisterLabel >
                <LabelText>E-Mail:</LabelText>
                <InputField
                    type="text"
                    name={'email'}
                    required
                    value={registerData.email || ''}
                    onChange={handleChange}
                />
            </RegisterLabel>
            <RegisterLabel  >
                <LabelText>Passwort:</LabelText>
                <InputField
                    type={type}
                    name={'pwd'}
                    required
                    value={registerData.pwd || ''}
                    onChange={handleChange}
                />
                <EyeGroup
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <RxEyeOpen style={{fontSize: '20px'}} />
                </EyeGroup>
            </RegisterLabel>

            <LoginSendButton type="submit">senden</LoginSendButton>
        </FormField>

    )
}

export default RegisterForm;

//---------------------------------------------------------

const FormField = styled.form`
  margin-bottom: 4.0rem;
  /* border: 1px solid black; */
  box-sizing: border-box;

`

const RegisterLabel = styled.label`
  display: inline-flex;
  margin: 1.25rem 0.25rem;
`


const EyeGroup = styled.div`
  margin-left: -20px;
  margin-top: 3px;
`