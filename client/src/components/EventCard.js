import { useUserContext } from "../providers/userContext";
import { theme } from '../themes/theme'
import styled from "styled-components";
import { useEffect, useState } from "react";
import { BiStreetView } from "react-icons/bi";
import { BiWindowClose } from "react-icons/bi";

//----------------------------------------------------

const EventCard = ({ view, setView, event, setOpen }) => {

  const { LOCAL_STORAGE_EVENTS, getEventsFromBackend, userData, deleteEventInBackend } = useUserContext();

  const [events, setEvents] = useState();
  const [date, setDate] = useState();

  
  // console.log("view", view)
  // console.log("event", event)
  // console.log("events", events)



  const prepareDate = (string) => {
    if (string) {
      let hh, min;
      const yyyy = string.slice(0, 4)
      console.log("yyyy", yyyy)
      const mm = string.slice(5, 7)
      console.log("mm", mm)
      const dd = string.slice(8, 10)
      console.log("dd", dd)
      console.log("event", event)
      setDate(dd + '.' + mm + '.' + yyyy)
      if (event.allDay === false) {
        hh = string.slice(11, 13)
        console.log("hh", hh)
        min = string.slice(14, 16)
        console.log("min", min)
        const text = dd + '.' + mm + '.' + yyyy + ', um ' + hh + ':' + min;
        // setDate(...date, 'um ' + hh + ':' + min)
        setDate(text)
      }
    }
  }

  useEffect(() => {
    const eventsArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_EVENTS))
    if (!eventsArray) {
      getEventsFromBackend(userData.id);
    }
    setEvents(eventsArray);
  }, [])

  useEffect(() => {
    if (events) {
      console.log("events", events)
      events.map(e => {
        // console.log("e.id", e.id)
        // console.log("event.id", event.id)
        if (e.id === event.id) {
          console.log("gefunden!", e.start)
          setDate(e.start)
          prepareDate(e.start)
        }
      })
    }
    console.log(typeof (date))
  }, [events, event])


  const handleClick = () => {
    deleteEventInBackend(userData.id, event.id);
    localStorage.removeItem(LOCAL_STORAGE_EVENTS);
    getEventsFromBackend(userData.id);
    setView(false);
  }

  const handleClose = () => {
    setView(false)
  }


  return (
    <div>

      <Card>
        <BiWindowClose
          onClick={handleClose}
          style={{ position: 'absolute', top: '0.75rem', right: '1.0rem', fontSize: '1.5rem' }} />
        <EventText>{event.title} <br />am {date}</EventText>
        <DeleteButton onClick={handleClick} >
          Termin löschen
        </DeleteButton>
      </Card>

    </div>
  )
}


export default EventCard

//-----------------------------------------

const Card = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 6;
  bottom: 5.0rem;
  right: 0.0rem;
  width: 16.0rem;
  height: 8.5rem;
  padding: 0.5rem;
  margin: 0.25rem;
  margin-left: auto;
  margin-right: auto;
  color: #fff;
  background-color: ${(props) => props.theme.colors.col3};
  border-radius: 0.25rem;
  box-shadow: rgba(0, 0, 0, 0.35) 5.0px 5.0px 6.2px;
`

const EventText = styled.p`
  font-size: 1.15rem;
  font-weight: 500;
  padding: 0.15rem;
  margin-top: 0.15rem;
`
const DeleteButton = styled.div`
  padding: 0.25rem; 
  margin: '0';
  margin-left: auto;
  margin-right: auto;
  background-color: ${(props) => props.theme.colors.col5};
  border-radius: 0.5rem;
  width:  8.0rem; 
  font-weight: 500;
  border: 1px solid #fff;
`