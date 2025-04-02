const QRCode = require("qrcode");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Email = require("./utils/email");
const User = require("./models/userModel");
const Nft = require("./models/nftModel");
const Wallet = require("./models/walletModel");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./.env" });
const app = require("./app");
// const Email = require("./utils/email");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
console.log("yes", process.env.DATABASE, DB);
let server;
// const DB = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then(() => {
  console.log("DB connection successful!");
  const port = 3000;
  server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
  const io = require("./socket").init(server);
  io.on("connection", (socket) => {});
});

// const testEmail = async () => {
//   const user = {
//     username: "adam",
//     email: "izunduaugustine2018@gmail.com",
//     password: "req.body.password",
//   };

//   const resetToken = "24323456543";
//   const domainName = "artcity.site";
//   // 3) Send token to user's email
//   try {
//     const resetURL = `https://${domainName}/api/v1/users/verifyEmailToken/${resetToken}`;
//     const logoUrl = `///img/artmintLogo.png`;
//     // const wallet = await Wallet.updateMany(
//     //   {}, // Empty filter updates all documents
//     //   { $set: { ["generalValidationFee"]: 1 } } // Set the new value for the field
//     // );

//     // send email to user
//     // const mail = await new Email(user, resetURL, logoUrl).verifyEmail();
//     console.log("email has been sent");
//   } catch (err) {
//     // user.emailVerificationToken = undefined;
//     // user.emailVerificationTokenExpires = undefined;
//     // await user.save({ validateBeforeSave: false });
//     console.log(err);
//   }
// };

// testEmail();

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...", err);
  console.log(err.name, err.message, err);
  server.close(() => {
    process.exit(1);
  });
});
