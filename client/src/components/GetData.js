import { useDataContext } from "../providers/dataContext"
import { SendButton } from "./Buttons";

import { useRef, useState } from "react";

import { InputField, FormField, LabelText } from "../styled/globalStyles";

import styled from "styled-components";


//---------------------------------------------------------

const GetData = ({ id }) => {

    const { items, diary, setDiary } = useDataContext();

    const [open, setOpen] = useState(true);

    const [clear, setClear] = useState(true)

    const [saved, setSaved] = useState(false);

    const index1 = items.findIndex(e => {
        return (e.id === id)
    })

    const handleChange = (e) => {


        switch (e.target.name) {
            case 'temperature':
                setDiary({ ...diary },
                    diary.vital.temperature.values = e.target.value);
                break;
            case 'pressureHigh':
                setDiary({ ...diary },
                    diary.vital.pressureHigh.values = e.target.value);
                break;
            case 'pressureLow':
                setDiary({ ...diary },
                    diary.vital.pressureLow.values = e.target.value);
                break;
            case 'pulse':
                setDiary({ ...diary },
                    diary.vital.pulse.values = e.target.value);
                break;
        }
    }

    console.log(diary.vital)

    // console.log(values)

    const handleSubmit = e => {
        e.preventDefault();
        setSaved(true);
        timing();
        // setOpen(!open)
    }

    const timing = () => {
        setInterval(() => {
            setOpen(!open)
        }, 2000)        
    }

    return (
        <div style={{ margin: '0px', padding: '0px' }} >

            <FormField onSubmit={handleSubmit} >
                {items[index1].itemList.map(e => (
                    e.selected ?
                        <InputLabel key={e.item} clear={clear}>
                            <StLabelText>{e.label}</StLabelText>
                            <StInputField
                                // ref={}
                                type='text'
                                name={e.item}
                                // value={}
                                onChange={handleChange}
                            >
                            </StInputField>
                            {e.unit}
                        </InputLabel>
                        : null
                ))
                }
                <SendButton type="submit">senden</SendButton>
                {saved ?
                        <p>Werte wurden gespeichert.</p>
                        : null}
            </FormField>

        </div >
    )

}

export default GetData;



//--------------------------------------------------------------------


const StInputField = styled(InputField)`
  width: 100px;
  height: 2.0rem;
  margin: 0.25rem 1.0rem 0.5rem 0.5rem;
  border-color: ${props => props.clear ? 'red' : 'black'}
  /* position: relative; */
  /* right: 40px; */
`

const InputLabel = styled.label`
  display: inline-flex;
  margin: 0.25rem 0.25rem 0.25rem 0.25rem;
`

const StLabelText = styled(LabelText)`
  width: 270px;
  font-weight: 500;
  height: 1.45rem;
  font-size: 1.15rem;
  `
