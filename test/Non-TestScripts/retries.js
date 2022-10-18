const wp = require('../pageobjects/WelcomePage')
const usp = require('../pageobjects/UserSigninPage')
const ufp = require('../pageobjects/UserFunctionalitiesPage')
const fs = require("fs")
const UserSigninPage = require("../pageobjects/UserSigninPage")
const WelcomePage = require("../pageobjects/WelcomePage")
let credentials = JSON.parse(fs.readFileSync("./test/specs/TestData/Login.json"))

describe.skip(`Retries Method Demonstration`, async () => {
    it(`Navigating to the application`, async () => {
        await browser.maximizeWindow()
        await browser.url("http://rmgtestingserver/domain/Online_Tourism_Management_System");
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
it(`Checking retries`, async function checkretry () {

    await wp.usersignilink.click()
    await usp.usersigninAction("swaraj926@gmail.com","swaraj@123")
    await ufp.userlogoutaction()
    await console.log(browser.getTitle());
    await expect(browser).toHaveTitle("TMS | Tourism Management")
})
})
