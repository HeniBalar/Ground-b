const nodemailer = require('nodemailer');
const Admin = require('../../models/Admin');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dannie.kautzer28@ethereal.email',
        pass: 'RRjyT1ZMPNZT5kAa1a'
    }
});

exports.adminEmailVerification = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "User not found with this email address!" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpires = Date.now() + 5 * 60 * 1000
        // console.log("OTP============", otp);

        const updateAdmin = await Admin.findOneAndUpdate({ email }, { $set: { otp, otpExpires } }, { new: true });

        const mailOptions = {
            from: 'no-reply@company.com',
            to: email,
            subject: 'Verification for reset password',
            text: `Verification OTP is ${otp}. Don't share this OTP with anyone.`
        };

        // Send email
        await transporter.sendMail(mailOptions, function (error, info) {
            // console.log("info===>>>", info)
            if (error) {
                console.log(error);
            } else { console.log('Email sent successfully') }
        });

        return res.status(200).send({ message: "OTP has been sent to your email address." });
    } catch (error) {
        console.error({ error: error.message });
        return res.status(500).send({ error: error.message });
    }
};

exports.adminVerifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).send({ message: "Admin not found with this email address!" });
        }

        if (admin.otp !== otp || admin.otpExpires < Date.now()) {
            return res.status(400).send({ message: "Invalid or expired OTP!" });
        }

        admin.otp = undefined;
        admin.otpExpires = undefined;
        await admin.save();

        return res.status(200).send({ message: "OTP verified successfully." });
    } catch (error) {
        console.error({ error: error.message });
        return res.status(500).send({ error: error.message });
    }
};