import { useForm } from "react-hook-form"
import { useCreateRoomMutation, useUpdateRoomMutation } from "../../services/apiRooms";
import type { Room, RoomForm } from "../../types";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { FormRow } from "../../ui/FormRow";
import { Label } from "../../ui/Label";
import { Error } from "../../ui/Error";

export interface RoomRowProps {
  room: Room,
  onCloseModal?: () => void
}
export const CreateRoom: React.FC<RoomRowProps> = ({room, onCloseModal}) => {
  const [createRoom, {isLoading}] = useCreateRoomMutation()
  const [updateRoom] = useUpdateRoomMutation()

  const {id: editId, ...editValue} = room ?? {} 
  const isEditRoom = !!editId

  const {register, handleSubmit, formState: {errors}, reset} = useForm<RoomForm>({
    defaultValues: isEditRoom ? editValue : {} 
  })

  const onSubmitForm = (formCreateRoom: RoomForm )=> { 
    const image = typeof formCreateRoom.image === "string" 
      ? formCreateRoom.image 
      : formCreateRoom.image[0]
   
    if(isEditRoom) {
      updateRoom({ updateRoom: {...formCreateRoom, image}, id: editId })
    } else {
      createRoom({...formCreateRoom, image})
    }  
    reset()  
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)} type={onCloseModal ? 'modal' : 'regular'}>
      {/* ИМЯ НОМЕРА/ДОМИКА */}
      <FormRow >
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register('name',{
          required: "this field is required"
          })}
          disabled = {isLoading}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

        {/* Максимум человек */}
      <FormRow>
        <Label htmlFor="maxPeople">Maximum people</Label>
        <Input type="number" id="maxPeople"{...register('maxPeople',{
          required: "this field is required",
          min: {value: 1, message: "Minimum people - 1"}
          })}
          disabled = {isLoading}
          />
        {errors?.maxPeople?.message && <Error>{errors.maxPeople.message}</Error>}
      </FormRow>

        {/* ЦЕНА НОМЕРА/ДОМИКА */}
      <FormRow>
        <Label htmlFor="price">Price</Label>
        <Input 
          type="number" 
          id="price" 
          {...register('price', {
            required: "this field is required",
            min: {value: 20, message: "Minimum price - 20"}
          })}
          disabled = {isLoading}
        />
        {errors?.price?.message && <Error>{errors.price.message}</Error>}
      </FormRow>

        {/* СКИДКА НОМЕРА/ДОМИКА */}
      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input 
          type="number" 
          id="discount" 
          {...register('discount', {
            validate:(priceInput) => priceInput <= 80 ? true : "Discount should be less than or equal to 80",
            setValueAs: (num) => num === "" ? 0 : +num
          })}
          disabled = {isLoading}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

          {/* ОПИСАНИЕ НОМЕРА/ДОМИКА */}
      <FormRow>
        <Label htmlFor="discription">Description</Label>
        <Textarea 
          id="description" 
          defaultValue=""
          {...register('discription', {
            required: "this field is required",
          })}
          disabled = {isLoading}
         />
         {errors?.discription?.message && <Error>{errors.discription.message}</Error>}  
      </FormRow>

          {/* ФОТО НОМЕРА/ДОМИКА */}
      <FormRow>
        <Label htmlFor="image">Photo room</Label>
        <FileInput 
          id="image" 
          accept="image/*" 
          type="file"
          {...register('image', {
            required: isEditRoom ? false : "this field is required"  ,
          })}
        />
      </FormRow>

          {/* Кнопки  */}
      <FormRow>
        <Button variation="secondary" type="reset" onClick={()=> onCloseModal?.()}>Cancel</Button>
        <Button disabled = {isLoading}>{isEditRoom ?"Edit room"  : "Add room"}</Button>
      </FormRow>

    </Form>
  )
} 