export interface Room {
  id: number,
  created_at: string,
  name: string,
  maxPeople: number,
  price: number,
  discount: number,
  image: string ,
  discription: string,
}

export interface RoomRowProps {
  room: Room
}

export interface RoomForm {
  id?: number,
  created_at: string,
  name: string,
  maxPeople: number,
  price: number,
  discount: number,
  image: string ,
  discription: string,
}

