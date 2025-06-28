import {useGetRoomsQuery}  from '../../services/apiRooms'

import { RoomRow } from "./RoomRow";
import { Table } from "../../ui/Table";
import { Menus } from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

export function RoomsTable() {
  const [searchParams] = useSearchParams()
  console.log(searchParams.get('discount'));
  
  const { data = [], isError, isLoading,} = useGetRoomsQuery(undefined,{
    refetchOnReconnect: true // обновлённый контент, когда связь восстановится
  })
  
  if (isLoading) return <div>Загрузка...</div>
  if (isError) return <div>Ошибка</div> 

  const filterValue = searchParams.get("discount") || "all"
  
  let filteredRooms = []

  if (filterValue === "all") {
    filteredRooms = data;
  } else if(filterValue === "no-discount" ){
    filteredRooms = data.filter((room) => room.discount === 0)
  } else if (filterValue === "with-discount") {
    filteredRooms = data.filter((room) => room.discount > 0)
  }

  const sortBy = searchParams.get("sortBy") || "startDate-asc"
  const [field, direction] = sortBy.split("-")
  const modifier = direction === "asc" ? 1 : -1
  const sortedRooms = [...filteredRooms].sort((a, b) => (a[field] - b[field]) * modifier);
    
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header >
          <div></div>
          <div>Room</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
    
        <Table.Body
          data={sortedRooms || []}
          render={(item) => <RoomRow key = {item.id} room = {item} />}
        />
      </Table>
    </Menus>
)
}

