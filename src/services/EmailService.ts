import { BookingSummaryData } from "@interfaces/IBookingTableData";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const userGmail= "emrvargaitaz@gmail.com";
const userToken = "ewjc ofqn wgzb uomd";

export class EmailService{

    static async sendConfirmationEmail(data: BookingSummaryData, email: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: userGmail,
                pass: userToken
            }
        })

        const mailOptions: Mail['options'] = {
            from: userGmail,
            to: email,
            subject: 'Confirmación de reserva de hospedaje',
            html: this.formatTemplate(data)
        }
        try {
            let response = await transporter.sendMail(mailOptions);
            console.log(`Email send ${response.response}`);
            return Promise.resolve();
        } catch (error) {
            console.log(`Fail sending email ${error}`);
            return Promise.resolve();
        }
    }

    private static formatTemplate(data: BookingSummaryData): string {
        const titular = data.guest.find((guest)=> {
            return guest.documentNumber === data.titularId
        })
        const titularFullName = [titular?.firstName, titular?.firstLastname].join(' ');
        const totalPrice = (data.room.price*data.quantityDays)+data.room.taxes
        return `
            <html>
                <head>
                    <meta charset="UTF-8">
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
                </head>
                <body style="font-family: Roboto">
                    <div style="text-align: center; background-color: #FC7F14; color: white; padding: 40px 0px">
                    <h1 style="margin: auto 3px" >Tu reserva está lista!</h1>
                    <h2 style="font-weight: 400; margin: auto 3px">Gracias por elegirnos</h2>
                    </div>
                    <p style="text-align: justify;font-size: 14px; font-weight: 350">Hola, <strong>${titularFullName}</strong> tu reserva <strong>${data.idBooking}</strong> se ha registrado exitosamente.</p>
                    <div style="padding: 0% 25%">
                        <h3 style="text-align: center;">Detalles de la reserva</h3>
                        <table width="100%" cellpadding="5">
                        <colgroup>
                            <col style="padding-right: 20px; font"/>
                            <col />
                        </colgroup>
                        <tr>
                            <td style="">Hotel</td>
                            <td style="text-align: right; font-weight: 300">${data.room.hotelName}</td>
                        </tr>
                        <tr>
                            <td style="">ciudad</td>
                            <td style="text-align: right; font-weight: 300">${data.room.city}</td>
                        </tr>
                        <tr>
                            <td style="">dirección</td>
                            <td style="text-align: right; font-weight: 300">${data.room.address}</td>
                        </tr>
                        <tr>
                            <td style="">Precio Total</td>
                            <td style="text-align: right; font-weight: 300">$ ${totalPrice}</td>
                        </tr>
                        <tr>
                            <td style="">Duracion estadia</td>
                            <td style="text-align: right; font-weight: 300">${data.quantityDays} dias</td>
                        </tr>
                        <tr>
                            <td style="">Fecha de inicio</td>
                            <td style="text-align: right; font-weight: 300">${data.startDate}</td>
                        </tr>
                        <tr>
                            <td style="">Fecha Salida</td>
                            <td style="text-align: right; font-weight: 300">${data.endDate}</td>
                        </tr>
                        <tr>
                            <td style="">Huespedes</td>
                            <td style="text-align: right; font-weight: 300">${data.guest.length}</td>
                        </tr>
                        </table>
                    </div>
                </body>
            </html>`;
    }

}