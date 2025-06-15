import styled from "styled-components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getRooms, type Room }  from '../../services/apiRooms'
import type { RootState } from "../../store/store";
import { useAppDispatch } from "../../hooks/hooks";

import { RoomRow } from "./RoomRow";
// import Spinner from "../../ui/Spinner";
// import RoomRow from "./RoomRow";

// import { useCabins } from "./useCabins";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  width:100%;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr ;
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
  const rooms: Room[] = useSelector((state:RootState) => state.rooms)
  const dispatch = useAppDispatch()

  //как-то вынести первую загрузку + появится кнопка "загрузить еще"
  useEffect(()=> {
    dispatch(getRooms())
  },[dispatch])


  return <Table>
    <TableHeader >
      <div></div>
        <div>Room</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
      <div></div>
    </TableHeader>
    {rooms.map((item)=> <RoomRow key = {item.id} room = {item}/>)}
  </Table>

}

