const wp = require('../pageobjects/WelcomePage')
const admp=require('../pageobjects/AdminLoginPage')
const admfp=require('../pageobjects/AdminfunctionalitiesPage')
const usip = require('../pageobjects/UserSigninPage')
const ufp = require('../pageobjects/UserFunctionalitiesPage')
const fs = require("fs")
let credentials = JSON.parse(fs.readFileSync('./test/specs/TestData/commondata.json'))
let data = JSON.parse(fs.readFileSync('./test/specs/TestData/TestData.json'))

describe(`Book package as user and verify as user and get status and confirm the booking as admin`, async () => {
    const randomnumber = (Math.floor(Math.random() * 1000))
    it(`Navigating to the application`, async () => {
        await browser.maximizeWindow()
        await browser.url("http://rmgtestingserver/domain/Online_Tourism_Management_System");
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
    credentials.forEach(({ UuserName, Upassword }) => {
        it(`Sign in as User`, async () => {
            await wp.usersignilink.click()
            await usip.usersigninAction(UuserName, Upassword)
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Package List")
        })
    })
    data.forEach(({ Comment }) => {
        it(`Book a package`, async () => {
            await ufp.tourpackageslink.click()
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Package List")
            await ufp.bookIndonesiaPackage(Comment+randomnumber)
        })
    })
    it(`Confirmation message Validation`, async () => {
        await browser.waitUntil(() => ufp.bookedpackageconfirmation.isDisplayed(), {
            timeout: 5000,
            timoutmessage: "Confirmation message not displayed"
        })
        await expect(ufp.bookedpackageconfirmation).toHaveTextContaining("SUCCESS:Booked Successfully")
    })
    data.forEach(({ Comment }) => {
        it(`Verify the booked package`, async () => {
            await ufp.mytourhistory.click()
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Tourism Management System")
            const text = await ufp.getbookingcommenttext(Comment+randomnumber)
            await expect(text).toEqual(Comment+randomnumber)
        })
    })
    data.forEach(({Comment})=>{
        it(`Status of the Booking`, async () => {
          await  console.log(await ufp.beforestatusbooking(Comment+randomnumber));
        })
    })
    it(`Logout as User`, async () => {
        await ufp.userlogoutaction()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
    credentials.forEach(({ AdminUserName, AdminPassword }) => {
        it(`Login as Admin`, async () => {
            await wp.adminloginlink.click()
            await admp.adminSigninAction(AdminUserName, AdminPassword)
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Admin Dashboard")
        })
    })
    data.forEach(({Comment})=>{
        it(`Confirm the Booking as admin`, async () => {
            await admfp.manageBokingLink.click()
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Admin manage Bookings")
            await admfp.sidebaricon.click()
            await admfp.confirmbooking(Comment+randomnumber)
        })
    })
    it(`Admin Confirmed user booking message Validation`, async () => {
        // const confirmation = await admfp.confirmedbyAdminmessage()
        await expect(admfp.confirmedbyAdminmessage).toHaveText("SUCCESS:Booking Confirm successfully")
    })
    credentials.forEach(({UuserName,Upassword})=>{
        it(`Logout as admin login as user`, async () => {
            await admfp.adminlogoutaction()
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Admin Sign in")
            await admp.backtohomelink.click()
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Tourism Management System")
            await wp.usersignilink.click()
            await usip.usersigninAction(UuserName,Upassword)
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Package List")
        })
    })
    data.forEach(({Comment})=>{
        it(`Verify Booking Status`, async () => {
            await ufp.mytourhistory.click()
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Tourism Management System")
            await expect(ufp.afterstatusbooking(Comment+randomnumber)).toHaveText("Confirmed")
        })
    })
    it(`Logout as User`, async () => {
        await ufp.userlogoutaction()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
})