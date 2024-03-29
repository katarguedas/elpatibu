import { GiNotebook, GiWhiteBook, GiCalendar, GiFountainPen, GiChart } from "react-icons/gi";
import {BiListPlus, BiRightArrow, BiDownArrow} from "react-icons/bi";

import styled from "styled-components";
//---------------------------------------------------------



//---------------------------------------------------------
// Styled-Components
//---------------------------------------------------------

const StGiBook = styled(GiNotebook)`
  font-size: 3.0rem;
  margin: 0.35rem;
`

const StGiWhiteBook = styled(GiWhiteBook)`
  font-size: 3.0rem;
  margin: 0.35rem;
`

const StGiCalendar = styled(GiCalendar)`
  font-size: 3.0rem;
  margin: 0.35rem; 
`
const StGiChart = styled(GiChart)`
  font-size: 3.0rem;
  margin: 0.75rem;
`

const StGiFountainPen = styled(GiFountainPen)`
  font-size: 3.0rem;
  margin: 0.75rem;
`
const StBiListPlus = styled(BiListPlus)`
  font-size: 3.0rem;
  margin: 0.75rem;
`
const StBiRightArrow = styled(BiRightArrow)`
  font-size: 1.0rem;
  margin-right: 0.5rem;
`
const StBiDownArrow = styled(BiDownArrow)`
  font-size: 1.0rem;
  margin-right: 0.5rem;
`

//---------------------------------------------------------
export { StGiBook, StGiWhiteBook, StGiCalendar, StGiChart, StGiFountainPen, StBiListPlus, StBiRightArrow, StBiDownArrow }