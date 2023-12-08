import { BiSquare, BiCheckSquare, BiInfoCircle } from 'react-icons/bi';
import { SendButton } from '../styled/Buttons';
import { theme } from '../themes/theme'
import { useDataContext } from '../providers/dataContext';
import { StyledFormField } from '../styled/globalStyles';
import Input from './forms/Input';
import { useRef, useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css';

import styled from 'styled-components';
import { BiCheck } from 'react-icons/bi';

//---------------------------------------------------------

const Panel = ({ itemGroup, handleSelect }) => {

  const { diaryTemplate, setDiaryTemplate } = useDataContext();

  const inputRef = useRef();
  const [done, setDone] = useState();
  const [showInfo, setShowInfo] = useState();
  const color = theme.colors.col3;

  //............................

  const handleSubmit = e => {
    e.preventDefault();
    inputRef.current.value = '';
    setDone(true);
  }

  //........................

  return (
    <StPanel visible={itemGroup.visible}>
      {itemGroup.items.map(el => (
        <Item key={el.id}>
          {
            el.selected ?
              <StBiCheckSquare
                onClick={() => handleSelect(itemGroup.id, el.id)} />
              :
              <StBiSquare
                onClick={() => handleSelect(itemGroup.id, el.id)} />
          }
          {el.label}
        </Item>
      ))}
      {
        itemGroup.name === 'meteorosensitivity' &&

        <StyledFormField style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '1.0rem'
        }}
          onSubmit={handleSubmit} >
          <CityInput>
            In welcher Stadt lebst Du?
            <BiInfoCircle
              style={{ margin: '0.5rem', fontSize: '1.25rem' }}
              onClick={() => setShowInfo(true)}
            >
              <StP show={showInfo} >
                Für den Abgleich mit Wetterdaten benötige ich einen Ort
              </StP>
            </BiInfoCircle>
            {
              (!done) &&
              <Input
                style={{
                  marginLeft: '1.0rem',
                  width: '200px'
                }}
                type="text"
                name={diaryTemplate.city}
                ref={el => inputRef.current = el}
                onChange={(e) =>
                  setDiaryTemplate({ ...diaryTemplate, city: e.target.value })}
              />
            }
          </CityInput>
          {
            !done ?
              <SendButton
                style={{ backgroundColor: color }}
                type="submit" >
                Ort speichern
              </SendButton>
              :
              <StBiCheck />
          }
        </StyledFormField>
      }
    </StPanel>
  );
}

export default Panel;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const StPanel = styled.div` 
  display: ${props => props.visible ? 'flex' : 'none'};
  flex-direction: column;
  transition: 3s;
  text-align: left;
  position: relative;
  top: -2.75rem;
  /* background-color: #f1f1f1; */
  /* z-index: -1; */
  padding: 2.0rem 0.5rem 0.25rem 1.5rem;
  margin: 1.5rem;
  border-left: 1px solid ${(props) => props.theme.colors.col4};
  border-bottom: 1px solid ${(props) => props.theme.colors.col4};
  border-right: 1px solid ${(props) => props.theme.colors.white};
`

const StBiSquare = styled(BiSquare)`
  font-size: 1.1rem;
  margin-right: 0.75rem;
  margin-bottom: -0.2rem;
`
const StBiCheckSquare = styled(BiCheckSquare)`
  font-size: 1.1rem;
  margin-right: 0.75rem;
  margin-bottom: -0.2rem;
`

const Item = styled.div`
  margin: 0.25rem;
`

const CityInput = styled.div`
  display: inline-flex;
  margin-top: 1.65rem;
  margin-bottom: 1.0rem;
  margin-right: 1.5rem;
`

const StBiCheck = styled(BiCheck)`
font-size: 3.0rem;
color: green;
margin-right: 0.5rem;
margin-top: 1.0rem;
`

const StP = styled.p`
  display: ${props => props.show ? 'inlineFlex' : 'none'}

`