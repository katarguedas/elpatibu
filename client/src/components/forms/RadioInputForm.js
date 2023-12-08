
import smiley1 from '../../pictures/1a.png';
import smiley2 from '../../pictures/2a.png';
import smiley3 from '../../pictures/3a.png';
import smiley4 from '../../pictures/4a.png';
import smiley5 from '../../pictures/5a.png';

import { RATING_TEXT } from '../../diaryElementTemplates';

import Input from './Input';

import styled from "styled-components";
import { useEffect, useState } from 'react';


const images = [smiley1, smiley2, smiley3, smiley4, smiley5];
//------------------------------------------------------------

const RadioInputForm = ({ item, data, setData }) => {

	const [text, setText] = useState([]);


	useEffect(() => {
		if (RATING_TEXT) {
			RATING_TEXT.forEach(text => {
				if (text.name === item.name) {
					setText(text.text)
				}
			})
		}
	}, [item.name])


	const handleChange = (e) => {
		setData([...data,
		{ name: item.name, value: parseInt(e.target.value) }])
	}

	return (
		<StyledRadioGroup>
			{
				text &&
				text.map((radioText, index) => (
					<StyledRadioLabel key={radioText}>
						<img src={images[index]} alt=" " />
						<Input
							name={item.name}
							id={index}
							type="radio"
							onChange={handleChange}
							value={index + 1}
						/>
						{text[index]}
					</StyledRadioLabel>
				))
			}
		</StyledRadioGroup>

	)
}


export default RadioInputForm;



//----------------------------------------------------------


const StyledRadioGroup = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 0.5rem;
  margin-left: auto;
  margin-right: auto;
`

const StyledRadioLabel = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 1.0rem;
  padding: 0.5rem;
  text-align: center;
  padding: 0.75rem 1.25rem 1.0rem 1.25rem;
  @media (max-width: 1200px) {
    padding: 0.75rem 1.0rem 1.0rem 1.0rem;
  }
  @media (max-width: 900px) {
    padding: 0.5rem 0.25rem 0.75rem .25rem;
  }
`