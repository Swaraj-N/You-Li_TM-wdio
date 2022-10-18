describe.skip(`Book a Flight Ticket`, async () => {

    it(`Navigating to the application`, async () => {
        await browser.maximizeWindow()
        await browser.url("https://www.spicejet.com/");
        await console.log(browser.getTitle());
        await expect(browser).toHaveTitle("SpiceJet - Flight Booking for Domestic and International, Cheap Air Tickets")
    })
    it(`Book a Ticket`,async()=>{
        await browser.$("//div[.='round trip']/div[@class='css-1dbjc4n r-zso239']").click()
        await browser.$("//div[@class='css-1dbjc4n']/div[.='Senior Citizen']").click()
        await browser.$("//div[@data-testid='departure-date-dropdown-label-test-id']").click()
        await browser.$("//div[@data-testid='undefined-month-October-2022']/descendant::div[@class='css-1dbjc4n r-6koalj r-18u37iz r-d0pm55']/div[.='22']").click()
        await browser.debug(3000)
    })
})