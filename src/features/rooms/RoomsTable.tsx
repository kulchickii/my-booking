import styled from "styled-components";
import {useGetRoomsQuery}  from '../../services/apiRooms'

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
  const {
    data, 
    isError,  
    isLoading, 
    // refetch
  } = useGetRoomsQuery(undefined,{
    refetchOnReconnect: true // обновлённый контент, когда связь восстановится
  })
  
  if (isLoading) return <div>Загрузка...</div>
  if (isError) return <div>Ошибка</div> 

  return <Table>
    <TableHeader >
      <div></div>
        <div>Room</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
      <div></div>
    </TableHeader>
    {data?.map((item)=> <RoomRow key = {item.id} room = {item}/>)}
  </Table>

}

