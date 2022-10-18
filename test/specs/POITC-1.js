const wp = require('../pageobjects/WelcomePage')
const admp=require('../pageobjects/AdminLoginPage')
const admfp=require('../pageobjects/AdminfunctionalitiesPage')
const usup=require('../pageobjects/UserSignUpPage')
const fs = require("fs")
let credentials = JSON.parse(fs.readFileSync('./test/specs/TestData/commondata.json'))
let signupdetails=JSON.parse(fs.readFileSync('./test/specs/TestData/TestData.json'))

describe(`Create User and Check Count`, async () => {
    let Ucountbefore
    let Ucountafter
    let UCBeforeNumber
    let UCAfterNumber
    const randomnumber = (Math.floor(Math.random() * 1000))
    it(`Navigating to the application`, async () => {
        await browser.maximizeWindow()
        await browser.url("http://rmgtestingserver/domain/Online_Tourism_Management_System");
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
   credentials.forEach(({AdminUserName,AdminPassword})=>{
    it(`Login as Admin`, async () => {
        await wp.adminloginlink.click()
        await admp.adminSigninAction(AdminUserName,AdminPassword)
         await console.log(browser.getTitle());
         await expect(browser).toHaveTitle("TMS | Admin Dashboard")
     })
   }) 
    it(`Get the User Count`, async () => {
        Ucountbefore=await admfp.usercount.getText()
        UCBeforeNumber = Number(Ucountbefore)
        console.log(typeof (UCBeforeNumber));
       await admfp.adminlogoutaction()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Admin Sign in")
        admp.backtohomelink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
    signupdetails.forEach(({CreateUserName,CreateMobileNumber,CreateEmail,CreatePassword})=>{
        it(`Navigate to application and Create a new User`, async () => {
            await wp.usersignuplink.click()
            await usup.userSignUpAction(CreateUserName+randomnumber,CreateMobileNumber+randomnumber,randomnumber+CreateEmail,CreatePassword+randomnumber)
        })
    })
    it(`Confirmation message Validation`, async () => {
        await browser.waitUntil(() => wp.userCreatedConfirmation.isDisplayed(), {
            timeout: 5000,
            timoutmessage: "Confirmation message not displayed"
        })
        const confirmationmessage = wp.userCreatedConfirmation.getText()
        console.log(confirmationmessage);
        await expect(await wp.userCreatedConfirmation).toHaveTextContaining("Info successfully")
    })
    credentials.forEach(({AdminUserName,AdminPassword})=>{
        it(`Login as Admin to Verify Increased User Count`, async () => {
            await wp.adminloginlink.click()
            await admp.adminSigninAction(AdminUserName,AdminPassword)
             await console.log(browser.getTitle());
             await expect(browser).toHaveTitle("TMS | Admin Dashboard")
         })
       }) 
    it(`Get the updated User Count`, async () => {
        Ucountafter = await admfp.usercount.getText()
        UCAfterNumber = Number(Ucountafter)
        await admfp.adminlogoutaction()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Admin Sign in")
        await admp.backtohomelink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
        await expect(UCAfterNumber).toBeGreaterThan(UCBeforeNumber)
        console.log(`User count before creating user is ${UCBeforeNumber} and User count after creating user is ${UCAfterNumber}`);
    })
})