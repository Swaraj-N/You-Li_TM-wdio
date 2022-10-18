class AdminLoginPage{
    get adminUNameTxtField(){
        return $("//input[@name='username']")
    }
    get adminPTxtField(){
        return $("//input[@name='password']")
    }
    get signinBtn(){
        return $("//input[@name='login']")
    }
    get backtohomelink(){
       return $("//a[.='Back to home']")
    }
async adminSigninAction (Ausername,Apassowrd)
{
   await this.adminUNameTxtField.setValue(Ausername)
    await this.adminPTxtField.setValue(Apassowrd)
    await this.signinBtn.click()
}
}
module.exports=new AdminLoginPage()