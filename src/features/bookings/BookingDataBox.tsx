import type React from "react";
import styled from "styled-components";
import type { Booking } from "../../services/apiBooking";

import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";
import DataItem from "../../ui/DataItem";

dayjs.extend(isToday);
dayjs.extend(relativeTime);

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div<{$isPaid: boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.$isPaid  ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.$isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;
interface BookingProps {
  booking: Booking
}

export const BookingDataBox: React.FC<BookingProps> = ({ booking }) => {
  const {
    created_at,
    startDate,
    endDate,
    numDate,
    numGuest,
    roomPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observation,
    isPaid,
    guest: {
      fullName: guestName,
      email,
      nationality,
      passport,
    },
    room: {
      name: roomName,
      // image,
      // price,
    },
} = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          🏠
          <p>
            {numDate} nights in Cabin <span>{roomName}</span>
          </p>
        </div>

        <p>
          {dayjs(startDate).format("ddd, MMM DD YYYY")} (
          {dayjs(startDate).isToday()
            ? "Today"
            : dayjs(startDate).fromNow()}
          ) &mdash; {dayjs(endDate).format("ddd, MMM DD YYYY")}
        </p>
      </Header>

      <Section>
        <Guest>
          {nationality}
          <p>
            {guestName} {numGuest > 1 ? `+ ${numGuest - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>Passport {passport}</p>
        </Guest>

        {observation && (
          <DataItem
            icon="🗨️"
            label="Observations"
          >
            {observation}
          </DataItem>
        )}

        <DataItem icon="✅" label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <Price $isPaid={isPaid}>
          <DataItem icon="💲" label={`Total price`}>
            {totalPrice} $

            {hasBreakfast &&
              ` (${roomPrice} $ cabin + ${(extrasPrice)}$ breakfast)`}
          </DataItem>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {dayjs(created_at).format("ddd, MMM DD YYYY, hh:mm A")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;