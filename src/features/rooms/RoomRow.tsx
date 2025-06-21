import styled from "styled-components";
// import { useState } from "react";

import type { Room } from "../../services/apiRooms";
import { deleteRoom } from "../../services/apiRooms";
import { useAppDispatch } from "../../hooks/hooks";
// import { CreateRoom } from "./CreateRoom";
// import dayjs from "dayjs";
// import { formatCurrency } from "../../utils/helpers";
// import CreateCabinForm from "./CreateCabinForm";
// import { useDeleteCabin } from "./useDeleteCabin";
// import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
// import { useCreateCabin } from "./useCreateCabin";
// import Modal from "../../ui/Modal";
// import ConfirmDelete from "../../ui/ConfirmDelete";
// import Table from "../../ui/Table";
// import Menus from "../../ui/Menus";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Price = styled.div`
  font-weight: 600;
`;

const Discount = styled.div`
  font-weight: 500;
  color: var(--color-green-700);
`;

export interface RoomRowProps {
  room: Room;
}

export function RoomRow({ room }: RoomRowProps) {
  const dispatch = useAppDispatch()

  // const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false) 

  const {
    id,
    // created_at: createdDate,
    name,
    maxPeople,
    price,
    discount,
    image, 
    // discription,
  } = room;

// const formatedDate = dayjs(createdDate).format('DD.MM.YYYY');

   return (
    <>
      <TableRow>
        <Img src={image}/>
        <Cabin>{name}</Cabin>
        <div>max people - {maxPeople}</div>
        <Price>{price} $</Price>
        {discount !== null ? 
          <Discount>{discount} $</Discount>
         : <span>NO</span>
        }

        {/* <p>{formatedDate}</p> */}
        <div>
          {/* <button onClick={()=> setShowUpdateForm(prev => !prev)}>Edit</button> */}
          <button onClick={()=> dispatch(deleteRoom(id))}>Delete</button>
        </div>
      </TableRow>
    
    </>
  );
}

