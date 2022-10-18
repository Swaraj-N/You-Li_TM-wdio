describe(`Create an issue as user and make review comments as admin and verify the review comment as user`, async () => {
    const randomnumber = (Math.floor(Math.random() * 1000))
    let issuedesc = "I have a booking issue"
    let uservalidation = issuedesc + randomnumber
    let remark = "updated " + issuedesc + randomnumber
    it(`Navigating to the application-reg`, async () => {
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
    it(`Create and Booking issue`, async () => {
        const writeuslink = await browser.$("//a[.=' / Write Us ']")
        writeuslink.click()
        browser.waitUntil(() => browser.$("//h4[.='HOW CAN WE HELP YOU']").isDisplayed(), {
            timeout: 3000,
            timeoutMsg: "Page not loaded"
        })
        const issuedropdown = await browser.$("//select[@name='issue']")
        const descriptiontextfield = await browser.$("//input[@placeholder='description']")
        const submitbutton = await browser.$("//button[.='Submit']")
        await issuedropdown.selectByVisibleText("Booking Issues")
        await descriptiontextfield.setValue(`${issuedesc}${randomnumber}`)
        await submitbutton.click()
    })
    it(`Confirmation message Validation`, async () => {
        await browser.waitUntil(() => browser.$("//h4[contains(.,'Info')]").isDisplayed(), {
            timeout: 5000,
            timoutmessage: "Confirmation message not displayed"
        })
        const confirmation = await browser.$("//h4[contains(.,'Info')]")
        await expect(confirmation).toHaveTextContaining("Info successfully")
    })
    it(`Validate whether issue is Created as a User and logout`, async () => {
        const issueticketslink = await browser.$("//a[.='Issue Tickets']")
        issueticketslink.click()
        const Issueticketspage = await browser.$("//h3[.='Issue Tickets']")
        await expect(Issueticketspage).toHaveText("Issue Tickets")
        const givendescription = await browser.$(`//h3[.='Issue Tickets']/parent::div/descendant::td[.="${issuedesc}${randomnumber}"]`)
        await browser.$(`//h3[.='Issue Tickets']/parent::div/descendant::td[.="${issuedesc}${randomnumber}"]`).scrollIntoView()
        const validation = await givendescription.getText()
        await expect(uservalidation).toEqual(validation)
        const logoutlink = await browser.$("//a[.='/ Logout']")
        await logoutlink.scrollIntoView()
        await logoutlink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
    it(`Login as Admin`, async () => {
        const adminloginlink = await browser.$("//a[.='Admin Login']")
        await adminloginlink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Admin Sign in")
        const AdminUsernameTextfield = await browser.$("//input[@name='username']")
        const AdminPasswordTextfield = await browser.$("//input[@name='password']")
        const SigninButton = await browser.$("//input[@name='login']")
        await AdminUsernameTextfield.setValue("admin")
        await AdminPasswordTextfield.setValue("Test@123")
        await SigninButton.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Admin Dashboard")
    })
    it(`Manage issue and view`, async () => {
        const manageissuesidebar = await browser.$("//span[.='Manage Issues']")
        await manageissuesidebar.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Admin manage Issues")
        const viewlink = await browser.$(`//td[.="${uservalidation}"]/parent::tr/descendant::a[.="View "]`)
        viewlink.scrollIntoView()
        viewlink.click()
    })
    it(`Update remark as Admin`, async () => {
        await browser.switchWindow(`Update Compliant`)
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitleContaining("Update Compliant")
        const remarktextarefield = await browser.$("//textarea[@name='remark']")
        await remarktextarefield.setValue(`${remark}`)
        const updatebutton = await browser.$("//input[@type='submit']")
        await updatebutton.click()
        const confirmationmessage = await browser.$("//div[@class='succWrap']")
        const success = await confirmationmessage.getText()
        console.log(success);
        await browser.closeWindow()
    })
    it(`Logout as admin login as user and check review comment`, async () => {
        await browser.switchWindow("TMS | Admin manage Issues")
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Admin manage Issues")
        const admindropdown = await browser.$("//i[@class='fa fa-angle-down']")
        await admindropdown.scrollIntoView()
        admindropdown.click()
        const logoutlink = await browser.$("//a[.=' Logout']")
        logoutlink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Admin Sign in")
        const backtohomelink = await browser.$("//a[.='Back to home']")
        backtohomelink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
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
    it(`Validate review comment`, async () => {
        const issueticketslink = await browser.$("//a[.='Issue Tickets']")
        issueticketslink.click()
        const Issueticketspage = await browser.$("//h3[.='Issue Tickets']")
        await expect(Issueticketspage).toHaveText("Issue Tickets")
        const adminremark = await browser.$(`//h3[.='Issue Tickets']/parent::div/descendant::td[.="${remark}"]`)
        await browser.$(`//h3[.='Issue Tickets']/parent::div/descendant::td[.='${remark}']`).scrollIntoView()
        const adminvalidation = await adminremark.getText()
        await expect(adminvalidation).toEqual(remark)
        const logoutlink = await browser.$("//a[.='/ Logout']")
        await logoutlink.scrollIntoView()
        await logoutlink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
})