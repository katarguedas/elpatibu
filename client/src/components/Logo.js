import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
//---------------------------------------------------------


const Logo = () => {

	const loginStatus = useSelector(state => state.auth.loginStatus);

	const navigate = useNavigate();

	const handleClickLogo = () => {
		if (loginStatus)
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