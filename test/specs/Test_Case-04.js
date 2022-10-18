describe(`Book package as user and verify as user and get status and confirm the booking as admin`, async () => {
    const randomnumber = (Math.floor(Math.random() * 1000))
    let comm = "I am Booking this Package" + randomnumber
    let beforestatusofbooking
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
    it(`Book a package`, async () => {
        const tourpackageslink = await browser.$("//a[.='Tour Packages']")
        await tourpackageslink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Package List")
        const indonesiapackage = await browser.$("//h4[.='Package Name: Indonesia']")
        await indonesiapackage.scrollIntoView()
        const indonesiadetails = await browser.$("//h4[.='Package Name: Indonesia']/parent::div/following-sibling::div/a[.='Details']")
        await browser.waitUntil(() => browser.$("//h4[.='Package Name: Indonesia']/parent::div/following-sibling::div/a[.='Details']").isDisplayed(), {
            timeout: 3000,
            timeoutMsg: "Details button not visible"
        })
        await indonesiadetails.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Package Details")
        const fromdate = await browser.$("//input[@id='datepicker']")
        await fromdate.setValue("13-10-2022")
        const todate = await browser.$("//input[@id='datepicker1']")
        await todate.setValue("16-10-2022")
        const commenttextfield = await browser.$("//input[@name='comment']")
        await commenttextfield.setValue(comm)
        const bookbutton = await browser.$("//button[@name='submit2']")
        await bookbutton.click()
    })
    it(`Confirmation message Validation`, async () => {
        await browser.waitUntil(() => browser.$("//div[@class='succWrap']").isDisplayed(), {
            timeout: 5000,
            timoutmessage: "Confirmation message not displayed"
        })
        const confirmation = await browser.$("//div[@class='succWrap']")
        await expect(confirmation).toHaveTextContaining("SUCCESS:Booked Successfully")
    })
    it(`Verify the booked package`, async () => {
        const mytourhistorylink = await browser.$("//a[.='My Tour History']")
        await mytourhistorylink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
        const bookingcomment = await browser.$(`//td[.='${comm}']`)
        const bookingcommenttext = await bookingcomment.getText()
        await expect(bookingcommenttext).toEqual(comm)
    })
    it(`Status of the Booking`, async () => {
        const beforebookingstatus = await browser.$(`//td[.='${comm}']/ancestor::tr/td[.='Pending']`)
        beforestatusofbooking = await beforebookingstatus.getText()
        await console.log(beforestatusofbooking);
    })
    it(`Logout as User`, async () => {
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
    it(`Confirm the Booking as admin`, async () => {
        const managebookingsidebar = await browser.$("//span[.='Manage Booking']")
        await managebookingsidebar.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Admin manage Bookings")
        const sidebaricon = await browser.$("//span[@class='fa fa-bars']")
        await sidebaricon.click()
        const confirmlink = browser.$(`//span[.='${comm}']/ancestor::tr/descendant::a[.='Confirm']`)
        await confirmlink.scrollIntoView()
        await confirmlink.click()
        await browser.acceptAlert()
    })
    it(`Confirmation message Validation`, async () => {
        await browser.waitUntil(() => browser.$("//div[@class='succWrap']").isDisplayed(), {
            timeout: 5000,
            timoutmessage: "Confirmation message not displayed"
        })
        const confirmation = await browser.$("//div[@class='succWrap']")
        await expect(confirmation).toHaveTextContaining("SUCCESS:Booking Confirm successfully")
    })
    it(`Logout as admin login as user`, async () => {
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
    it(`Verify Booking Status`, async () => {
        const mytourhistorylink = await browser.$("//a[.='My Tour History']")
        await mytourhistorylink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
        const afterconfirmbookingstatus = await browser.$(`//td[.='${comm}']/ancestor::tr/td[.='Confirmed']`)
        const afterstatusofbooking = await afterconfirmbookingstatus.getText()
        await console.log(afterstatusofbooking);
        await expect(afterconfirmbookingstatus).toHaveText("Confirmed")
    })
    it(`Logout as User`, async () => {
        const logoutlink = await browser.$("//a[.='/ Logout']")
        await logoutlink.scrollIntoView()
        await logoutlink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
})