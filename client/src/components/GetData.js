import { useDataContext } from "../providers/dataContext"
import { SendButton } from "./Buttons";
import { todayDate } from '../components/Date';
import smiley1 from '../pictures/smiley-01.png';
import smiley2 from '../pictures/smiley-02.png';
import smiley3 from '../pictures/smiley-03.png';
import smiley4 from '../pictures/smiley-04.png';
import smiley5 from '../pictures/smiley-05.png';
import { useUserContext } from "../providers/userContext";
import { InputField, FormField, LabelText } from "../styled/globalStyles";

import React from "react";
import { useEffect, useRef, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";

import styled from "styled-components";


//---------------------------------------------------------


const GetData = ({ index }) => {

    const { diary, setDiary, saveDataToBackend, getDiaryFromBackend } = useDataContext();
    const { user, userData, checkToken } = useUserContext();

    const [saved, setSaved] = useState();
    const [done, setDone] = useState(false);
    const [update, setUpdate] = useState();

    const [data, setData] = useState([
        {
            name: '',
            value: ''
        }
    ])
    const [rating, setRating] = useState();

    const inputRefs = useRef([]);

    let location = useLocation();
    const navigate = useNavigate();

    const ts = todayDate();

    //.................................................

    useEffect(() => {
        checkToken();
    }, [location])


    useEffect(() => {
        if ((user) && (!userData))
            checkToken();
        if (!user)
            navigate('/login');
    }, [])

    //........................

    useEffect(() => {

        // console.log("USER?", user)
        // console.log("USERDATA?", userData)

        if (userData)
            if (!diary) {
                if (userData.diaryId) {
                    console.log("USER?", user)
                    console.log("USERDATA?", userData)
                    console.log("noch kein Diary da, schau nach, ob was im Backend ist")
                    getDiaryFromBackend(userData.diaryId)
                }
                else
                    console.log("Kein Tagebuch vorhanden. LEGE EIN NEUES TAGEBUCH AN")
            }
            else {
                // console.log("Diary:", diary)
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //......................................

    useEffect(() => {

        if (update !== undefined) {

            // heutiges Datum eintragen:
            if ((update === false) && (saved !== true))
                setDiary({ ...diary }, diary.date = [...diary.date, ts])

            let val = null;

            // bereite die eingegebenen Daten vor
            diary.groups[index].items.map((el, i) => {
                console.log("item: ", el.name)
                val = null;
                data.map(element => {
                    if (element.name === el.name)
                        val = element.value;
                    return val;
                })

                if (update === true) {
                    console.log("Aktualisiere die Daten")
                    const tsIndex = diary.date.findIndex(e => e === todayDate());
                    // Wurde ein neuer Wert eingegeben so überschreibe den alten, wenn vorhanden, sonst schreibe ihn ans Ende. Wurde kein neuer Wert eingegeben, dann setze ihn auf 'Null', falls noch nich vorhanden.
                    if (val !== null) {
                        if (diary.groups[index].items[i].values.length === diary.date.length) {
                            setDiary({ ...diary }, diary.groups[index].items[i].values[tsIndex] = val)
                        }
                        else {
                            setDiary({ ...diary }, diary.groups[index].items[i].values =
                                [...diary.groups[index].items[i].values, val])
                        }
                    } else if (val === null) {
                        if (diary.groups[index].items[i].values.length < diary.date.length)
                            setDiary({ ...diary }, diary.groups[index].items[i].values =
                                [...diary.groups[index].items[i].values, val])
                    }
                    setSaved(true);
                } else if (update === false) {
                    console.log("Schreibe neue Daten")

                    // neuen Wert eintragen:
                    console.log("neuer Wert für:", diary.groups[index].items[i].name)
                    setDiary({ ...diary },
                        diary.groups[index].items[i].values =
                        [...diary.groups[index].items[i].values, val])
                    setSaved(true);
                }
            })
        }
    }, [update])

    //---------------------------

    useEffect(() => {
        if (saved === true)
            setDone(true)
    }, [saved])

    //-----------------------------------------

    useEffect(() => {
        // console.log("BIN im saveDataToBackend-useEffect, saved: ", saved)
        if (saved === true) {
            console.log("saved:", saved)
            saveDataToBackend(diary.id, diary.groups[index].id, diary.groups[index].items, ts, update);
            setSaved()
        }
    }, [saved])

    //.....................................

    const checkTs = () => {

        if (diary.date.length > 0) {
            // checke, ob heutiges Datum bereits gespeichert
            const res = diary.date.findIndex(e => e === ts);

            if (res >= 0)
                setUpdate(true);   // Heutiges Datum bereits vorhanden
            else
                setUpdate(false);   // Datum noch nicht vorhanden
        } else
            setUpdate(false);    // Datumarray noch leer
    }

    //.......................................

    const handleSubmit = e => {

        checkTs();
        e.preventDefault();

        timing();
        inputRefs.current.map(e => {
            e.value = '';
        })
        console.log(diary)
    }

    //......................

    const timing = () => {
        setTimeout(() => {
            // setSaved(false);
        }, 3000)
    }

    //......................................

    const handleChange = (e) => {

        setData([...data,
        { name: e.target.name, value: e.target.value }])
    }

    // const handleRadio = (e) => {
    //     setRating(e.target.value);
    //     console.log(e.target.value)
    // }

    useEffect(() => {
        console.log(rating)
    }, [rating])
    //----------------------------

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }} >
            <div style={{ flexGrow: '1' }}  >
            </div>
            {
                <FormField onSubmit={handleSubmit} style={{ flexGrow: '2' }} >
                    {diary.groups[index].items.map((e, i) => (
                        e.selected ?
                            e.measurable ?
                                <InputLabelH key={e.id} >
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
                                </InputLabelH >
                                :
                                <InputLabelV key={e.id}
                                    style={{ marginTop: '0.5rem', backgroundColor: '#fafcfb', borderRadius: '0.5rem', border: '1px solid #9e9a9a' }}
                                >
                                    <StLabelText style={{ width: '100%', margin: '0.75rem' }} >{e.label}</StLabelText>
                                    <RadioGroup>
                                        <RadioLabelText>
                                            <img src={smiley1} alt="very good" />
                                            <input
                                                style={{ margin: '0.75rem' }}
                                                name={i}
                                                type="radio"
                                                value={1}
                                                onChange={
                                                    (e) => setRating({ key1: e.target.value, key2: i })
                                                }
                                            />
                                            Option 1
                                        </RadioLabelText>
                                        <RadioLabelText>
                                            <img src={smiley2} alt="good" />
                                            <input
                                                style={{ margin: '0.75rem' }}
                                                name={i}
                                                type="radio"
                                                value={2}
                                                onChange={
                                                    (e) => setRating({ key1: e.target.value, key2: i })}
                                            />
                                            Option 2
                                        </RadioLabelText>
                                        <RadioLabelText>
                                            <img src={smiley3} alt="" />
                                            <input
                                                style={{ margin: '0.75rem' }}
                                                name={i}
                                                type="radio"
                                                value={3}
                                                onChange={
                                                    (e) => setRating({ key1: e.target.value, key2: i })
                                                }
                                            />
                                            Option 3
                                        </RadioLabelText>
                                        <RadioLabelText>
                                            <img src={smiley4} alt=" " />
                                            <input
                                                style={{ margin: '0.75rem' }}
                                                name={i}
                                                type="radio"
                                                value={4}
                                                onChange={
                                                    (e) => setRating({ key1: e.target.value, key2: i })
                                                }
                                            />
                                            Option 4
                                        </RadioLabelText>
                                        <RadioLabelText>
                                            <img src={smiley5} alt=" " />
                                            <input
                                                style={{ margin: '0.75rem' }}
                                                name={i}
                                                type="radio"
                                                value={5}
                                                onChange={
                                                    (e) => setRating({ key1: e.target.value, key2: i })
                                                }
                                            // checked={true}
                                            />
                                            Option 5
                                        </RadioLabelText>
                                    </RadioGroup>

                                </InputLabelV>

                            : null

                    ))
                    }

                    {saved &&
                        <StTextPCenter>Werte wurden gespeichert.</StTextPCenter>

                    }
                    {done === true ?
                        <StBiCheck style={{ marginLeft: 'auto', marginRight: 'auto' }} />
                        :
                        <SendButton type="submit" >senden</SendButton>
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

const InputLabelH = styled.label`
  display: inline-flex;
  margin: 0.25rem 0.25rem 0.25rem 0.25rem;
`
const InputLabelV = styled.label`
  display: flex;
  flex-wrap: wrap;
  margin: 0.25rem 0.25rem 0.25rem 0.25rem;
`

const StLabelText = styled(LabelText)`
  width: 270px;
  font-weight: 500;
  height: 1.45rem;
  font-size: 1.15rem;
`

const RadioGroup = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 0.5rem;
  margin-left: auto;
  margin-right: auto;
`

const RadioLabelText = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 1.0rem;
  padding: 0.25rem;
  text-align: center;
  padding-top: 0.75rem;
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