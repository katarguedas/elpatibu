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
  height: 4.0rem;
  border-top: 3px solid ${(props) => props.theme.colors.first};
  background-color: #fff;
  font-size: 1.0rem;
  font-weight: 500;
`