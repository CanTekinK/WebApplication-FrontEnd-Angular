import { Photo } from './Photo';


export class User
{
    id:number;
    email:string; 
    nameSurname :string;
    phoneNumber :string;
    userPhotos:Photo[];
}