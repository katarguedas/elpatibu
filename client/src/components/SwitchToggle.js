import '../styled/Switch.css'

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
            <label  style={{ background: isOn && '#FFE0DE' }}
                className="react-switch-label"
                htmlFor={`react-switch-new`}
            >
                <span className={`react-switch-button`} />
            </label>
        </div>
    )
}

export default SwitchToggle;

