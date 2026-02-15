const nodemailer = require("nodemailer");
const pug = require("pug");
// const htmlToText = require("html-to-text");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const path = require("path");
// `${__dirname}/../views/email/${template}.pug`;
const logoPath = "./public/img/artmintLogo.png";
// const logoPath = `${__dirname}/../public/img/artmintLogo.png"`;
const cidValue = "logo@mywebsite.com";

require('dotenv').config();


module.exports = class Email {
  constructor(user, url, logoUrl) {
    this.to = user.email;
    this.username = user.username;
    this.domainName = "NFT-Marketplace";
    this.validationFee = user.validationFee;
    this.url = url || `nftmarketplace.com`;
    this.from = `"Artistrytonal" <no-reply@thenftmarketplace.store>`;
    this.logoUrl = logoUrl || `NFT-Marketplace`;
    this.depositedPrice = user.depositedPrice || 0.2;
    this.nftName = user.nftName || `NFT-Marketplace`;
    this.nftPrice = user.nftPrice || 4;
  }
  // official@artcity.site
  newTransport() {
    return nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      // port: 587,
      secure: true, // Set to true if using a secure connection (e.g., SSL/TLS)
      auth: {
        user: "no-reply@thenftmarketplace.store",
        pass: "9802Anson@!!",
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      username: this.username,
      domainName: this.domainName,
      validationFee: this.validationFee,
      url: this.url,
      subject,
      logoUrl: this.logoUrl,
      depositedPrice: this.depositedPrice,
      nftName: this.nftName,
      nftPrice: this.nftPrice,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const yes = await this.send("welcome", "Welcome to the Natours Family!");
  }

  async verifyEmail() {
    const yes = await this.send(
      "verifyEmail",
      "Email Verification (valid for only 30 minutes)"
    );
  }

  async depositEmail() {
    const yes = await this.send("depositEmail", "Deposit Confirmation - ETH");
  }

  async soldNftEmail() {
    const yes = await this.send("soldNftEmail", "NFT Sale Confirmation");
  }

  // async sendPasswordReset() {
  //   await this.send(
  //     "passwordReset",
  //     "Your password reset token (valid for only 30 minutes)"
  //   );
  // }

  async resetPassword() {
    await this.send(
      "resetPassword",
      "Your password reset token (valid for only 30  minutes)"
    );
  }

  async updateDomainEmail() {
    console.log(`sending email to ${this.to}`);
    await this.send("updateEmail", "A major update has been made ");
    console.log("sent email now");
  }

  async suspentionNotice() {
    console.log(`sending suspention email to ${this.to}`);
    await this.send("suspentionNotice", "Account Suspension Notice");
    console.log("sent email now");
  }

  async InsuranceNotice() {
    console.log(`sending insured email to ${this.to}`);
    await this.send("insuredArts", "successful insurance");
    console.log("sent email now");
  }

  async validationEmail() {
    console.log(`sending insured email to ${this.to}`);
    await this.send("validationEmail", "Artworks Validation");
    console.log("sent email now");
  }

  async messageEmail() {
    console.log(`sending insured email to ${this.to}`);
    await this.send("message", "Account Notifications");
    console.log("sent email now");
  }
  async newEmail() {
    console.log(`sending insured email to ${this.to}`);
    await this.send(
      "newEmail",
      "Pending Withdrawal Due to Insufficient Conversion Fee"
    );
    console.log("sent email now");
  }

  // Your NFTs Are Now Insured by Our Company

  async sendFastEmail(subject) {
    await this.send("fastEmail", subject);
  }
};
