import { useState } from "react"
import { RoomsTable } from "../features/rooms/RoomsTable"
import Heading from "../ui/Heading"
import Row from "../ui/Row"
import Button from "../ui/Button"
import { CreateRoom } from "../features/rooms/CreateRoom"


export const Cabins = () => {
  const [showForm, setShowForm] = useState<boolean>(false)

  return( 
  <>
    <Row type="horizontal">
      <Heading as="h1"> All rooms </Heading>
      <p> Filtered / Sorting</p>
    </Row>

    <Row type="vertical">
      <RoomsTable/>
      <Button onClick={()=>setShowForm(prev => !prev)}>Add room</Button>
      {showForm && <CreateRoom/>}
    </Row>
  </> ) 
}