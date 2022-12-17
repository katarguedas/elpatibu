
import styled from 'styled-components';

//---------------------------------------------------------

const Intro = () => {

    return (
        <IntroGroup>
            <IntroBanner>Patienten-Tagebuch</IntroBanner>
            <IntroGuide>
                <Step>Schritt 1</Step>
                <Step>Schritt 2</Step>
                <Step>Schritt 3</Step>
            </IntroGuide>
        </IntroGroup>
    )
}

export default Intro;

//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const IntroGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const IntroBanner = styled.div`
  height: 300px;
  font-size: 3.0rem;
  margin: 2.0rem;
`

const IntroGuide = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: space-evenly;
  `

const Step = styled.div`
  margin: 1.0rem;
  font-size: 2.0rem;
  margin-bottom: 2.0rem;
`