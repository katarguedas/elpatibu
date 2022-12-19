import Header from "../components/Header"
import Footer from '../components/Footer'
import RegisterForm from "../components/forms/RegisterForm"

import { useUserContext } from "../providers/userContext"

import { useEffect, useState } from "react"

import { v4 as uuidv4 } from 'uuid';

import styled from 'styled-components';
import { ContentGroup, PageTitle } from "../styled/globalStyles"
import { useNavigate } from "react-router"


//---------------------------------------------------------

const Register = () => {

    const { registerData, setRegisterData, addUser, regMessage, flag, setFlag } = useUserContext();

    const [type, setType] = useState("password");


    const navigate = useNavigate();

    const clearState = () => setRegisterData("")

    const handleChange = e => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        // setRegisterData({...registerData, id: uuidv4() })
        console.log(registerData)
        console.log(uuidv4())
        addUser();

        clearState()
        console.log(regMessage)
    }

    const handleMouseEnter = (e) => {
        e.preventDefault()
        setType("text")
    }

    const handleMouseLeave = (e) => {
        e.preventDefault()
        setType("password")
    }

    useEffect(() => {
        if (flag === 0) {
            console.log("flag", flag)
        const timer = setTimeout(() => {
            navigate('/login');
        }, 4000);
        return() => {clearTimeout(timer)
        setFlag(999)};
          
        }
    }, [flag])

    return (
        <ContentGroup>
            <Header />
            <PageTitle>Registrieren</PageTitle>
            <RegisterGroup>
                <RegisterForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    type={type}
                >
                </RegisterForm>

                {
                    ((flag === 0) || (flag === 1)) ?
                        <Message>{regMessage}</Message>
                        : null
                }
            </RegisterGroup>

            <Footer />
        </ContentGroup>
    )
}


export default Register;


//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const RegisterGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px; 
  margin-left: auto; 
  margin-right: auto;
`
const Message = styled.div`
  margin-bottom: 3.0rem;
  font-size: 1.15rem;
`