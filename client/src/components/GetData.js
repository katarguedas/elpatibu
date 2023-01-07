import { useDataContext } from "../providers/dataContext"
import { SendButton } from "./Buttons";

import { useEffect, useRef, useState } from "react";

import { InputField, FormField, LabelText } from "../styled/globalStyles";

import styled from "styled-components";
import { useNavigate } from "react-router";

//---------------------------------------------------------

const GetData = ({ id }) => {

    const { items, diary } = useDataContext();

    const [open, setOpen] = useState(true);

    const index1 = items.findIndex(e => {
        return (e.id === id)
    })
    // console.log("Index1", index1)

    // const index2 = items[index1].itemList.findIndex(e => {
    //     return (e.item === item)
    // })
    // console.log("Index2", index2)


    // switch (group) {
    //     case 'vital':

    // if (item === 'temperature')
    //     return (<div><SaveTemperature /></div>)
    return (

        open ?
            <SaveValues
                index1={index1} open={open} setOpen={setOpen} />
            : null
    )
    // if (item === 'pressureLow')
    //     return (<div><SavePressureLow /></div>)
    // if (item === 'pulse')
    //     return (<div><SavePulse /></div>)
    // savePressureHigh()
    // savePressurelow()
    // savePulse()
    // break;
    // default: 
    // }

}

export default GetData;


//-----------------------------------------------------------------------
// export const SaveTemperature = ({item}) => {

//     const { items } = useDataContext();
//     // console.log("items:", items)
//     return (
//         <div>
//             <StInputField></StInputField>
//             <span style={{ width: '80px' }} >{items[0].itemList[0].unit}</span>
//         </div>
//     )
// }

//-----------------------------------------------------------------------

// export const SavePressureHigh = ({item, index1, index2}) => {
export const SaveValues = ({ index1, open, setOpen }) => {

    const { items, diary, setDiary } = useDataContext();

    const [clear, setClear] = useState(true)
    const [values, setValues] = useState([])

    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {

        // const dat = {
        //     valueName: e.target.name,
        //     value: e.target.value
        // }
        // console.log(dat)
        // setValues({ ...values, dat })

        // console.log(e.target.value)
        // console.log("values", values)

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
        setValues({});
        setSaved(true);
        timing();
        // setOpen(!open)
    }

    const timing = () => {
        setInterval(() => {
            setOpen(!open)
        }, 2000)        
    }

    // console.log("open: ", open)

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
                                value={values.value}
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


//--------------------------------------------------------------------

// export const SavePressureLow = (id, item) => {
//     const { items } = useDataContext();
//     return (<div><StInputField></StInputField>
//         <span>{items[0].itemList[2].unit}</span>
//     </div>)
// }

// export const SavePulse = (id, item) => {
//     const { items } = useDataContext();
//     return (<div><StInputField></StInputField>
//         <span>{items[0].itemList[3].unit}</span>
//     </div>)
// }


//--------------------------------------------------

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
