describe(`Book package as user and verify it in my tour history`, async () => {
    const randomnumber = (Math.floor(Math.random() * 1000))
    let comm = "I am Booking this Package" + randomnumber
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
        await indonesiadetails.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Package Details")
        const fromdate = await browser.$("//input[@id='datepicker']")
        await fromdate.setValue("13-10-2022")
        const todate = await browser.$("//input[@id='datepicker1']")
        await todate.setValue("16-10-2022")
        const commenttextfield = await browser.$("//input[@name='comment']")
        await commenttextfield.scrollIntoView()
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
    it(`Logout as User`, async () => {
        const logoutlink = await browser.$("//a[.='/ Logout']")
        await logoutlink.scrollIntoView()
        await logoutlink.click()
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("TMS | Tourism Management System")
    })
})