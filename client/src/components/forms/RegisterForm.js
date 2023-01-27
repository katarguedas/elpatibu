import { useUserContext } from "../../providers/userContext";
import { SendButton } from "../../styled/Buttons";
import { InputField, LabelText, FormField } from "../../styled/globalStyles";

import { RxEyeOpen } from "react-icons/rx";
import styled from 'styled-components';


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
					<RxEyeOpen style={{ fontSize: '20px' }} />
				</EyeGroup>
			</RegisterLabel>

			<SendButton type="submit">senden</SendButton>
		</FormField>

	)
}

export default RegisterForm;

//---------------------------------------------------------


const RegisterLabel = styled.label`
  display: inline-flex;
  margin: 1.25rem 0.25rem;
`


const EyeGroup = styled.div`
  margin-left: -20px;
  margin-top: 3px;
`