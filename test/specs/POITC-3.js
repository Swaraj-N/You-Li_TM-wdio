const wp = require('../pageobjects/WelcomePage')
const usip = require('../pageobjects/UserSigninPage')
const ufp = require('../pageobjects/UserFunctionalitiesPage')
const fs = require("fs")
let credentials = JSON.parse(fs.readFileSync('./test/specs/TestData/commondata.json'))
let data = JSON.parse(fs.readFileSync('./test/specs/TestData/TestData.json'))

describe(`Book package as user and verify it in my tour history`, async () => {
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
            await ufp.bookIndonesiaPackage(Comment + randomnumber)
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
    it(`Logout as User`, async () => {
        await ufp.userlogoutaction()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
})