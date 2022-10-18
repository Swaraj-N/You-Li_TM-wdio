class UserSignUpPage {
    get fNameTxtField() {
        return $("//input[@name='fname']")
    }
    get mNumTxtfield() {
        return $("//input[@name='mobilenumber']")
    }
    get emailTextField() {
        return $("//input[@placeholder='Email id']")
    }
    get passwordTextField() {
        return $("//form[@name='signup']/descendant::input[@name='password']")
    }
    get createButton() {
        return $("//input[@name='submit']")
    }
    async userSignUpAction(Firstname,MobileNum,Email,Password) {
        await browser.waitUntil(() => this.fNameTxtField.isDisplayed(), {
            timeout: 2000,
            timeoutmessage: "FirstName Text field is not Interactable"
        })
        await this.fNameTxtField.setValue(Firstname)
        await browser.waitUntil(() => this.mNumTxtfield.isDisplayed(), {
            timeout: 2000,
            timeoutmessage: "Mobilenumber Text field is not Interactable"
        })
        await this.mNumTxtfield.setValue(MobileNum)
        await browser.waitUntil(() => this.emailTextField.isDisplayed(), {
            timeout: 2000,
            timeoutmessage: "Email Text field is not Interactable"
        })
        await this.emailTextField.setValue(Email)
        await browser.waitUntil(() => this.passwordTextField.isDisplayed(), {
            timeout: 2000,
            timeoutmessage: "Password Text field is not Interactable"
        })
        await this.passwordTextField.setValue(Password)
        await browser.waitUntil(() => this.createButton.isEnabled(), {
            timeout: 2000,
            timeoutmessage: "Create button not clickable"
        })
        await this.createButton.click()
    }
}
module.exports=new UserSignUpPage()