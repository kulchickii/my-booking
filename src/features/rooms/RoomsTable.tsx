import styled from "styled-components";
import { RoomRow } from "./RoomRow";
// import Spinner from "../../ui/Spinner";
// import RoomRow from "./RoomRow";

// import { useCabins } from "./useCabins";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

export function RoomsTable() {
  const data = [
  {
    id: 1,
    created_at: '2025-06-13T16:42:15.976732+00:00',
    name: '001',
    maxPeople: 4,
    price: 120,
    discount: 10,
    image: null,
    discriptoin: 'very good room'
  }
]
  return <Table role="table">
    <TableHeader role="row">
      <div></div>
        <div>Room</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
      <div></div>
    </TableHeader>
    {data.map((item)=> <RoomRow key = {item.id} room = {item}/>)}
  </Table>

}

