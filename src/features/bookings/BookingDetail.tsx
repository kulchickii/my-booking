import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import { Modal } from "../../ui/Modal";
import { ConfirmDelete } from "../../ui/ConfirmDelete";
import { useNavigate } from "react-router-dom";
import { useDeleteBookingMutation, useUpdateBookingMutation } from "../../services/apiBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "./BookingDataBox";
import { useBooking } from "./useBooking";
import { Button } from "../../ui/Button";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Tag = styled.span<{ $type: string }>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  color: var(--color-${(props) => props.$type}-700);
  background-color: var(--color-${(props) => props.$type}-100);
`;

const ButtonText = styled.button`
  color: var(--color-brand-600);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);

  &:hover,
  &:active {
    color: var(--color-brand-700);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
`;
 
export const  BookingDetail = () => {
  const {booking, isLoading, bookingId} = useBooking()

  const [updateBooking, { isLoading: isCheckingOut }] = useUpdateBookingMutation();
  const [deleteBooking, {isLoading: isDeleting}]=useDeleteBookingMutation()

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <div>Загрузка...</div>;
  if (!booking) return <div>Пусто...</div>

  const handleCheckout = () => {
        updateBooking({
        id: bookingId, 
        update: { 
          status: "checked-out",
          isPaid: true,
        }
      })
    } 
  
  const status = booking.status

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag $type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (<Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>)}

        {status === "checked-in" && (
          <Button
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
           ⬆️ Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() =>deleteBooking(bookingId).then(()=>navigate("/bookings"))}
            />
          </Modal.Window>
        </Modal> 

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}