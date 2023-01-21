import { LabelText, InputField } from "../../styled/globalStyles";
import { theme } from '../../themes/theme';
import styled from "styled-components";
import { useEffect } from "react";



const CalendarInputCard = ({ handleChange, handleCheckbox, handleStartDate, startDate, handleEndDate, handleSubmit,handleSelection, setAllday, allday, value }) => {

    const color = theme.colors.col20;

    useEffect(() => {setAllday(false)},[])


    return (
        <CardForm onSubmit={handleSubmit} >
            <div><LabelText style={{ display: 'flex', flexDirection: 'column', margin: '0.75rem', marginBottom: '1.75rem' }}  >
                Titel
                <InputField
                    type="text"
                    value={value}
                    onChange={handleChange} />
            </LabelText>
            </div>
            <div>
                <LabelText style={{ display: 'inline-flex', margin: '0.75rem', marginRight: '1.25rem' }} >
                    gänztägig
                    <InputField
                        style={{ marginLeft: '0.5rem' }}
                        type="checkbox"
                        onChange={handleCheckbox} />
                </LabelText>
            </div >
            {
                allday ?
                    <div
                        style={{ display: 'flex', flexDirection: 'row' }}
                    >
                        <LabelText style={{ marginBottom: '0.75rem', marginLeft: '0.75rem' }}
                        >
                            Beginn
                            <input
                                style={{ padding: '0.1rem' }}
                                type="date" 
                                value={startDate}
                                onChange={handleStartDate}
                                />
                        </LabelText>

                        <LabelText style={{ marginBottom: '0.75rem', marginLeft: '4.5rem' }} >
                            Ende
                            <input style={{ padding: '0.1rem' }}
                                type="date"
                                onChange={handleEndDate}
                            />
                        </LabelText>
                    </div>
                    :
                    <div
                        style={{
                            display: 'flex', flexDirection: 'row',
                            // border: '1px solid #000', height: '3.75rem', borderRadius: '0.25rem', backgroundColor: '#fff' 
                        }}
                    >
                        <LabelText style={{ marginBottom: '0.75rem', marginLeft: '0.75rem' }}
                        >
                            Beginn
                            <input
                                style={{ padding: '0.1rem' }}
                                type="datetime-local" />
                        </LabelText>

                        <LabelText style={{ marginBottom: '0.75em', marginLeft: '4.5rem' }} >
                            Ende
                            <input
                                style={{ padding: '0.1rem' }}
                                // style={{ width: '5.0rem' }}
                                type="datetime-local"
                            />
                        </LabelText>
                    </div>
            }
            <Selection>
                <LabelText htmlFor="cars">
                    Kategorie
                </LabelText>
                <StSelect
                    style={{ padding: '0.1rem', fontSize: '0.9rem' }}
                    name="category"
                    id="category"
                    onChange={handleSelection}
                >
                    <option value="Arzttermin">Arzttermin</option>
                    <option value="Therapie">Therapie</option>
                    <option value="Untersuchung">Untersuchung</option>
                    <option value="Sonstiges">Sonstiges</option>
                </StSelect>
            </Selection>
            <input
                style={{ margin: '1.0rem', width: '5.0rem', backgroundColor: color, borderRadius: '0.25rem', padding: ' 0.25rem', fontWeight: '600' }}
                type="submit" value="Speichern" />
        </CardForm>
    )
}


export default CalendarInputCard;


// --------------------------------------------------


const CardForm = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 5;
  bottom: 8.0rem;
  left: 2.0rem;
  width: 25.0rem;
  height: 18.0rem;
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: ${(props) => props.theme.colors.col34};
  border: 1px solid #000;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.25) 3.0px 3.0px 4.2px;
`

const StSelect = styled.select`
  display: flex;
  width: 8.0rem;

`

const Selection = styled.div`
  display: inline-flex;
  margin-top: 2.5rem;
  margin-bottom: 0.5rem;
`