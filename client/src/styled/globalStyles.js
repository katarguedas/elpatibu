import styled, { createGlobalStyle } from "styled-components"

//---------------------------------------------------------

const globalStyles = createGlobalStyle`
// ...
`

const ContentGroup = styled.div`
width: 85%;
/* min-height: 90%; */
margin-left: auto;
margin-right: auto;
`

const MainGroup = styled.div`
  display: flex;
  flex-direction: row;
`

const PageTitle = styled.h1`
  margin: 1.5rem;
  padding: 0 0 0 0.75rem;
`

const TitleH2 = styled.h2`
  margin: 1.5rem;
`

const StP = styled.p`
  margin: 1.5rem;
  font-size: 1.1rem;
`

const InputField = styled.input`
  border: 2px solid ${(props) => props.theme.colors.second};
  &:focus{
    border: 1.25px solid ${(props) => props.theme.colors.second};
    background-color: ${(props) => props.theme.colors.fifth};
  };
  outline: none;
  border-radius: 0.25rem;
  height: 1.75rem;
  font-size: 1.15rem;
  padding: 0.15rem;
  width: 240px;
`

const FormField = styled.form`
  margin-bottom: 4.0rem;
  box-sizing: border-box;
`

const LabelText = styled.div`
  width: 110px;
  font-weight: 500;
  height: 1.45rem;
  font-size: 1.15rem;
  `
//---------------------------------------------------------

export default globalStyles;

export { ContentGroup, MainGroup, PageTitle, InputField, LabelText, TitleH2, StP, FormField}
