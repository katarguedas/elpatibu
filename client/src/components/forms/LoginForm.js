import { SendButton } from "../../styled/Buttons";
import Input from './Input';
import { RxEyeOpen } from "react-icons/rx";
import styled from 'styled-components';
import { StyledLabelText, StyledFormField } from "../../styled/globalStyles";

//---------------------------------------------------------

const LoginForm = ({
	handleSubmit,
	handleChange,
	handleMouseEnter,
	handleMouseLeave,
	loginData,
	type
}) => {

	return (
		<StyledFormField onSubmit={handleSubmit}>
			<InputLabel >
				<StyledLabelText>E-Mail:</StyledLabelText>
				<Input
					type="text"
					name={'email'}
					required
					value={loginData.email || ''}
					onChange={handleChange}
				/>
			</InputLabel>
			<InputLabel  >
				<StyledLabelText>Passwort:</StyledLabelText>
				<Input
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
		</StyledFormField>

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


