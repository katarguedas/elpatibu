import '../styled/Switch.css'

import styled from "styled-components";
//---------------------------------------------------------


const SwitchToggle = ({ isOn, handleToggle }) => {


    return (
        <div style={{marginBottom: '0.75rem'}}>
            <input
                checked={isOn}
                onChange={handleToggle}
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
            />
            <label  style={{ background: isOn && '#F2EB8D' }}
                className="react-switch-label"
                htmlFor={`react-switch-new`}
            >
                <span className={`react-switch-button`} />
            </label>
        </div>
    )
}

export default SwitchToggle;

//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

// const SwitchCheckboxInput = styled.input`
//     height: 0;
//     width: 0;
//     visibility: hidden;
//     &:checked {
//         left: calc(100% - 2px);
//   transform: translateX(-100%);
//     }
// `

// const SwitchLabel = styled.label`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   cursor: pointer;
//   width: 100px;
//   height: 50px;
//   background: grey;
//   border-radius: 100px;
//   position: relative;
//   transition: background-color .2s;

//   content: '';
//   position: absolute;
//   top: 2px;
//   left: 2px;
//   width: 45px;
//   height: 45px;
//   border-radius: 45px;
//   transition: 0.2s;
//   background: #fff;
//   box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);

//   left: calc(100% - 2px);
//   transform: translateX(-100%);

//   &:active {
//     width: 60px;
//   }
// `

// const SwitchButton = styled.span`
//   content: '';
//   position: absolute;
//   top: 2px;
//   left: 2px;
//   width: 45px;
//   height: 45px;
//   border-radius: 45px;
//   transition: 0.2s;
//   background: #fff;
//   box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);

//   left: calc(100% - 2px);
//   transform: translateX(-100%);

//   width: 60px;
// `
