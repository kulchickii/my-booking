import { RoomsTable } from "../features/rooms/RoomsTable"
import Heading from "../ui/Heading"
import Row from "../ui/Row"


export const Cabins = () => {
  return( 
  <>
    <Row type="horizontal">
      <Heading as="h1"> All rooms </Heading>
      <p> Filtered / Sorting</p>
    </Row>

    <Row>
      <RoomsTable/>
    </Row>
  </> ) 
}