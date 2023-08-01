import {Button} from "@mui/material";
import "./register.css"
import logo from "../../../../assets/logo.png"
import CircularProgress from "@mui/material/CircularProgress";
import React, {useState} from "react";
import {auth} from "../../../../fbConfigSetter.jsx";
import {createUserWithEmailAndPassword} from 'firebase/auth'

export const Register = (props) => {
    const [isLoading, setIsLoading] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[confirmPassword, setConfirmPassword]=useState()
    const [username, setUsername]=useState('')
    const registerAction = () => {
        if (email) {
            if(password!==confirmPassword)
            {
                alert("Make sure your passwords match!")
            }
            else {
                if (password.length < 8) {
                    alert("Oops you have a weak password")
                }
                else
                {
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            // Signed in
                            const user = userCredential.user;
                            props.auth(true)
                            console.log(user)
                            // ...
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // console.log(errorCode)
                            if(errorCode=="auth/email-already-in-use")
                            {
                                alert("Oops, the email you have entered is already in use...")
                            }
                            // ..
                        });
                }
            }
        }
    }


    if (isLoading) {
        return (<>
                <header className={"header-bg"} style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "var(--old-pink)"
                    }}>
                        <CircularProgress variant={"indeterminate"}/><br/>
                        <p style={{color: "#ffff", fontSize: "4vh"}}> Loading ...</p>
                    </div>
                </header>
            </>
        )

    } else {
        return (
            <>

                <div className={"header-bg"} style={{color: "white", fontSize: "1.5vh",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    alignItems: "center"}}>
                    <img src={logo} height={"150px"} alt=""/>
                    <p>E-mail:</p>
                    <input className={"adminLoginInput"} type="text" name={"email"} id="email" required={true} value={email}
                           onChange={(e)=>{setEmail(e.target.value)}}/>
                    <br/>
                    <p>Username:</p>
                    <input className={"adminLoginInput"} type="text" name={"Name"} id="name" required={true} value={username}
                           onChange={(e)=>{setUsername(e.target.value)}}/>
                    <br/>
                    <p>Password:</p>
                    <input className={"adminLoginInput"} type="password" name={"password"} id="password"
                           required={true} value={password}
                           onChange={(e)=>setPassword(e.target.value)} />
                    <br/>
                    <p>Confirm Password:</p>
                    <input className={"adminLoginInput"} type="password" name={"ConfirmPassword"} id="ConfirmPassword"
                           required={true} value={confirmPassword}
                           onChange={(e)=>setConfirmPassword(e.target.value)} />
                    <br/>



                    <Button style={{fontSize: "2vh", color: "#fff"}} onClick={(e) => {
                        e.preventDefault()
                        registerAction()
                    }}
                            variant={"contained"}>Sign Up </Button>

                    <div>
                        <div>
                            <p><br/> Already an Admin <div onClick={()=>{props.wtr(false)}} style={{color: "blue", fontSize: "1.5vh", cursor:"pointer"}} >Log in Account</div></p>
                        </div>


                    </div>
                </div>
            </>
        )

    }
}




