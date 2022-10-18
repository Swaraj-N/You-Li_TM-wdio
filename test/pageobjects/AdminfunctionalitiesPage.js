class AdminfunctionalititesPage{
    get usercount(){
      return  $("//h3[.='User']/following-sibling::h4")
    }
    get admindropdown(){
        return $("//i[@class='fa fa-angle-down']")
    }
    get logoutlink(){
        return $("//a[.=' Logout']")
    }
    async adminlogoutaction (){
       await this.admindropdown.scrollIntoView()
        await this.admindropdown.click()
        await this.logoutlink.click()
    }
    get manageissuesidebarmenu(){
        return $(`//a[@href="manageissues.php"]`)
    }
    async viewlink(uservalidation){
        await  $(`//td[.="${uservalidation}"]/parent::tr/descendant::a[.="View "]`).scrollIntoView()
        return await $(`//td[.="${uservalidation}"]/parent::tr/descendant::a[.="View "]`).click()
    }
    async clickonManageissue(){
        await browser.waitUntil(()=>this.manageissuesidebarmenu.isDisplayed(),{
            timeout:3000,
            timeoutMsg:"Cant click on manage issue button"
        })
        await this.manageissuesidebarmenu.click()
    }
    // async clickonview(uservalidation){
    //     await this.viewlink(uservalidation)
    //     await this.viewlink.click
    // }
    async switchtoupdatewindow(){
        await browser.switchWindow(`Update Compliant`)
    }
    async switchbacktoadminwindow(){
        await  browser.switchWindow(`TMS | Admin manage Issues`)
    }
    get remarktextareafield(){
        return $("//textarea[@name='remark']")
    }
    get updatebutton(){
return $("//input[@type='submit']")
    }
    get remarkconfirmationmessage(){
      return  $("//div[@class='succWrap']").getText()
    }
    async updateremark(remark){
        await this.remarktextareafield.setValue(remark)
        await this.updatebutton.click()
    }
    get sidebaricon(){
        return $("//span[@class='fa fa-bars']")
    }
    async confirmbooking(comment){
        await $(`//span[.='${comment}']/ancestor::tr/descendant::a[.='Confirm']`).scrollIntoView()
        await $(`//span[.='${comment}']/ancestor::tr/descendant::a[.='Confirm']`).click()
        await browser.waitUntil(()=>browser.isAlertOpen(),{
            timeout:3000,
            timeoutMsg:"Alert is ignored"
        })
        await browser.acceptAlert()
    }
    get manageBokingLink(){
        return $("//span[.='Manage Booking']")
    }
    get confirmedbyAdminmessage(){
        // await browser.waitUntil(() => browser.$("//div[@class='succWrap']").isDisplayed(), {
        //     timeout: 3000,
        //     timoutmessage: "Confirmation message not displayed"
        // })
        return  $("//div[@class='succWrap']")
    }
}
module.exports=new AdminfunctionalititesPage()