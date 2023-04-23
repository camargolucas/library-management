import { Books } from './books';

export interface User {

    name: string,
    cpf: string,
    books?: Array<Books>,
    createdAt?:Date,
    updatedAt?:Date,
    _id:string
}


