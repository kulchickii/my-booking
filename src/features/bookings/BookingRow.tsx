import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import isToday from 'dayjs/plugin/isToday';
import relativeTime from 'dayjs/plugin/relativeTime';

import { useDeleteBookingMutation, useUpdateBookingMutation, type Booking } from "../../services/apiBooking";
import { Table } from "../../ui/Table";
import { Modal } from "../../ui/Modal";
import { Menus } from "../../ui/Menus";
import { ConfirmDelete } from "../../ui/ConfirmDelete";
dayjs.extend(isToday);
dayjs.extend(relativeTime);

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const Tag = styled.span<{ type: string }>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
`;

interface BookingProps {
  booking: Booking
}

export const BookingRow: React.FC<BookingProps> = ({ booking }) => { 
const {
    id: bookingId,
    // created_at,
    startDate,
    endDate,
    numDate,
    // numGuest,
    status,
    totalPrice,
    guest: { fullName: guestName, email },
    room: { name: cabinName },
  } = booking
  
  const navigate = useNavigate()
  const [updateBooking, { isLoading: isCheckingOut }] = useUpdateBookingMutation();
  const [deleteBooking, {isLoading: isDeleting}] = useDeleteBookingMutation()

   const handleCheckout = (bookingId: number) => {
    updateBooking({id: bookingId, update: { status: "checked-out", isPaid: true }})
  }

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {dayjs(startDate).isToday() ? "Today" : dayjs(startDate).fromNow()}{" "}
          &rarr; {numDate} night stay
        </span>
        <span>
          {dayjs(startDate).format('DD.MM.YYYY')} &mdash;{" "}
          {dayjs(endDate).format('DD.MM.YYYY')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{totalPrice}</Amount> 

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={`${bookingId}`} />
          <Menus.List id={`${bookingId}`}>
            <Menus.Button
              icon="👁️"
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon="⬇️"
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon="⬆️"
                onClick={() => handleCheckout(bookingId)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon="🗑️">Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.Window>
      </Modal> 
    </Table.Row>
  );
}

