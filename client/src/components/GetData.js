import { useDataContext } from '../providers/dataContext';
import { useUserContext } from '../providers/userContext';
import { SendButton } from './../styled/Buttons';
import RadioInputForm from '../components/forms/RadioInputForm';
import { todayDate, todayDateTs } from '../utils/Date';
import { checkTs } from '../utils/helperfunctions';
import { checkGroupsToday } from '../utils/helperfunctions';
import { checkGroupXtoday } from '../utils/helperfunctions';
import { StyledFormField, StyledLabelText } from '../styled/globalStyles';
import Input from './forms/Input';

import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

/******************************************************************************
 * This component is called from 'EditDiary' Component for each itemGroup.
 * Here the user put the values into the diary for the current day.
 * 
 * @param {*} index is the index of the current itemGroup 
 * @returns 
 ******************************/

const GetData = ({ index }) => {

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

	const navigate = useNavigate();
	const currentDate = todayDate();
	const ts = todayDateTs();

	if ((user) && (!userData)) {
		checkToken();
	}
	if (!user) {
		navigate('/login');
	}
	if (userData && !diary && userData.diaryId) {
		getDiaryFromBackend(userData.diaryId)
	}

	/***********************
	 * useEffects
	 ****************/

	useEffect(() => {
		if (!savedValues)
			setsavedValues(checkGroupsToday(editedGroups(), diary));
		else
			setsavedValues(checkGroupXtoday(savedValues, diary, index))
	}, [], [update])

	//---------------------------------------------

	useEffect(() => {
		if (update !== undefined) {
			// heutiges Datum eintragen:
			if ((update === false) && (saved !== true)) {
				console.log('heutiges Datum wird eingetragen')
				setDiary({ ...diary }, diary.timestamp.push(ts))
				setDiary({ ...diary }, diary.date.push(currentDate))
			}

			let val = null;
			// bereite die eingegebenen Daten vor
			diary.groups[index].items.map((el, i) => {
				val = null;
				data.map(element => {
					if (element.name === el.name) {
						val = element.value;
					}
					return val;
				})

				if (update === true) {
					const tsIndex = diary.timestamp.findIndex(e => e === todayDateTs());
					// Wurde ein neuer Wert eingegeben so überschreibe den alten, wenn vorhanden, sonst schreibe ihn ans Ende. Wurde kein neuer Wert eingegeben, dann setze ihn auf 'Null', falls noch nich vorhanden.
					if (val !== null) {
						if (diary.groups[index].items[i].values.length === diary.timestamp.length) {
							setDiary({ ...diary }, diary.groups[index].items[i].values[tsIndex] = val)
						}
						else {
							setDiary({ ...diary }, diary.groups[index].items[i].values =
								[...diary.groups[index].items[i].values, val])
						}
					} else if (val === null) {
						if (diary.groups[index].items[i].values.length < diary.timestamp.length)
							setDiary({ ...diary }, diary.groups[index].items[i].values =
								[...diary.groups[index].items[i].values, val])
					}
					setSaved(true);
				} else if (update === false) {

					// neuen Wert eintragen:
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
		if (saved === true) {
			saveDataToBackend(diary.id, diary.groups[index].id, diary.groups[index].items, currentDate, ts, update);
			setDone(true)
			setUpdate()
			setSaved()
		}
	}, [saved])

	//.....................................

	const handleSubmit = event => {
		checkTs(diary.timestamp, setUpdate);
		event.preventDefault();

		if (inputRefs) {
			setTimeout(() => {
				inputRefs.current.forEach(event => event.value = '')
			}, 3000)
		}
	}


	const handleChange = (event) => {
		setData([...data,
		{
			name: event.target.name,
			value: parseFloat(event.target.value.replace(',', '.'))
		}])
	}

	//----------------------------

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }} >
			<div style={{ flexGrow: '1' }}  >
			</div>
			{
				<StyledFormField
					onSubmit={handleSubmit}
					style={{ flexGrow: '2' }}
				>
					{diary.groups[index].items.map((e, i) => (
						e.selected ?
							e.measurable ?
								<StyledInputLabelH key={e.id} >
									<StyledLabelTextM>
										{e.label}
									</StyledLabelTextM>
									<Input
										name={e.name}
										id={e.id}
										type='text'
										onChange={(e) => handleChange(e, index, i)}
										ref={el => inputRefs.current[i] = el}
										text
									/>
									{e.unit}
									{
										(savedValues?.groups[index].items[i].done === true) ?
											<StyledBiCheckS />
											: null
									}
								</StyledInputLabelH >
								:
								<StyledInputLabelV key={e.id} >
									<StyledLabelTextM2  >
										{e.label}
									</StyledLabelTextM2>
									<RadioInputForm
										item={e}
										itemIndex={i}
										data={data}
										setData={setData}
									>
									</RadioInputForm>
									{
										(savedValues?.groups[index].items[i].done === true) ?
											<StyledBiCheckS />
											: null
									}
								</StyledInputLabelV>
							: null
					))}
					{
						saved &&
						<StTextPCenter>Werte wurden gespeichert.</StTextPCenter>
					}
					{
						done === true ?
							<StyledBiCheckM /> :
							<SendButton type="submit" >senden</SendButton>
					}
				</StyledFormField>
			}
		</div >
	)
}


export default GetData;



//--------------------------------------------------------------------


const StyledInputLabelH = styled.label`
  display: inline-flex;
  margin: 0.25rem 0.25rem 0.25rem 0.25rem;
`
const StyledInputLabelV = styled.label`
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem 0.25rem 0.25rem 0.25rem;
	background-color: #fff;
	border-radius: 0.5rem;
	border: 1px solid #9e9a9a;
`

const StyledLabelTextM = styled(StyledLabelText)`
  width: 270px;
`

const StyledLabelTextM2 = styled(StyledLabelText)`
	width: 100%;
	margin: 0.5rem;
	padding-bottom: 0.75rem;
	border-bottom: solid 1px black;
`

const StyledBiCheckM = styled(BiCheck)`
font-size: 3.0rem;
font-weight: 500;
color: #01ac01;
margin: 1.0rem auto 0 auto;
`

const StyledBiCheckS = styled(BiCheck)`
font-size: 2.0rem;
color: #01ac01;
margin-right: 0.5rem;
margin-left: auto; 
`

const StTextPCenter = styled.p`
  margin-left: auto;
  margin-right: auto;
`