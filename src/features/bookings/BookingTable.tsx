import { useSearchParams } from "react-router-dom";
import { useGetBookingsQuery } from "../../services/apiBooking";
import { Menus } from "../../ui/Menus";

import { Pagination } from "../../ui/Pagination";
import { Table } from "../../ui/Table";
import {BookingRow} from "./BookingRow";

export const BookingTable = () => {
  const [searchParams] = useSearchParams()
  
  //фильтр для АПИ
  const filterValue = searchParams.get("status")
  const filter = !filterValue || filterValue === "all"? undefined: { field: "status", value: filterValue }
  
  //сотриторовка для АПИ
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc"
  const [field, dir] = sortByRaw.split("-")
  
  type SortDirection = 'asc' | 'desc'
  const direction: SortDirection = dir === "asc" ? "asc" : "desc"
  const sortBy = { field, direction } 
  
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"))

  const {data , isLoading } = useGetBookingsQuery({filter, sortBy, page})

  const bookings = data?.bookings ?? []
  const count = data?.count ?? 0
  
  if (isLoading) return <div>Загрузка...</div>
  if (!bookings.length) return <>NO bookings</>

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
