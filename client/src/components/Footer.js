import styled from 'styled-components';

//---------------------------------------------------------

const Footer = () => {
    return(
        <FooterGroup>
            Footer
        </FooterGroup>
    )
}


export default Footer

//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------


const FooterGroup = styled.div`
  bottom: 0rem; 
  width: 100%;
  height: 4.5rem;
  border-top: 3px solid ${(props) => props.theme.colors.col3};
  background-color: #fff;
  font-size: 1.0rem;
  font-weight: 500;
`