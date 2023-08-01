import {useEffect, useState} from "react";
import {FaMusic, FaRemoveFormat, FaTerminal} from "react-icons/fa";
import "./SearchBar.css";
import {CiCircleRemove} from "react-icons/ci";
import {Button, IconButton} from "@mui/material";
// import {CiCircleRemove} from "react-icons";
const CLIENT_ID="9aa8d81a57624c87b392bf242c872224"
const CLIENT_SECRET="79e962f233ab409bbf78ee72baf08066"


export const SearchBar = ({ setResults,setContent }) => {
  const [input, setInput] = useState("");
    const [accessToken,setAccessToken]=useState('')

    function clear(value)
    {
        if (value.length<2)
        {
            setContent(undefined)
            setResults("")

        }
    }

    useEffect(()=>{
        //API Access Token
        var authParams={
            method: "POST",
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParams)
            .then(r => r.json())
            .then(data => setAccessToken(data.access_token))
            .catch(e=>console.log("OOPS",e))

    },[])
    console.log(accessToken)
    async function search()
    {
        console.log("Search:"+input)//Ken Carson

        //Get Req using Key word
        var lookParams={
            method: "GET",
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer '+accessToken
            }
        }

        var queryVariable=input+"&type=track"
        var lookID= await fetch("https://api.spotify.com/v1/search?q="+queryVariable,lookParams)
            .then(response=>response.json())
            .then(data=> {setResults(data.tracks.items)
                console.log(data)})

    }


  const handleChange = (value) => {
    setInput(value);
    search();
    clear(value)
  };

  return (
    <div className="input-wrapper">

      <input
          onKeyPress={event =>{
                  if(event.key == "backspace") {
                      setContent("")
                      setResults("")
                  }}}
        placeholder="Type to search for music..."
        value={input}
        onChange={(e) => {
            handleChange(e.target.value)

        }}
      />
        <Button variant={"outlined"} onClick={(e) => {
            e.preventDefault()
            setResults(undefined)
            setContent(undefined)
            setInput("")
        }} style={{color:"red",height:"50px",border:"none",background:"transparent"}}>
           Clear
        </Button>
    </div>
  );
};
