import styled, { createGlobalStyle } from "styled-components"

//---------------------------------------------------------

const globalStyles = createGlobalStyle`
// ...
`

const ContentGroup = styled.div`
width: 90%;
/* min-height: 90%; */
margin-left: auto;
margin-right: auto;
`

const MainGroup = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  top: 4.5rem;
  margin-bottom: 4.5rem;

`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 0.75rem;
  flex-grow: 1;
`

const PageTitle = styled.h1`
  margin: 1.5rem;
  padding: 0 0 0 0.75rem;
`

const TitleH2 = styled.h2`
  margin: 1.0rem 1.5rem;
`

const StP = styled.p`
  margin: 1.0rem 1.5rem;
  font-size: 1.1rem;
`

const StSpan = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 0.25rem 0.5rem;
`

const InputField = styled.input`
  border: 2px solid ${(props) => props.theme.colors.col10};
  &:focus{
    border: 1px solid ${(props) => props.theme.colors.col11};
    background-color: ${(props) => props.theme.colors.white};
  };
  outline: none;
  border-radius: 0.25rem;
  height: 1.75rem;
  font-size: 1.15rem;
  padding: 0.15rem;
  width: 240px;
`

const FormField = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 4.0rem;
  box-sizing: border-box;
`

const LabelText = styled.div`
  width: 110px;
  font-weight: 500;
  height: 1.45rem;
  font-size: 1.15rem;
  `

const Accordion = styled.div`
  ${(props) => {
      if(props.visible === true) {
        return `
          background-color: black;
          background: linear-gradient(to left, #fff, #C5E1CD);
          color: #1B5A6C;
          // border: 1px solid #1B5A6C;
          border-radius: 0.15rem;
          box-shadow: rgba(0, 0, 0, 0.25) 3.0px 3.0px 4.2px;
          padding: 0.5rem 0.75rem 0.5rem 1.5rem;
          margin: 0.5rem 1.5rem;
          font-size: 1.25rem;
          font-weight: 500;
          &:hover {
            color: white;
            background: linear-gradient(to left, #fff, #D9853B);
          }
          :active{
             background-color: #fff;
             color: black;
          }
        `;
      } else {
        return `
          background-color: white;
          background: linear-gradient(to left, #fff, #C5E1CD);
          color: #1B5A6C;
          border-radius: 0.15rem;
          box-shadow: rgba(0, 0, 0, 0.25) 3.0px 3.0px 4.2px;
          padding: 0.5rem 0.75rem 0.5rem 1.5rem;
          margin: 0.5rem 1.5rem;
          font-size: 1.25rem;
          font-weight: 500;
          &:hover {
            color: white;
            background: linear-gradient(to left, #fff, #D9853B);
          }
          :active{
             background-color: #fff;
             color: black;
          }
        `;
    }
  }}
`;

const Accordion2 = styled.div`
color: ${props => props.visible === true ? '#000' : '#fff'};
/* border: 0.5px solid ${(props) => props.theme.colors.col3}; */
border-radius: 0.15rem;
background-image: linear-gradient(to left, #fff, ${(props) => props.theme.colors.col4});

/* linear-gradient(to left, #fff, ${(props) => props.theme.colors.col4}); */

box-shadow: rgba(0, 0, 0, 0.25) 3.0px 3.0px 4.2px;
&:hover {
  color: white;
  background-image: linear-gradient(to left  , #fff, ${(props) => props.theme.colors.col5});
}
:active{
  background-color: #fff;
  color: black;
  background-image: linear-gradient(to left  , #fff, ${(props) => props.theme.colors.col1});
}
padding: 0.5rem 0.75rem 0.5rem 1.5rem;
margin: 0.5rem 1.5rem;
font-size: 1.25rem;
font-weight: 500;
`


//---------------------------------------------------------

export default globalStyles;

export { ContentGroup, MainGroup, MainContent, PageTitle, InputField, LabelText, TitleH2, StP, StSpan, FormField, Accordion }
