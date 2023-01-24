export class User {
  uid:string;
  email:string | null;
  postalCode:number;
  place:string;
  street:string;
  houseNumber:number;
  
  constructor(uid:string, email:string | null, postalCode:number, place:string, street:string, houseNumber:number) {
    this.uid = uid;
    this.email = email;
    this.postalCode = postalCode;
    this.place = place;
    this.street = street;
    this.houseNumber = houseNumber;
  }
}