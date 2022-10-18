const wp = require('../pageobjects/WelcomePage')
const admp = require('../pageobjects/AdminLoginPage')
const admfp = require('../pageobjects/AdminfunctionalitiesPage')
const usip = require('../pageobjects/UserSigninPage')
const ufp = require('../pageobjects/UserFunctionalitiesPage')
const fs = require("fs")
let credentials = JSON.parse(fs.readFileSync('./test/specs/TestData/commondata.json'))
let data = JSON.parse(fs.readFileSync('./test/specs/TestData/TestData.json'))

describe(`Create an issue as user and make review comments as admin and verify the review comment as user`, async () => {
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
            const loggedinusername = await browser.$(`//li[.='${UuserName}']`)
            await expect(loggedinusername).toHaveText(`${UuserName}`)
        })
    })
    data.forEach(({ Issue, Issuedescription }) => {
        it(`Create an Booking issue`, async () => {
            uservalidation = await Issuedescription + randomnumber
            await ufp.createanissueaction(Issue, Issuedescription + randomnumber)
        })

    })
    it(`Confirmation message Validation`, async () => {
        await browser.waitUntil(() => ufp.issueconfirmation.isDisplayed(), {
            timeout: 5000,
            timoutmessage: "Confirmation message not displayed"
        })
        await expect(ufp.issueconfirmation).toHaveTextContaining("Info successfully")
    })
    data.forEach(({ Issuedescription }) => {
        it(`Validate whether issue is Created as a User and logout`, async () => {
            await ufp.issueticketslink.click()
            await expect(ufp.issuepageheading).toHaveText("Issue Tickets")
            const created_issue = await ufp.givendescription(Issuedescription+randomnumber)
            const validation = await created_issue.getText()
            let uservalidation = await Issuedescription+randomnumber
            await console.log(Issuedescription+randomnumber);
            await expect(uservalidation).toEqual(validation)
            await ufp.userlogoutaction()
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Tourism Management System")
        })
    })
    credentials.forEach(({ AdminUserName, AdminPassword }) => {
        it(`Login as Admin`, async () => {
            await wp.adminloginlink.click()
            await admp.adminSigninAction(AdminUserName, AdminPassword)
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Admin Dashboard")
        })
    })
    data.forEach(({ Issuedescription }) => {
        it(`Manage issue and view`, async () => {
            await admfp.manageissuesidebarmenu.click()
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Admin manage Issues")
            await admfp.viewlink(Issuedescription+randomnumber)
        })
    })
    data.forEach(({ Remark }) => {
        it(`Update remark as Admin`, async () => {
            await admfp.switchtoupdatewindow()
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitleContaining("Update Compliant")
            await admfp.updateremark(Remark+randomnumber)
            console.log(admfp.remarkconfirmationmessage);
            await browser.closeWindow()
        })
    })
    credentials.forEach(({ UuserName, Upassword }) => {
        it(`Logout as admin login as user and check review comment`, async () => {
            await admfp.switchbacktoadminwindow()
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Admin manage Issues")
            await admfp.adminlogoutaction()
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Admin Sign in")
            await admp.backtohomelink.click()
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Tourism Management System")
            await wp.usersignilink.click()
            await usip.usersigninAction(UuserName, Upassword)
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Package List")
        })
    })
    data.forEach(({ Remark }) => {
        it(`Validate review comment`, async () => {
            await ufp.issueticketslink.click()
            await expect(ufp.issuepageheading).toHaveText("Issue Tickets")
            const adminreviewvalidation = await ufp.adminreview(Remark+randomnumber)
            await expect(adminreviewvalidation).toEqual(Remark+randomnumber)
            await ufp.userlogoutaction()
            await console.log(browser.getTitle());
            await expect(browser).toHaveTitle("TMS | Tourism Management System")
        })
    })

})