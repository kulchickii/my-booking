import { RoomsTable } from "../features/rooms/RoomsTable"
import Heading from "../ui/Heading"
import Row from "../ui/Row"
import { AddRoom } from "../features/rooms/AddRoom"
import { RoomTableOpretions } from "../features/rooms/RoomTableOpretions"


export const Cabins = () => {
  return( 
  <>
    <Row type="horizontal">
      <Heading as="h1"> All rooms </Heading>
      <RoomTableOpretions/>
    </Row>

    <Row type="vertical">
      <RoomsTable/>
      <AddRoom/>
    </Row>
  </> ) 
}