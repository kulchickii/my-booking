import styled from "styled-components";
import { useDeleteRoomMutation } from "../../services/apiRooms";
import type { RoomRowProps } from "./CreateRoom";
import { CreateRoom } from "./CreateRoom";

import {TrashIcon ,PencilIcon } from '@heroicons/react/24/outline'
import { Modal } from "../../ui/Modal";
import { ConfirmDelete } from "../../ui/ConfirmDelete";
import { Table } from "../../ui/Table";
import { Menus } from "../../ui/Menus";

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

export const RoomRow = ({ room }: RoomRowProps) =>  {
  const [deleteRoom, {isLoading: isDeleting}] = useDeleteRoomMutation()
  const {id, name, maxPeople, price, discount, image } = room

   return (
      <Table.Row>
        <Img src={image}/>
        <Cabin>{name}</Cabin>
        <div>max people - {maxPeople}</div>
        <Price>{price} $</Price>
        {discount !== 0 ? 
          <Discount>{discount} %</Discount>
         : <span>—</span>
        }
     
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id.toString()} />

              <Menus.List id={id.toString()}>
                <Modal.Open opens = 'edit'>
                  <Menus.Button icon = {<PencilIcon/>}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens = 'delete'>
                  <Menus.Button icon = {<TrashIcon/>}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
 
                <Modal.Window name = 'edit'>
                  <CreateRoom room = {room}/>
                </Modal.Window>

              <Modal.Window name='delete'>
                <ConfirmDelete 
                  resourceName="cabins"
                  disabled={isDeleting}
                  onConfirm={() => deleteRoom(id)} 
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal> 
        </div>
      </Table.Row>
  )
}

