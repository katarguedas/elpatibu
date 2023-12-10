import styled, { createGlobalStyle } from "styled-components"

//---------------------------------------------------------

const globalStyles = createGlobalStyle`
// ...
`

const StyledContentGroup = styled.div`
width: 90%;
/* min-height: 90%; */
margin-left: auto;
margin-right: auto;
`

const StyledMainGroup = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  top: 4.5rem;
  margin-bottom: 4.5rem;

`

const StyledMainContent = styled.div`
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

const StyledFormField = styled.form`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`

const StyledLabelText = styled.div`
  width: 110px;
  font-weight: 500;
  height: 1.45rem;
  font-size: 1.15rem;
  `

const Accordion = styled.div`
  ${(props) => {
    if (props.visible === true) {
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


const PlotSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 2.0rem;

  width: 85%;
			@media (max-width: 1200px) {
				width: 90%;
  }
			@media (max-width: 768px) {
				width: 100%;
  }
`

const ChartStyle = styled.div`
  margin-top: 2.0rem;
  margin-bottom: 2.0rem;
  padding: 0.25rem;
  border: 2px solid;
  border-color: ${props => props.theme.colors.col4};
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.2) 3.0px 5.0px 4.2px;
  height: 560px;
  @media (max-width: 1280px) {
    height: 500px;
  }
  @media (max-width: 1024px) {
    height: 480px;
  }
  @media (max-width: 960px) {
    height: 410px;
  }
`

//---------------------------------------------------------

export default globalStyles;

export { StyledContentGroup, StyledMainGroup, StyledMainContent, PageTitle, StyledLabelText, TitleH2, StP, StSpan, StyledFormField, Accordion, PlotSection, ChartStyle }
