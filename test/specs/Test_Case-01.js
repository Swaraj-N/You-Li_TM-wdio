describe('Create User and Check Count', async () => {
    let Ucountbefore
    let Ucountafter
    let UCBeforeNumber
    let UCAfterNumber
    const randomnumber = (Math.floor(Math.random() * 1000))
    it('Navigating to the application-reg', async () => {
        await browser.maximizeWindow()
        await browser.url("http://rmgtestingserver/domain/Online_Tourism_Management_System");
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
    it('Login as Admin', async () => {
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
    it(`Get the User Count`, async () => {
        const usercount = await browser.$("//h3[.='User']/following-sibling::h4")
        Ucountbefore = await usercount.getText()
        UCBeforeNumber = Number(Ucountbefore)
        console.log(typeof (UCBeforeNumber));
        const admindropdown = await browser.$("//i[@class='fa fa-angle-down']")
        admindropdown.click()
        const logoutlink = await browser.$("//a[.=' Logout']")
        logoutlink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Admin Sign in")
        const backtohomelink = await browser.$("//a[.='Back to home']")
        backtohomelink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
    it(`Navigate to application and Create a new User`, async () => {
        const signuplink = await browser.$("//a[.='Sign Up']")
        signuplink.click()
        const fullnametextfield = await browser.$("//input[@name='fname']")
        const mobilenumbertextfield = await browser.$("//input[@name='mobilenumber']")
        const emailtextfield = await browser.$("//input[@placeholder='Email id']")
        const passwordtextfield = await browser.$("//form[@name='signup']/descendant::input[@name='password']")
        const createbutton = await browser.$("//input[@name='submit']")
        fullnametextfield.setValue(`User${randomnumber}`)
        mobilenumbertextfield.setValue(`1234567${randomnumber}`)
        emailtextfield.setValue(`User${randomnumber}@gmail.com`)
        passwordtextfield.setValue(`Pass@${randomnumber}`)
        await browser.waitUntil(() => browser.$("//input[@name='submit']").isEnabled(), {
            timeout: 2000,
            timeoutmessage: "Create button not clickable"
        })
        createbutton.click()
    })
    it(`Confirmation message Validation`, async () => {
        await browser.waitUntil(() => browser.$("//h4[contains(.,'Info')]").isDisplayed(), {
            timeout: 5000,
            timoutmessage: "Confirmation message not displayed"
        })
        const confirmation = await browser.$("//h4[contains(.,'Info')]")
        const confirmationmessage = confirmation.getText()
        await expect(confirmation).toHaveTextContaining("Info successfully")
    })
    it(`Login as Admin to Verify Increased User Count`, async () => {
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
    it(`Get the updated User Count`, async () => {
        const usercount = await browser.$("//h3[.='User']/following-sibling::h4")
        Ucountafter = await usercount.getText()
        UCAfterNumber = Number(Ucountafter)
        console.log(typeof (UCAfterNumber));
        const admindropdown = await browser.$("//i[@class='fa fa-angle-down']")
        admindropdown.click()
        const logoutlink = await browser.$("//a[.=' Logout']")
        logoutlink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Admin Sign in")
        const backtohomelink = await browser.$("//a[.='Back to home']")
        backtohomelink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
        await expect(UCAfterNumber).toBeGreaterThan(UCBeforeNumber)
        console.log(`User count before creating user is ${UCBeforeNumber} and User count after creating user is ${UCAfterNumber}`);
    })
})