import { BookingSummaryData } from "@interfaces/IBookingTableData";

export const defaultDataBookings: BookingSummaryData[] = [
  {
    "idBooking":"1e507b5b-3272-4d9f-97aa-f9ea87d175fe",
    "titularId": "8412946448",
    "startDate":"01/03/2025",
    "endDate":"16/03/2025",
    "quantityDays":7,
    "room":{
       "id":"3a25453c-6370-4a37-bd9c-19c384235299",
       "price":101289,
       "taxes":80797,
       "type":"Familiar",
       "pathImg":"https://images.freeimages.com/images/large-previews/ce3/two-beds-1226735.jpg?fmt=webp&h=350",
       "hotelName":"Hermiston Inc",
       "city":"Bogota",
       "address":"85923 Crownhardt Park",
       "rating":5,
       "capacity":7
    },
    "guest":[
       {
          "firstName":"Emerson",
          "secondName":"Uriel",
          "firstLastname":"Vargas",
          "secondLastname":"Alba",
          "birthDate":"27/05/2002",
          "gender":"Masculino",
          "documentType":"CC",
          "documentNumber":"8412946448",
          "email":"emrvargaitaz@gmail.com",
          "phoneNumber":"4237157172"
       },
       {
          "firstName":"Wren",
          "secondName":"Valeda",
          "firstLastname":"Clunan",
          "secondLastname":"Malling",
          "birthDate":"23/08/2001",
          "gender":"Femenino",
          "documentType":"TC",
          "documentNumber":"4091073239",
          "email":"vmalling1@ycombinator.com",
          "phoneNumber":"3841695337"
       },
       {
          "firstName":"Minta",
          "secondName":"Brita",
          "firstLastname":"Gutteridge",
          "secondLastname":"Marsy",
          "birthDate":"23/05/2000",
          "gender":"Masculino",
          "documentType":"CE",
          "documentNumber":"0720345537",
          "email":"bmarsy2@phpbb.com",
          "phoneNumber":"4290827306"
       }
    ],
    "emergencyContact":{
       "firstName":"Laurette",
       "firstLastname":"Grimshaw",
       "secondLastname":"Petley",
       "phoneNumber":"7679406367"
    }
 }
];
