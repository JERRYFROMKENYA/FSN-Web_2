import {Button} from "@mui/material";
import "./login.css"
import logo from "../../../../assets/logo.png"
import CircularProgress from "@mui/material/CircularProgress";
import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from "../../../../fbConfigSetter.jsx";
import {addDoc, collection, Timestamp} from "firebase/firestore";

export const Login = (props) => {
    const [isLoading, setIsLoading] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const[user, setUser]=useState()

    const log =async () => {
        const docRef = await addDoc(collection(db, "userlog"), {
            user: user.uid,
            time: Date()
        })
        console.log(docRef.id)
    }
    const loginAction =  () => {

        props.isLoad(true)
        // const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then( async (userCredential) => {
                // Signed in
                    if (userCredential)
                    {
                        const docRef = await addDoc(collection(db, "userlog"), {
                            user: userCredential.user.uid,
                            time: Date()
                        })
                        console.log(docRef.id)
                    }
                const user = userCredential.user;
                setUser(user)
                console.log(user.uid)
                await log()

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;

                if(errorCode==="auth/wrong-password"||errorCode==="auth/user-not-found")
                {
                    alert("Wrong email/Password")
                }
            });
        console.log("...", email, password)
        props.isLoad(false)



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
                    <p>Password:</p>
                    <input className={"adminLoginInput"} type="password" name={"password"} id="password"
                            required={true} value={password}
                           onChange={(e)=>setPassword(e.target.value)} />
                    <br/>



                    <Button style={{fontSize: "2vh", color: "#fff"}} onClick={(e) => {
                        e.preventDefault()
                        loginAction()
                    }}
                            variant={"contained"}>Sign In </Button>

                    <div>
                        <div>
                            <p><br/> Not an admin? <a style={{color: "blue", fontSize: "1.5vh", cursor:"pointer"}} >Back to main
                                site</a></p>
                        </div>
                        <div>
                            <p><br/> Registration <div onClick={()=>{props.wtr(true)}} style={{color: "blue", fontSize: "1.5vh", cursor:"pointer"}} >Register</div></p>
                        </div>


                    </div>
                </div>
                </>
         )

    }
}




