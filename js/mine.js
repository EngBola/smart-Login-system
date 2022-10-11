    
//=====================Regular Exeprtions===================//
regexEmail =/^([_a-z0-9]+[\._a-z0-9]*)(\+[a-z0-9]+)?@(([a-z0-9-]+\.)*[a-z]{2,4})$/gmi;
regexName =/^\w{3,10}\s?\w{0,5}\d?$/gmi;
regexPass= /^(?=.*\w).(?=.*\d).{8,20}$/;
//==========================================================//
var session={
    id : "",
    uName : "",
    uEmail : "",
    rDate : "",
}
var curentPage;
var users;
var content= document.querySelector(".content");

if (localStorage.getItem("user") == null) {
    users = [];
} else {
    users = JSON.parse(localStorage.getItem("user"));
}

if (sessionStorage.getItem("session") == null) {
    curentPage = "loginPage";
    routing();
} else {
    session = JSON.parse(sessionStorage.getItem("session"));
    curentPage = "homePage";
    routing();
}

function routing(){

    if (curentPage == "loginPage"){
        content.innerHTML=`<h1 class="text-center t-color py-4">Smart Login System</h1> 
        <div class="login mx-5">
            <input class="form-control mb-3" type="email" id="email" placeholder="Enter your email" autocomplete="off">
            <input class="form-control mb-3" type="password" id="psw" placeholder="Enter your password"autocomplete="off">
            <div class="text-danger text-center fs-6 errorMsg"></div>
            <button class=" mybtn w-100 my-2 p-1 " id="loginBtn">Login</button>
            <div class=" text-center">
            <p class="py-3  text-white fw-semibold d-inline-block">Don’t have an account?  </p><a class="signup text-white text-decoration-none" > SignUp</a>
            </div>
        </div>`;
        email = document.getElementById("email");
        myPassword = document.getElementById("psw");
        msg = document.querySelector(".errorMsg");
        var toLogin = document.querySelector("#loginBtn").addEventListener("click", login );
        function login(){
            console.log(email.value);
            console.log(myPassword.value);
            if(email.value == "" || myPassword.value == ""){
                toLogin;
                msg.innerHTML= "email or password can\'t be empty";
            }else{
                console.log(email.value);
                console.log(myPassword.value);
                for(var i=0 ; i < users.length ; i++){
                    if(users[i].userEmail == email.value.toLowerCase() && users[i].userPass == myPassword.value){
                        curentPage="homePage";
                        beginSession(users[i]);
                        routing();
                        break;
                    }else{
                        toLogin;
                        msg.innerHTML= "email or password wrong";
                    }
                }
            }
        }
        document.querySelector(".signup").addEventListener("click", function(){
            curentPage = "registerPage";
            routing();
        });
    }
    if (curentPage == "registerPage"){
        content.innerHTML=`<h1 class="text-center t-color py-4">Smart Login System</h1>
        <h3 class="text-center text-success d-none">Successfull</h3>
        <div class="signup mx-5 text-center">
            <input class="form-control mt-3" type="text" id="username" placeholder="Enter your name" autocomplete="off">
            <span id="nerr"></span>
            <input class="form-control mt-3" type="email" id="email" placeholder="Enter your email" autocomplete="off">
            <span id="eerr"></span>
            <span id="derr"></span>
            <input class="form-control mt-3" type="password" id="pws" placeholder="Enter your password" autocomplete="off">
            <span id="perr"></span>
            <button class=" mybtn w-100 my-3 p-1 " id="regBtn">Sign Up</button>
            <div class=" text-center">
            <p class="py-3 text-white fw-semibold d-inline-block">You have an account? </p> <a class="signin text-white text-decoration-none"> Signin</a>
            </div>
        </div>`;        
        var username = document.getElementById("username");
        var email = document.getElementById("email");
        var myPassword = document.getElementById("pws");
        var signupBTN = document.querySelector("#regBtn");
        var testname="";
        var testpass="";
        var testmail="";
        var testDmail="";
        email.addEventListener("keyup", emailDub);
        var toSignup = signupBTN.addEventListener("click" , regist);
        
        function regist(){
            //============validation================//
            validName();
            validEmail();
            emailDub();
            validPass();
            var noError=0;
            testname!=true?document.getElementById("nerr").innerHTML =testname:noError++;
            testmail!=true?document.getElementById("eerr").innerHTML=testmail:noError++;
            testDmail!=true?document.getElementById("derr").innerHTML=testDmail:noError++;
            testpass!=true?document.getElementById("perr").innerHTML=testpass:noError++;
            
            if(noError ==4){
                var newUser ={
                    userId : `${(users.length+1)}`,
                    userName:username.value,
                    userEmail:email.value.toLowerCase(),
                    userPass:myPassword.value,
                    date:new Date().toLocaleString(),
                }
                users.push(newUser);
                localStorage.setItem("user" , JSON.stringify(users));
                routing();
                document.querySelector("h3").classList.replace("d-none","d-block");
            }else{
                toSignup;
                document.querySelector("h3").classList.replace("d-block","d-none");                
            }
        }
        function validName(){
            if (username.value != "") {
                document.getElementById("nerr").innerHTML = "";
                return testname = true;
            } else {
                return testname = "invalid name";
            }
        }
        function validEmail(){
            if(regexEmail.test(email.value.toLowerCase()) != true){
                return testmail= "invalid email";
            }else{
                document.getElementById("eerr").innerHTML="";
                return testmail= true;
            }
        }
        function emailDub(){
            if(email.value !=""){
                var result=0;
                for(var i=0 ; i < users.length ; i++){
                    if(users[i].userEmail == email.value.toLowerCase()){
                        result++;
                    break;
                    }
                }
                if(result>0){
                    document.getElementById("derr").innerHTML="This Email is exist";
                    return testDmail= "This Email is exist";
                }else{
                    document.getElementById("derr").innerHTML="";
                    return testDmail= true;
                }
            }
        }
        function validPass(){
            if(regexPass.test(myPassword.value)== true){
                document.getElementById("perr").innerHTML="";
                return testpass= true;
            }else{
                return testpass = "invalid password";
            }
        }  
        document.querySelector(".signin").addEventListener("click", function(){
            curentPage = "loginPage";
            routing();
        });
    }

    if (curentPage == "homePage"){
        content.innerHTML=`<h1 class="text-center t-color py-4">WELCOME ${session.uName}</h1>
                            <ul class="text-center">
                                <li ><span class="badge text-bg-light"><i class="fa fa-user-large"></i> ${session.uName}</span></li>
                                <li><span class="badge text-bg-info"><i class="fa fa-envelope"></i>  <a href="mailto:${session.uEmail}">${session.uEmail}</a></span></li>
                                <li><span class="badge text-bg-warning"><i class="fa fa-clock-rotate-left"></i> ${session.rDate}</span></li>
                            </ul>`;
        var logoutBTN = document.querySelector("nav .btn-outline-warning");
        showNav();
        logoutBTN.addEventListener("click", logOut)
    }
}



//=====================MyFunctionS============================//
function showNav(){
    document.querySelector("nav").classList.replace("d-none","d-block");
}
function logOut(){
    document.querySelector("nav").classList.replace("d-block","d-none");
    sessionStorage.clear('session');
    curentPage="loginPage"
    routing();
}


function beginSession(index){
    session={
        id : index.userId,
        uName : index.userName,
        uEmail : index.userEmail,
        rDate : index.date,
    }
    sessionStorage.setItem("session",JSON.stringify(session));
}
