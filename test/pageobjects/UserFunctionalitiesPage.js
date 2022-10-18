class UserFunctionalitiesPage {
    get writeuslink() {
        return $("//a[.=' / Write Us ']")
    }
    get issuedropdown() {
        return $("//select[@name='issue']")
    }
    get descriptiontextfield() {
        return $("//input[@placeholder='description']")
    }
    get submitbtn() {
        return $("//button[.='Submit']")
    }
    async createanissueaction(issuetext, issuedesc) {
        await this.writeuslink.click()
        await browser.waitUntil(() => browser.$("//h4[.='HOW CAN WE HELP YOU']").isDisplayed(), {
            timeout: 3000,
            timeoutMsg: "Page not loaded"
        })
        await this.issuedropdown.selectByVisibleText(issuetext)
        await this.descriptiontextfield.setValue(issuedesc)
        await this.submitbtn.click()
    }
    get issueconfirmation() {
        return $("//h4[contains(.,'Info')]")
    }
    get userlogoutlink() {
        return $("//a[.='/ Logout']")
    }
    async userlogoutaction() {
        await this.userlogoutlink.scrollIntoView()
        await this.userlogoutlink.click()
    }
    get issueticketslink() {
        return $("//a[.='Issue Tickets']")
    }
    async givendescription(uservalidation) {
        await $(`//h3[.='Issue Tickets']/parent::div/descendant::td[.="${uservalidation}"]`).scrollIntoView()
        return await $(`//h3[.='Issue Tickets']/parent::div/descendant::td[.="${uservalidation}"]`)
    }
    get issuepageheading() {
        return $("//h3[.='Issue Tickets']")
    }
    async adminreview(remark) {
        await $(`//h3[.='Issue Tickets']/parent::div/descendant::td[.='${remark}']`).scrollIntoView()
        return await $(`//h3[.='Issue Tickets']/parent::div/descendant::td[.='${remark}']`).getText()
    }
    get tourpackageslink() {
        return $("//a[.='Tour Packages']")
    }
    get IndonesiaPackage() {
        return $("//h4[.='Package Name: Indonesia']")
    }
    get indonesiaPackagedetails() {
        return $("//h4[.='Package Name: Indonesia']/parent::div/following-sibling::div/a[.='Details']")
    }
    get fromdate() {
        return $("//input[@id='datepicker']")
    }
    get todate() {
        return $("//input[@id='datepicker1']")
    }
    get commenttextfield() {
        return $("//input[@name='comment']")
    }
    get bookbutton() {
        return $("//button[@name='submit2']")
    }
    async bookIndonesiaPackage(comment) {
        await this.IndonesiaPackage.scrollIntoView()
        await browser.waitUntil(()=>this.indonesiaPackagedetails.isClickable(),{
            timeout:3000,
            timeoutMsg:"Indonesia Details Not displayed"
        })
        await this.indonesiaPackagedetails.click()
        await this.fromdate.setValue("13-10-2022")
        await this.todate.setValue("16-10-2022")
        await this.commenttextfield.scrollIntoView()
        await this.commenttextfield.setValue(comment)
        await this.bookbutton.click()
    }
    get bookedpackageconfirmation() {
        return $("//div[@class='succWrap']")
    }
    get mytourhistory() {
        return $("//a[.='My Tour History']")
    }
    async getbookingcommenttext(comment) {
        await $(`//td[.='${comment}']`).scrollIntoView()
        return await $(`//td[.='${comment}']`).getText()
    }
    async beforestatusbooking(comment){
        await browser.$(`//td[.='${comment}']/ancestor::tr/td[.='Pending']`).scrollIntoView()
        return await browser.$(`//td[.='${comment}']/ancestor::tr/td[.='Pending']`)
    }
    async afterstatusbooking(comment){
        await $(`//td[.='${comment}']/ancestor::tr/td[.='Confirmed']`).scrollIntoView()
        return await $(`//td[.='${comment}']/ancestor::tr/td[.='Confirmed']`)
    }
}
module.exports = new UserFunctionalitiesPage()