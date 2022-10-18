describe.skip(`Find Elements`,async()=>{
    it(`Navigating to the application`, async () => {
        await browser.maximizeWindow()
        await browser.url("http://rmgtestingserver/domain/Online_Tourism_Management_System");
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
    it(`Sign in as User`, async () => {
        const signinLink = await browser.$("//a[.='/ Sign In']")
        signinLink.click()
        const emailidTextfield = await browser.$("//input[@placeholder='Enter your Email']")
        const passwordTextfield = await browser.$("//h3[.='Signin with your account ']/following::input[@name='password']")
        const signinbutton = await browser.$("//input[@name='signin']")
        await emailidTextfield.click()
        await emailidTextfield.setValue(`swaraj926@gmail.com`)
        await passwordTextfield.click()
        await passwordTextfield.setValue(`swaraj@123`)
        await signinbutton.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Package List")
    })
    it(`Fetch all Booking issue description`,async()=>{
        const issueticketslink = await browser.$("//a[.='Issue Tickets']")
        issueticketslink.click()
        const Issueticketspage = await browser.$("//h3[.='Issue Tickets']")
        await expect(Issueticketspage).toHaveText("Issue Tickets")
        // let booking_issue=browser.$$("//tbody/tr/td[4]")
        for (let index = 1; index <15; index++) {
           let textsed =await browser.$(`(//tbody/tr/td[4])[${index}]`).getText()
           console.log(textsed);
        }
    })
})