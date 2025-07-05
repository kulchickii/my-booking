import { CreateRoom } from "./CreateRoom"
import { Modal } from "../../ui/Modal"
import { Button } from "../../ui/Button"

export const AddRoom = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="room-form">
          <Button>Add new room</Button>
        </Modal.Open>

        <Modal.Window name="room-form">
          <CreateRoom  />
        </Modal.Window>
      </Modal>
    </div>
  )
}

 