import {useGetRoomsQuery}  from '../../services/apiRooms'

import { RoomRow } from "./RoomRow";
import { Table } from "../../ui/Table";
import { Menus } from '../../ui/Menus';

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
          data={data || []}
          render={(item) => <RoomRow key = {item.id} room = {item} />}
        />
      </Table>
    </Menus>
)
}

