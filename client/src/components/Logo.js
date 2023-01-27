import styled from 'styled-components';
import { useUserContext } from '../providers/userContext';
import { useNavigate } from 'react-router';
//---------------------------------------------------------


const Logo = () => {

	const navigate = useNavigate();
	const { user } = useUserContext();

	const handleClickLogo = () => {
		if (user)
			navigate('/dashboard')
		else
			navigate('/welcome')
	}


	return (
		<PatibuLogo onClick={handleClickLogo}  >
			L O G O
		</PatibuLogo>
	)
};

export default Logo;

//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const PatibuLogo = styled.div`
  width: 4.5rem;
  height: 2.5rem;
  margin: 0.5rem;
  padding: 0.25rem;
  border: solid 2px ${(props) => props.theme.colors.col2};
  border-radius: 1.0rem;
  background-color: ${(props) => props.theme.colors.col1};
  font-weight: 500;
  &:hover {
  color: white;
  background-color: ${(props) => props.theme.colors.col3};
}
`