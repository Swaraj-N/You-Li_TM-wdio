const wp = require('../pageobjects/WelcomePage')
const usp = require('../pageobjects/UserSigninPage')
const ufp = require('../pageobjects/UserFunctionalitiesPage')
const fs = require("fs")
let credentials = JSON.parse(fs.readFileSync("./test/specs/TestData/multiplelogin.json"))
describe(`Login to the Application as Multiple Users (Performance Testing)`, async () => {
    it(`Navigating to the application`, async () => {
        await browser.maximizeWindow()
        await browser.url("http://rmgtestingserver/domain/Online_Tourism_Management_System");
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
    credentials.forEach(({ USERNAME, PASSWORD }) => {
        it(`Sign in as User`, async () => {
            await wp.usersignilink.click()
            await usp.usersigninAction(USERNAME, PASSWORD)
            await browser.waitUntil(()=>browser.$(`//li[.='${USERNAME}']`).isDisplayed(),{
                timeout:3000,
                timeoutMsg:"Logged in user name not displayed"
            })
            const loggedinusername = await browser.$(`//li[.='${USERNAME}']`)
            await expect(loggedinusername).toHaveText(`${USERNAME}`)
            await ufp.userlogoutaction()
        })
    })
})