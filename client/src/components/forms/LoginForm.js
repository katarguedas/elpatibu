import { useUserContext } from "../../providers/userContext";
import { SendButton } from "../../styled/Buttons";

import { RxEyeOpen } from "react-icons/rx";
import styled from 'styled-components';
import { InputField, LabelText, FormField } from "../../styled/globalStyles";

//---------------------------------------------------------

const LoginForm = ({ handleSubmit, handleChange, handleMouseEnter, handleMouseLeave, type }) => {

	const { loginData } = useUserContext();

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
					<RxEyeOpen style={{ fontSize: '20px' }} />
				</EyeGroup>
			</InputLabel>
			<SendButton type="submit">senden</SendButton>
		</FormField>

	)
}

export default LoginForm;

//---------------------------------------------------------

const InputLabel = styled.label`
  display: inline-flex;
  margin: 0.75rem 0.25rem;
`

const EyeGroup = styled.div`
  margin-left: -20px;
  margin-top: 3px;
`


