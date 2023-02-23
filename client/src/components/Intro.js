import styled from 'styled-components';
import { AuthButton } from '../styled/Buttons';
import editData_01 from '../pictures/editData_01.png';
import editData_02 from '../pictures/editData_02.png';
import Blutdruck from '../pictures/Blutdruck.png';
import { useNavigate } from 'react-router';

import { TbArrowBigRight } from "react-icons/tb";
import { theme } from '../themes/theme';

//---------------------------------------------------------

const Intro = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login')
  }

  const handleClickRegister = () => {
    navigate('/register')
  }

  return (
    <IntroGroup>
      <IntroBanner>Patienten-Tagebuch</IntroBanner>
      <div style={{ height: ' 8rem' }} >
        Du hast schon ein Konto? <br></br>Hier geht es zu Deinem geschützten Bereich
        <br></br>
        <AuthButton onClick={handleClick} >Anmelden</AuthButton>
      </div>
      <IntroGuide>
        <Step>
          <span style={{ fontWeight: '700' }} >Schritt 1</span>
          <div style={{ marginBottom: '1.0rem', marginTop: '2.0rem' }} >
            Registriere Dich noch heute und erstelle Dein individuelles Patienten-Tagebuch
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }} >
            <TbArrowBigRight
              style={{
                justifyItems: 'center',
                color: theme.colors.col5
              }}
            />
            <AuthButton onClick={handleClickRegister}
              style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                height: '3.5rem',
                // marginBottom: '3.0rem'
              }} >
              Jetzt registrieren
            </AuthButton>
          </div>

        </Step>
        <Step>
          <span style={{ fontWeight: '700' }} >Schritt 2</span>
          <div style={{ marginTop: '2.0rem', marginBottom: '2.0rem' }} >
            Dokumentiere täglich Deinen Gesundheitszustand
          </div>

          <img style={{ border: '1px solid #000', borderRadius: '0.5rem', marginBottom: '0.5rem' }}
            src={editData_01} alt="" />
          <img style={{ border: '1px solid #000', borderRadius: '0.5rem' }}
            src={editData_02} alt="" />

        </Step>
        <Step>
          <span style={{ fontWeight: '700' }} >Schritt 3</span>
          <div style={{ marginTop: '2.0rem' }}  >
            Betrachte Deinen Genesungsprozess oder Gesundheitsverlauf in Diagrammen
          </div>
          <img style={{ marginTop: '2.0rem', border: '1px solid #000', borderRadius: '0.5rem' }}
            src={Blutdruck} alt="" />
        </Step>
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
  position: relative;
  top: 4.5rem;
  margin-bottom: 4.5rem;
`

const IntroBanner = styled.div`
  height: 5.0rem;
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
  display: flex;
  flex-direction: column;
  width: 30%;
  flex-grow: 1;
  margin: 1.0rem;
  font-size: 1.5rem;
  margin-bottom: 2.0rem;
`