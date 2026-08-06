import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config({ path: ".env" });
const transport=nodemailer.createTransport({
    service:"Gmail",
    port:465,
    secure:true,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS,
    },
});

export const sendOtpMail=async(to,otp) => {     //!to =email and otp =otp
    await transport.sendMail({
        from:process.env.EMAIL,
        to,
        subject:"Reset Your Password",
        html:`<p>Your otp for password reset is<b>${otp}</b>. ts expires in 1 min</p>`
    })
    
}