
import { BiRightArrow, BiDownArrow, BiSquare, BiCheckSquare } from "react-icons/bi";

import styled from "styled-components";

//---------------------------------------------------------

const Panel = ({ itemGroup, handleSelect }) => {

    return (
        <StPanel visible={itemGroup.visible}>
            {itemGroup.items.map(el => (
                <Item key={el.
                id}>
                    {
                        el.selected ?
                            <StBiCheckSquare onClick={() => handleSelect(itemGroup.id, el.id)}></StBiCheckSquare>
                            :
                            <StBiSquare onClick={() => handleSelect(itemGroup.id, el.id)}></StBiSquare>
                    }
                    {el.label}
                </Item>
            ))
            }
        </StPanel>
    );
}

export default Panel;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const StPanel = styled.div` 
  display: ${props => props.visible ? 'flex' : 'none'};
  flex-direction: column;
  transition: 3s;
  text-align: left;
  position: relative;
  top: -2.75rem;
  /* background-color: #f1f1f1; */
  /* z-index: -1; */
  padding: 2.0rem 0.5rem 0.25rem 1.5rem;
  margin: 1.5rem;
  border-left: 1px solid ${(props) => props.theme.colors.col22};
  border-bottom: 1px solid ${(props) => props.theme.colors.col22};
  border-right: 1px solid ${(props) => props.theme.colors.col22};
  border-right: 1px solid ${(props) => props.theme.colors.col22};
  border-bottom-left-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
`

const StBiSquare = styled(BiSquare)`
  font-size: 1.1rem;
  margin-right: 0.75rem;
  margin-bottom: -0.2rem;
`
const StBiCheckSquare = styled(BiCheckSquare)`
  font-size: 1.1rem;
  margin-right: 0.75rem;
  margin-bottom: -0.2rem;
`

const Item = styled.div`
  margin: 0.25rem;
`