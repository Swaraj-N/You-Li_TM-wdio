class UserSigninPage{
    get emailTextfield(){
        return $("//input[@placeholder='Enter your Email']")
    }
    get passwordtextfield(){
        return $("//h3[.='Signin with your account ']/following::input[@name='password']")
    }
    get signinbtn(){
        return $("//input[@name='signin']")
    }
    async usersigninAction(UserEmail,UserPassword){
        await this.signinbtn.click()
        await browser.waitUntil(()=>this.emailTextfield.isClickable(),{
            timeout:2000,
            timeoutMsg:"Email text field not clickable"
        })
        await browser.waitUntil(()=>this.passwordtextfield.isClickable(),{
            timeout:2000,
            timeoutMsg:"Password text field not clickable"
        }) 
        await browser.waitUntil(()=>this.signinbtn.isClickable(),{
            timeout:2000,
            timeoutMsg:"Sign in Button not clickable"
        })
        await this.emailTextfield.setValue(UserEmail)
        await this.passwordtextfield.setValue(UserPassword)
        await this.signinbtn.click()
    }
}
module.exports=new UserSigninPage()