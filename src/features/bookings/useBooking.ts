import { useParams } from "react-router-dom";
import { useGetBookingQuery, type Booking } from "../../services/apiBooking";



export const useBooking = (): {
  booking: Booking;
  isLoading: boolean;
  bookingId: string | undefined;
} => {
  const { bookingId } = useParams()
  const {data: booking, isLoading}=useGetBookingQuery(bookingId);

  return {booking, isLoading, bookingId}
};