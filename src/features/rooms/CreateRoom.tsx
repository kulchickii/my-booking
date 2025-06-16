import styled from "styled-components";
import { useForm } from "react-hook-form"

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/TextArea";
import { createRoom, type Room } from "../../services/apiRooms";
import { useAppDispatch } from "../../hooks/hooks";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export const CreateRoom = () => {
  const {register, handleSubmit, formState, reset } = useForm<Room>()
  const {errors} = formState

  const dispatch = useAppDispatch()

  const onSubmitForm = (newRoom: Room): void=> {
    const rrr = {...newRoom, image: newRoom.image[0]}
    const r1: string = rrr.image.name
    console.log(r1);

    // console.log(newRoom.image.at(0));
    
    // dispatch(createRoom(newRoom)).then(res=>{
    //   if(res.meta.requestStatus === 'fulfilled') reset()
    // })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      {/* ИМЯ НОМЕРА/ДОМИКА */}
      <FormRow >
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register('name',{
          required: "this field is required"
          })}
          // disabled = {надо переменную которая будет следить за загрузкой}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

        {/* Максимум человек */}
      <FormRow>
        <Label htmlFor="maxPeople">Maximum people</Label>
        <Input type="text" id="maxPeople"{...register('maxPeople',{
          required: "this field is required",
          min: {value: 1, message: "Minimum people - 1"}
          })}
          // disabled = {надо переменную которая будет следить за загрузкой}
          />
        {errors?.maxPeople?.message && <Error>{errors.maxPeople.message}</Error>}
      </FormRow>

        {/* ЦЕНА НОМЕРА/ДОМИКА */}
      <FormRow>
        <Label htmlFor="price">Price</Label>
        <Input 
          type="number" 
          id="price" 
          defaultValue={0}
          {...register('price', {
            required: "this field is required",
            min: {value: 20, message: "Minimum price - 20"}
          })}
          // disabled = {надо переменную которая будет следить за загрузкой}
        ></Input>
        {errors?.price?.message && <Error>{errors.price.message}</Error>}
      </FormRow>

        {/* СКИДКА НОМЕРА/ДОМИКА */}
      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input 
          type="number" 
          id="discount" 
          {...register('discount', {
            required: "this field is required",
            validate:(priceInput) => priceInput <= 80 ? true : "Discount should be less than or equal to 80"
          })}
          // disabled = {надо переменную которая будет следить за загрузкой}
        ></Input>
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

          {/* ОПИСАНИЕ НОМЕРА/ДОМИКА */}
      <FormRow>
        <Label 
          htmlFor="discription" 
          // disabled = {надо переменную которая будет следить за загрузкой}
        >Description</Label>
        <Textarea 
          id="discription" 
          defaultValue=""
          {...register('discription', {
            required: "this field is required",
          })}
          // disabled = {надо переменную которая будет следить за загрузкой}
         />
         {errors?.discription?.message && <Error>{errors.discription.message}</Error>}  
      </FormRow>

          {/* ФОТО НОМЕРА/ДОМИКА */}
      <FormRow>
        <Label htmlFor="image">Foto room</Label>
        <FileInput 
          id="image" 
          accept="image/*" 
          type="file"
          {...register('image', {
            required: "this field is required",
          })}
        ></FileInput>
      </FormRow>

          {/* Кнопки  */}
      <FormRow>
        <Button variation="secondary" type="reset" >Cancel</Button>
        <Button
          // disabled = {надо переменную которая будет следить за загрузкой}
        >Edit room</Button>
      </FormRow>

    </Form>
  )
} 