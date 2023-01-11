import { useDataContext } from "../providers/dataContext"
import { SendButton } from "./Buttons";
import { todayDate } from '../components/Date';

import React from "react";
import { useEffect, useRef, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";

import { InputField, FormField, LabelText } from "../styled/globalStyles";

import styled from "styled-components";

import { useUserContext } from "../providers/userContext";

//---------------------------------------------------------


const GetData = ({ index }) => {

    const { diary, setDiary, saveDataToBackend, getDiaryFromBackend } = useDataContext();
    const { user, userData, checkToken, LOCAL_STORAGE_KEY} = useUserContext();

    const [saved, setSaved] = useState(false);
    const [done, setDone] = useState(false);
    const [update, setUpdate] = useState();

    const [data, setData] = useState([
        {
            name: '',
            value: ''
        }
    ])

    const inputRefs = useRef([]);

    let location = useLocation();
    const navigate = useNavigate();

    //-----------------------------------------------------------------


    useEffect(() => {
        if (!user)
            navigate('/login')
        checkToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    //........................

    useEffect(() => {

        if(userData)
        if (!diary) {
            if (userData.diaryId) {
                console.log("noch kein Diary da, schau nach, ob was im Backend ist")
                getDiaryFromBackend(userData.diaryId)
            }
            else
                console.log("Kein Tagebuch vorhanden. LEGE EIN NEUES TAGEBUCH AN")
        }
        else {
            console.log("Diary:", diary)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //---------------------------

    useEffect(() => {
        if (saved === true)
            setDone(true)
    }, [saved])

    //------------------------------

    useEffect(() => {

        let val = 0;
        diary.groups[index].items.map((el, i) => {

            data.map(element => {
                if (element.name === el.name)
                    val = element.value;
                return val;
            })

            const ts = todayDate()

            if (update === true) {
                console.log("Aktualisiere die Daten")
                const tsIndex = diary.date.findIndex(e => e === todayDate());
                console.log(tsIndex)
                setDiary({ ...diary }, diary.groups[index].items[i].values[tsIndex] = val)

                setDiary({ ...diary }, diary.date = [...diary.date, ts])

            } else if (update === false) {
                console.log("Schreibe neue Daten")
                setDiary({ ...diary },
                    diary.groups[index].items[i].values = 
                    [...diary.groups[index].items[i].values, val])

                setDiary({ ...diary }, diary.date = [...diary.date, ts])
            }
        })

    }, [update])

    //-----------------------------------------

    useEffect(() => {

        if (saved)
        saveDataToBackend(diary.id, diary.groups[index].id, diary.groups[index].items, update);
    }, [saved])

    //......................

    const checkDate = (ts) => {
        return diary.date.findIndex(e => e === ts)
    }

    const saveValues = () => {

        //check time Data
        const ts = todayDate()
        console.log(ts)

        if (diary.date.length > 0) {
            const res = checkDate(ts);

            if (res >= 0) {
                console.log("Heutiges Datum bereits vorhanden")
                setUpdate(true);
            }
            else {
                console.log("Datum noch nicht vorhanden")
                setUpdate(false);
            }
        } else {
            console.log("Datumarray noch leer")
            setUpdate(false);
        }
    }

    //......................................

    const handleChange = (e) => {

        setData([...data,
        { name: e.target.name, value: e.target.value }])
    }

    //.......................................

    const handleSubmit = e => {

        saveValues();
        e.preventDefault();


        setSaved(true);
        timing();
        inputRefs.current.map(e => {
            e.value = '';
        })
        console.log(diary)
    }

    const timing = () => {
        setTimeout(() => {
            setSaved(false);
        }, 3000)
    }

    return (
        <div style={{ margin: '0px', padding: '0px' }} >

            {
                <FormField onSubmit={handleSubmit} >
                    {diary?.groups[index].items.map((e, i) => (
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
                        <StTextPCenter>Werte wurden gespeichert.</StTextPCenter>

                    }
                    {done === true ?
                        <StBiCheck style={{ marginLeft: 'auto', marginRight: 'auto' }} />
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

const StTextPCenter = styled.p`
  margin-left: auto;
  margin-right: auto;
`