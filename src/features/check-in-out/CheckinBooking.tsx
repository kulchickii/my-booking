import { useEffect, useState } from "react";
import styled from "styled-components";
import { useBooking } from "../bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import BookingDataBox from "../bookings/BookingDataBox";
import { Checkbox } from "../../ui/Checkbox";
import {Button} from "../../ui/Button";
import { useUpdateBookingMutation } from "../../services/apiBooking";
import { useNavigate } from "react-router-dom";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
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

export const CheckinBooking=()=>{
  const navigate = useNavigate();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakFast] = useState(false);

  const {booking, isLoading} = useBooking() // bookingId
  const [updateBooking, { isLoading: isCheckingIn }] = useUpdateBookingMutation();
  
  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  const moveBack = useMoveBack();

  if (isLoading ) return <div>Loading...</div>;
  
  const {
    id: bookingId,
    guest,
    totalPrice,
    numGuest,
    hasBreakfast,
    numDate,
  } = booking;

  const optionalBreakfastPrice = 15 *  numDate * numGuest;
  
  const handleCheckin = () => {
    if (!confirmPaid) return

   const extras = addBreakfast 
      ? {
        hasBreakfast: true,
        extrasPrice: optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice,
      }
    : {}

    updateBooking({
        id: bookingId, 
        update: { 
          ...extras,
          status: "checked-in",
          isPaid: true,
        }
      }
    )
    navigate("/bookings")
  }
  

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakFast((add) => !add);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {optionalBreakfastPrice}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guest.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? totalPrice
            : `${totalPrice + optionalBreakfastPrice}$ (${totalPrice}$ + ${optionalBreakfastPrice}$)`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button 
          onClick={handleCheckin} 
          disabled={!confirmPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

