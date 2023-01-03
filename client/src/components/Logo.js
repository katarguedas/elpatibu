import styled from 'styled-components';
//---------------------------------------------------------


const Logo = () => {

    return(
        <PatibuLogo>
            LOGO
        </PatibuLogo>
    )
};

export default Logo;

//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const PatibuLogo = styled.div`
  width: 3.5rem;
  height: 2.5rem;
  margin: 0.5rem;
  padding: 0.25rem;
  border: solid 2px ${(props) => props.theme.colors.first};
  border-radius: 1.0rem;
  background-color: ${(props) => props.theme.colors.second};
  font-weight: 500;
`