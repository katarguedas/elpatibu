import { useUserContext } from "../../providers/userContext";

import styled from 'styled-components';
import { InputField, LabelText } from "../../styled/globalStyles";

//---------------------------------------------------------

const Input = ({ handleChange }) => {


	return (

		<div>

			<InputField
				type="text"
				name={'diaryName'}
				// value='Mein Tagebuch'
				// value={loginData.email || ''}
				onChange={handleChange}
			/>

		</div>

	)
}

export default Input;

//---------------------------------------------------------


const StInput = styled.input`
  display: inline-flex;
  margin: 0.75rem 0.25rem;
`

