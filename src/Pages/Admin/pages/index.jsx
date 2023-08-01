import React, {useEffect, useState} from "react";
import {Login} from "./Login/Login.jsx";
import {Register} from "./Register/Register.jsx";
import {auth, db} from "../../../fbConfigSetter.jsx";
import {onAuthStateChanged, signOut} from "firebase/auth"
import CircularProgress from "@mui/material/CircularProgress";
import {LetterView} from "./LetterView/LetterView.jsx";
import {Button} from "@mui/material";
import {addDoc, collection, Timestamp} from "firebase/firestore";

export const Admin = () => {
    const [isAuth, setIsAuth]=useState(false)
    const [wantsToRegister, setWantsToRegister]=useState(false)
    const [loggedInUser, setLoggedInUser]=useState()
    const [isLoading, setIsLoading]=useState(false)

    const checkIfLoggedIn = () => {
        //set is loading
        setIsLoading(true)
        if(localStorage.getItem("loggedInUser"))
        {
            setIsAuth(true)
            setLoggedInUser(localStorage.getItem("loggedInUser"))
            // console.log(localStorage.getItem("loggedInUser"))
        }
        setIsLoading(false)
        //set is loading off

    }

    const signOutAction =()=>{
        //set is Loading
        setIsLoading(true)
        signOut(auth).then(() => {
            localStorage.removeItem("loggedInUser")
            setIsAuth(false)
            setLoggedInUser(undefined)
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.log(error.code,error.message)
        });
        setIsLoading(false)

    }
    useEffect(()=>{
        checkIfLoggedIn()
    })
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            //Log user!

            const uid = user.uid;
            setLoggedInUser(user)
            setIsAuth(true)
            localStorage.setItem("loggedInUser", user)

        } else {

            // signOut(auth).then(() => {
            //     localStorage.removeItem("loggedInUser")
            //     setIsAuth(false)
            //     setLoggedInUser(undefined)
            //     // Sign-out successful.
            // }).catch((error) => {
            //     console.log(error.code,error.message)
            // });
        }
    });



    //Render
    if(isLoading)
    {
        return(<>
            <header className={"header-bg"} style={{display: "flex",
                justifyContent:"center",
                alignItems:"center",}}><div style={{display: "flex",
                justifyContent:"center",
                alignItems:"center",
                background:"var(--old-pink)"}}>
                <CircularProgress variant={"indeterminate"} /><br/>
                <p style={{color:"#ffff",fontSize:"4vh"}}>  Loading ...☺️</p>
            </div></header>

        </>)
    }
    else {


        if (!isAuth) {
            if (wantsToRegister) {
                return (<Register wtr={setWantsToRegister} auth={setIsAuth}/>)

            } else {
                return (<Login wtr={setWantsToRegister} isLoad={setIsLoading}/>)
            }
        } else {

            return (
                <>
                    <LetterView></LetterView>
                </>
            )
        }
    }

}
