import { useDataContext } from "../providers/dataContext"
import { SendButton } from "./Buttons";
import todayDate from '../components/Date'

import { useEffect, useRef, useState } from "react";
import { BiCheck } from "react-icons/bi";


import { InputField, FormField, LabelText } from "../styled/globalStyles";

import styled from "styled-components";
import { useUserContext } from "../providers/userContext";

//---------------------------------------------------------


const GetData = ({ index }) => {

    const { diary, setDiary, saveDataToBackend } = useDataContext();

    // const [open, setOpen] = useState(true);

    const [saved, setSaved] = useState(false);
    const [done, setDone] = useState(false);

    const [data, setData] = useState([
        {
            name: '',
            value: ''
        }
    ])

    const inputRefs = useRef([]);

    //----------------------------
    
    console.log("DONE?",done)



   //---------------------------

    useEffect(() => {
        if (saved === true)
            setDone(true)
    }, [saved])

    const handleChange = (e) => {

        setData([...data,
        { name: e.target.name, value: e.target.value }])

        console.log(data)
    }

    //......................


    const saveValues = () => {

        let res;
        
        const ts = todayDate()
        if (diary.date.length > 0)
            res = diary.date.find(ts)
        console.log(res)
        if (res)
            console.log("Heutiges Datum bereits vorhanden")
        else
            setDiary({ ...diary },
                diary.date = [...diary.date, ts])

        //. . . . . . . .
        let val = 0;

        console.log(index)

        diary.groups[index].items.map((el, i) => {
            // console.log(el)
            data.map(element => {
                if (element.name === el.name)
                    val = element.value;
                return val;
            })
            console.log(val)
            setDiary({ ...diary },
                diary.groups[index].items[i].values = [...diary.groups[index].items[i].values, val])
        })
    }

    //...........................

    const handleSubmit = e => {
        saveValues();
        e.preventDefault();

        saveDataToBackend();
        setSaved(true);
        timing();
        inputRefs.current.map(e => {
            e.value = '';
        })
        console.log(diary)
        e.stopPropagation()
    }

    const timing = () => {
        setTimeout(() => {
            // setOpen(!open)
            setSaved(false);
        }, 3000)
    }

    console.log("saved?", saved)

    return (
        <div style={{ margin: '0px', padding: '0px' }} >

            {
                <FormField onSubmit={handleSubmit} >
                    {diary.groups[index].items.map((e, i) => (
                        e.selected ?
                            <InputLabel key={e.id}>
                                <StLabelText>{e.label}</StLabelText>
                                <StInputField
                                    id={e.id}
                                    ref={el => inputRefs.current[i] = el}
                                    type='text'
                                    name={e.name}
                                    onChange={(e) => handleChange(e, index, i)}
                                >
                                </StInputField>
                                {e.unit}
                            </InputLabel>
                            : null
                    ))
                    }

                    {saved &&
                        <p>Werte wurden gespeichert.</p>

                    }
                    {done === true ?
                        <StBiCheck />
                        :
                        <SendButton type="submit">senden</SendButton>
                    }
                </FormField>
            }

        </div >
    )
}


export default GetData;



//--------------------------------------------------------------------


const StInputField = styled(InputField)`
  width: 100px;
  height: 2.0rem;
  margin: 0.25rem 1.0rem 0.5rem 0.5rem;
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
const StBiCheck = styled(BiCheck)`
font-size: 3.0rem;
color: green;

margin-right: 0.5rem;
`