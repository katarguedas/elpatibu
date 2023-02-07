import { useDataContext } from "../providers/dataContext"
import { SendButton } from "./../styled/Buttons";
import { todayDate } from '../utils/Date';
import RadioInput from '../components/forms/RadioInput';
import { useUserContext } from "../providers/userContext";
import { InputField, FormField, LabelText } from "../styled/globalStyles";
import { checkTs } from "../utils/helperfunctions";

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
		console.log("update?", update)
	}, [update])


	useEffect(() => {

		console.log("update:", update)
		if (update !== undefined) {

			// heutiges Datum eintragen:
			if ((update === false) && (saved !== true)) {
				console.log("heutiges Datum wird eingetragen")
				setDiary({ ...diary }, diary.date.push(ts))
			}

			let val = null;

			// bereite die eingegebenen Daten vor
			diary.groups[index].items.map((el, i) => {
				// console.log("item: ", el.name)
				val = null;
				data.map(element => {
					if (element.name === el.name)
						val = element.value;
					return val;
				})
				// console.log("val", val)

				if (update === true) {
					console.log("Aktualisiere die Daten")
					const tsIndex = diary.date.findIndex(e => e === todayDate());
					// Wurde ein neuer Wert eingegeben so überschreibe den alten, wenn vorhanden, sonst schreibe ihn ans Ende. Wurde kein neuer Wert eingegeben, dann setze ihn auf 'Null', falls noch nich vorhanden.
					if (val !== null) {
						console.log("val", val)
						if (diary.groups[index].items[i].values.length === diary.date.length) {
							setDiary({ ...diary }, diary.groups[index].items[i].values[tsIndex] = val)
						}
						else {
							console.log("val", val)
							setDiary({ ...diary }, diary.groups[index].items[i].values =
								[...diary.groups[index].items[i].values, val])
						}
					} else if (val === null) {
						console.log("val", val)
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

	//-----------------------------------------

	useEffect(() => {
		// console.log("BIN im saveDataToBackend-useEffect, saved: ", saved)
		if (saved === true) {
			saveDataToBackend(diary.id, diary.groups[index].id, diary.groups[index].items, ts, update);
			setDone(true)
			setUpdate()
			setSaved()
		}
	}, [saved])

	//.....................................

	const handleSubmit = e => {

		console.log(diary.date)

		checkTs(diary.date, setUpdate);
		e.preventDefault();

		timing();
		if (inputRefs)
			inputRefs.current.map(e => {
				e.value = '';
			})
		// console.log(diary)
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
		{ name: e.target.name, value: parseInt(e.target.value) }])
	}

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
									style={{
										marginTop: '0.5rem',
										backgroundColor: '#fff',
										borderRadius: '0.5rem',
										border: '1px solid #9e9a9a'
									}}
								>
									<StLabelText style={{ width: '100%', margin: '0.75rem' }} >
										{e.label}
									</StLabelText>
									<RadioInput
										item={e}
										itemIndex={i}
										data={data}
										setData={setData}
									>
									</RadioInput>
								</InputLabelV>
							: null
					))}
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


const StBiCheck = styled(BiCheck)`
font-size: 3.0rem;
color: #01ac01;
margin-right: 0.5rem;
`

const StTextPCenter = styled.p`
  margin-left: auto;
  margin-right: auto;
`