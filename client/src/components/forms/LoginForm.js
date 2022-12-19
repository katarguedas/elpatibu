import { useUserContext } from "../../providers/userContext";
import { LoginSendButton } from "../Buttons";

import { RxEyeOpen } from "react-icons/rx";
import styled from 'styled-components';
import { InputField, LabelText } from "../../styled/globalStyles";

//---------------------------------------------------------

const LoginForm = ({handleSubmit, handleChange, handleMouseEnter, handleMouseLeave, type}) => {

    const {loginData} = useUserContext();

    return (
        <FormField onSubmit={handleSubmit}>
            <InputLabel >
            <LabelText>E-Mail:</LabelText>
                <InputField
                    type="text"
                    name={'email'}
                    required
                    value={loginData.email || ''}
                    onChange={handleChange}
                />
            </InputLabel>
            <InputLabel  >
            <LabelText>Passwort:</LabelText>
                <InputField
                    type={type}
                    name={'pwd'}
                    required
                    value={loginData.pwd || ''}
                    onChange={handleChange}
                />
                <EyeGroup
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <RxEyeOpen style={{fontSize: '20px'}} />
                </EyeGroup>
            </InputLabel>
            <LoginSendButton type="submit">senden</LoginSendButton>
        </FormField>

    )
}

export default LoginForm;

//---------------------------------------------------------

const FormField = styled.form`
  margin-bottom: 4.0rem;
  box-sizing: border-box;

`

const InputLabel = styled.label`
  display: inline-flex;
  margin: 0.75rem 0.25rem;
`

const EyeGroup = styled.div`
  margin-left: -20px;
  margin-top: 3px;
`


