class WelcomePage{
    get adminloginlink(){
        return $("//a[.='Admin Login']")
    }
get usersignuplink(){
    return $("//a[.='Sign Up']")
}
get userCreatedConfirmation(){
return $("//h4[contains(.,'Info')]")
} 
get usersignilink(){
    
    return $("//a[.='/ Sign In']")
}
}
module.exports= new WelcomePage()