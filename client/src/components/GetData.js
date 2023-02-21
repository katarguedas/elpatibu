import { useDataContext } from '../providers/dataContext';
import { useUserContext } from '../providers/userContext';
import { SendButton } from './../styled/Buttons';
import RadioInput from '../components/forms/RadioInput';
import { todayDate, todayDateTs } from '../utils/Date';
import { checkTs } from '../utils/helperfunctions';
import { checkGroupsToday } from '../utils/helperfunctions';
import { checkGroupXtoday } from '../utils/helperfunctions';
import { InputField, FormField, LabelText } from '../styled/globalStyles';

import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';

import styled from 'styled-components';

/******************************************************************************
 * This component is called from 'EditDiary' Component for each itemGroup.
 * Here the user put the values into the diary for the current day.
 * 
 * @param {*} index is the index of the current itemGroup 
 * @returns 
 ******************************/

const GetData = ({index }) => {

	const { diary, setDiary, saveDataToBackend, getDiaryFromBackend, editedGroups } = useDataContext();
	const { user, userData, checkToken } = useUserContext();

	const [saved, setSaved] = useState();
	const [done, setDone] = useState(false);
	const [update, setUpdate] = useState();
	const [savedValues, setsavedValues] = useState();

	const [data, setData] = useState([
		{
			name: '',
			value: ''
		}
	])

	const inputRefs = useRef([]);

	let location = useLocation();
	const navigate = useNavigate();

	const currentDate = todayDate();
	const ts = todayDateTs();

/***********************
 * useEffects
 ****************/

	useEffect(() => {
		checkToken();
	}, [location])

//.............................

	useEffect(() => {
		if ((user) && (!userData))
			checkToken();
		if (!user)
			navigate('/login');
	}, [])

	//........................

	useEffect(() => {

		if (userData)
			if (!diary) {
				if (userData.diaryId) {
					getDiaryFromBackend(userData.diaryId)
				}
			}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	//.................................................

	useEffect(() => {
		if (!savedValues)
			setsavedValues(checkGroupsToday(editedGroups(), diary));
		else
			setsavedValues(checkGroupXtoday(savedValues, diary, index))
	}, [], [update])

	//......................................

	useEffect(() => {
		// console.log('update?', update)
	}, [update])

	//---------------------------------------------

	useEffect(() => {
		if (update !== undefined) {
			// heutiges Datum eintragen:
			if ((update === false) && (saved !== true)) {
				console.log('heutiges Datum wird eingetragen')
				setDiary({ ...diary }, diary.timestamp.push(ts)) 
				setDiary({...diary}, diary.date.push(currentDate))
			}

			let val = null;
			// bereite die eingegebenen Daten vor
			diary.groups[index].items.map((el, i) => {
				val = null;
				data.map(element => {
					if (element.name === el.name)
						val = element.value;
					return val;
				})
				// console.log('val', val)

				if (update === true) {
					console.log('Aktualisiere die Daten')
					const tsIndex = diary.timestamp.findIndex(e => e === todayDateTs());
					// Wurde ein neuer Wert eingegeben so überschreibe den alten, wenn vorhanden, sonst schreibe ihn ans Ende. Wurde kein neuer Wert eingegeben, dann setze ihn auf 'Null', falls noch nich vorhanden.
					if (val !== null) {
						console.log('val', val)
						if (diary.groups[index].items[i].values.length === diary.timestamp.length) {
							setDiary({ ...diary }, diary.groups[index].items[i].values[tsIndex] = val)
						}
						else {
							console.log('val', val)
							setDiary({ ...diary }, diary.groups[index].items[i].values =
								[...diary.groups[index].items[i].values, val])
						}
					} else if (val === null) {
						console.log('val', val)
						if (diary.groups[index].items[i].values.length < diary.timestamp.length)
							setDiary({ ...diary }, diary.groups[index].items[i].values =
								[...diary.groups[index].items[i].values, val])
					}
					setSaved(true);
				} else if (update === false) {

					// neuen Wert eintragen:
					// console.log('neuer Wert für:', diary.groups[index].items[i].name)
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
		// console.log('BIN im saveDataToBackend-useEffect, saved: ', saved)
		if (saved === true) {
			saveDataToBackend(diary.id, diary.groups[index].id, diary.groups[index].items, currentDate, ts, update);
			setDone(true)
			setUpdate()
			setSaved()
		}
	}, [saved])

	//.....................................

	const handleSubmit = e => {

		checkTs(diary.timestamp, setUpdate);
		e.preventDefault();

		timing();
		if (inputRefs)
			inputRefs.current.map(e => {
				e.value = '';
			})
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
		{ name: e.target.name, value: parseFloat(e.target.value.replace(',','.')) }])
		// console.log("data", data)
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
									{
										(savedValues?.groups[index].items[i].done === true) ?
											<StBiCheckS />
											: null
									}
								</InputLabelH >
								:
								<InputLabelV key={e.id} >
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
									{
										(savedValues?.groups[index].items[i].done === true) ?
											<StBiCheckS />
											: null
									}
								</InputLabelV>
							: null
					))}
					{
						saved &&
						<StTextPCenter>Werte wurden gespeichert.</StTextPCenter>
					}
					{
						done === true ?
							<StBiCheckM style={{ marginLeft: 'auto', marginRight: 'auto' }} />
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
  margin: 0.5rem 0.25rem 0.25rem 0.25rem;
	background-color: #fff;
	border-radius: 0.5rem;
	border: 1px solid #9e9a9a;
`

const StLabelText = styled(LabelText)`
  width: 270px;
  font-weight: 500;
  height: 1.45rem;
  font-size: 1.15rem;
`

const StBiCheckM = styled(BiCheck)`
font-size: 3.0rem;
font-weight: 500;
color: #01ac01;
margin: 1.0rem auto 0 auto;
`

const StBiCheckS = styled(BiCheck)`
font-size: 2.0rem;
color: #01ac01;
margin-right: 0.5rem;
margin-left: auto; 
`

const StTextPCenter = styled.p`
  margin-left: auto;
  margin-right: auto;
`