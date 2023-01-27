
import smiley1 from '../../pictures/1.png';
import smiley2 from '../../pictures/2.png';
import smiley3 from '../../pictures/3.png';
import smiley4 from '../../pictures/4.png';
import smiley5 from '../../pictures/5.png';

import styled from "styled-components";
import { useDataContext } from '../../providers/dataContext';
import { useEffect, useState } from 'react';

//------------------------------------------------------------


const RadioInput = ({ item, itemIndex, data, setData }) => {


	const { RatingText } = useDataContext();

	const [text, setText] = useState([]);

	const handleChange = (e) => {
		setData([...data,
		{ name: item.name, value: parseInt(e.target.value) }])
	}

	useEffect(() => {
		// const textOptions = RatingText();
		RatingText().map(e => {
			if (item.name === e.name) {
				setText(e.text)
			}
		})
	}, [])

	console.log(text)

	//.....................

	return (

		<RadioGroup>
			<RadioLabelText>
				<img src={smiley1} alt=" " />
				<RInput
					name={itemIndex}
					type="radio"
					value={1}
					onChange={handleChange}
				/>
				{text[0]}
			</RadioLabelText>
			<RadioLabelText>
				<img src={smiley2} alt="" />
				<RInput
					name={itemIndex}
					type="radio"
					value={2}
					onChange={handleChange}
				/>
				{text[1]}
			</RadioLabelText>
			<RadioLabelText>
				<img src={smiley3} alt="" />
				<RInput
					name={itemIndex}
					type="radio"
					value={3}
					onChange={handleChange}
				/>
				{text[2]}
			</RadioLabelText>
			<RadioLabelText>
				<img src={smiley4} alt=" " />
				<RInput
					name={itemIndex}
					type="radio"
					value={4}
					onChange={handleChange}
				/>
				{text[3]}
			</RadioLabelText>
			<RadioLabelText>
				<img src={smiley5} alt=" " />
				<RInput
					name={itemIndex}
					type="radio"
					value={5}
					onChange={handleChange}
				/>
				{text[4]}
			</RadioLabelText>
		</RadioGroup>

	)
}


export default RadioInput;



//----------------------------------------------------------


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

const RInput = styled.input`
  margin: 1.25rem;
  padding: 2.0rem;
`