//Naviate to application search for a product add product to the cart,
//check that added product is displyed in the cart click on Proceed to buy
describe.skip(`Amazon Test Case`, async () => {
    it(`Test-01`, async () => {
        await browser.maximizeWindow()
        await browser.url("https://www.amazon.com")
        await console.log(browser.getTitle());
        await browser.$("//input[@id='twotabsearchtextbox']").click()
        await browser.$("//input[@id='twotabsearchtextbox']").setValue("samsung galaxy s22 ultra")
        await browser.$("//input[@value='Go']").click()
        const samsung = $("//div[@class='sg-row']/descendant::span[contains(.,'SAMSUNG Galaxy S22 Ultra Cell')]")
        samsung.scrollIntoView();
        await browser.$("//div[@class='sg-row']/descendant::span[contains(.,'SAMSUNG Galaxy S22 Ultra Cell')]").click()
        let addproduct = browser.$("//h1[@id='title']")
        await browser.$("//input[@id='add-to-cart-button']").click()
        await browser.$("//a[@id='attach-close_sideSheet-link']").click()
        await browser.$("//a[@id='nav-logo-sprites']").click()
        await browser.$("//a[@id='nav-cart']").click()
        let Cartproduct = browser.$("//span[@class='a-truncate a-size-base-plus']").getText()
        if (addproduct.isEqual(Cartproduct)) {
            await browser.$("//input[@name='proceedToRetailCheckout']").click()
            await browser.$("//input[@name='email']").setValue("email@gmail.com")
            await browser.$("//input[@id='continue']").click()
            await browser.$("//input[@type='password']").setValue("Password@123")
            await browser.$("//input[@type='submit']").click()
        }
        else {
            console.log("ADDED PRODUCT IS NOT SAME AS THE PRODUCT IN THE CART");
        }
    })
})