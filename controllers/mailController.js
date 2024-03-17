const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
    const {email} = req.body
    const {name} = req.body
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.MAIL_ID,
                pass: process.env.MAIL_PASS
            }
        });

        await transporter.sendMail({
            from: '"TechAzura 2024" <info.techazura@gmail.com>',
            to: `${email}`,
            subject: "TechAzura 2024 Confirmation!", 
            text: `Hello ${name}, Your Registration for TechAzura 2024 has been confirmed.`, 
            html: `<b>Hello ${name}, Your Registration for TechAzura 2024 has been confirmed.</b>`, 
          });
          res.send({name:name, email:email})
        //   res.send("Email Sent")

    } catch (error) {
        res
            .status(400)
            .json({
                status: 'fail',
                data: req.body
            })
    }
}