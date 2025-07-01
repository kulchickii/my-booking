import { useGetBookingsQuery } from "../../services/apiBooking";
import { Menus } from "../../ui/Menus";

import { Pagination } from "../../ui/Pagination";
import { Table } from "../../ui/Table";
import {BookingRow} from "./BookingRow";

export const BookingTable = () => {
  const {data , isLoading } = useGetBookingsQuery();
  
  const bookings = data?.bookings ?? [];
  const count = data?.count ?? 0;
  
  if (isLoading) return <div>Загрузка...</div>
  if (!bookings.length) return <>NO bookings</>;

  return ( 
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        /> 

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
