
import React, {useEffect, useRef, useState} from "react";
import person from './person.jpeg'
import AOS from "aos";
import "aos/dist/aos.css";
import "./Uploads.css"
import {FcAddImage, FcUpload} from "react-icons/all.js";
import {Footer, Navbar, SearchComponent, Strip, Texteditor} from "../../components/index.jsx";
import { storage,db } from  "../../fbConfigSetter.jsx"
import {ref,uploadBytesResumable,getDownloadURL } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore";
import {Avatar, Chip} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';



const Uploads =()=>{
    const [username,setUsername]=useState("")
    const [useremail,setUseremail]= useState("")
    const [usermessage,setUsermessage]= useState("")
    const [image, setImage]=useState()
    const [imageName, setImageName]=useState('')
    const [preview, setPreview]=useState()
    const [musicAdded, setMusicAdded]=useState([])
    const [loadPercent, setLoadPercent]=useState(0)
    const [isLoading, setIsLoading]=useState(false)
    const [letter, setLetter]=useState()
    const onImageSelect =(e)=>{
        if(e.target.files[0].type.includes("image"))
        {
            setImage(e.target.files[0]);
            setImageName(e.target.files[0].name)
            console.log(e.target.files[0])

        }
        else {
            setImage(e.target.files[1]);
            setImageName(e.target.files[1].name)
            console.log(e.target.files[1])
        }


    }
    const onSelectLetter=(e)=>{
        if(e.target.files[0].type.includes("image"))
        {
            setLetter(e.target.files[0]);
            // setImageName(e.target.files[1].name)
            console.log(e.target.files[0])

        }
        else
        {

                setImage(e.target.files[1]);
                // setImageName(e.target.files[0].name)
                console.log(e.target.files[1])


        }

    }
    const removeMusic = (xid) => {
        setMusicAdded(current=> current.filter((music) => music.name !== xid));
        // console.log(musicAdded, xid)
    };
    const displayImage=()=>
    {

        const fileReader = new FileReader()
        fileReader.readAsDataURL(image);
        fileReader.addEventListener("load",function () {
            setPreview(this.result)

        });
        return(<><img src={preview}  height={100} alt="" onClick={(e)=>{
            e.preventDefault()

            setImage(undefined)

            setImageName(undefined)}}/>
        <p>Tap Image to Remove</p></>)

    }
    const contactForm = useRef();

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);
   function handleUpload(e) {
        e.preventDefault()
       if(!username||!useremail)
       {
           alert("Please update your contact information properly!")
       }
       else {
           if(!letter&&!usermessage) {
               alert("Please write or Upload a letter")

           }
           else
           {
           if (!image) {
               alert("Please choose a photo for your younger self to see, first!")
           } else {


               const storageRef = ref(storage, `/letters/images/${image.name}`)
               const uploadTask = uploadBytesResumable(storageRef, image);

               setIsLoading(true)

               uploadTask.on(
                   "state_changed",
                   (snapshot) => {
                       const percent = Math.round(
                           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                       );
                       // console.log(percent)
                       setLoadPercent(percent)

                   },
                   (err) => console.log(err),
                   () => {
                       // download url
                       getDownloadURL(uploadTask.snapshot.ref).then(async (imageUrl) => {
                           if (!letter) {
                               const docRef = await addDoc(collection(db, "letters"), {
                                   name: username,
                                   email: useremail,
                                   letter: usermessage,
                                   userPicPath: imageUrl,
                                   music: musicAdded,
                                   approved: false,
                               })

                           } else {
                               const storageRef0 = ref(storage, `/letters/${letter.name}`)
                               const uploadTask0 = uploadBytesResumable(storageRef0, letter);
                               uploadTask0.on(
                                   "state_changed",
                                   (snapshot) => {
                                       const percent = Math.round(
                                           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                       );
                                       // console.log(percent)
                                       setLoadPercent(percent)
                                       console.log(imageUrl)
                                   },
                                   (err) => console.log(err),
                                   () => {
                                       // download url
                                       getDownloadURL(uploadTask0.snapshot.ref).then(async (letterUrl) => {
                                           console.log(letterUrl)
                                           // console.log(url);
                                           const docRef = await addDoc(collection(db, "letters"), {
                                               name: username,
                                               email: useremail,
                                               letterPath: letterUrl,
                                               userPicPath: imageUrl,
                                               music: musicAdded,
                                               approved: false,
                                           })

                                       });
                                   }
                               );
                           }

                           alert(`Your letter has been sent ${username}!`);
                           setUsername('')
                           setUseremail('')
                           setUsermessage('')
                           setImageName('')
                           setImage(undefined)
                           setPreview(undefined)
                           setMusicAdded([])
                           setIsLoading(false)
                           setLetter(undefined)


                       });
                   }
               );


           }
       }
       }
    }
    if (isLoading)
    {
        return (
            <header className={"header-bg"} style={{display: "flex",
                justifyContent:"center",
                alignItems:"center",}}><div style={{display: "flex",
                justifyContent:"center",
                alignItems:"center",
                background:"var(--old-pink)"}}>
                <CircularProgress variant={"determinate"} value={loadPercent} /><br/>
                <p style={{color:"#ffff",fontSize:"4vh"}}>  Loading ...☺️</p>
            </div></header>
            )
    }
    return(
        <>
            <header className={"header-bg"}>
                <Navbar></Navbar>
                <Strip/>
                <div id="uploads">

                    <div className="container uploads" data-aos="fade-up">
                        <h2>A letter to my younger self</h2>
                        {
                            (!imageName===true) ? <><label htmlFor={"select-image"}><img src={person} alt={"person"} height={"70px"}/><p>Remember to add A picture for your younger self to see...</p></label></> : displayImage()
                        }
                        <form encType={"multipart/form-data"} ref={contactForm} name={"contactForm"}>

                            <div className="form-control">
                                <label htmlFor="select-image">
                                    <div style={{fontSize: "20px"}} className="writeIcon"><FcAddImage></FcAddImage>
                                        {(imageName)?"Change Picture":"New Picture"}</div>
                                </label>
                                <input accept="image/*" type="file" id="select-image" style={{display: "none"}}
                                       onChange={e=>{onImageSelect(e)}}/>

                                <p>Name:</p>
                                <input type="text" name={"name"} id="name" required={true} value={username}
                                       onChange={(e)=>{setUsername(e.target.value)}}/>
                                <br/>
                                <p>Email:</p>
                                <input type="email" name={"useremail"} id="useremail"
                                       className={"email"} required={true} value={useremail}
                                       onChange={(e)=>setUseremail(e.target.value)} />
                                <br/>
                                <div className={"musicContainer"} style={{marginTop:"10px"}}>
                                    {musicAdded.length!==0 && musicAdded.map((music, id)=>{
                                        return(
                                            <div className="musicItem" style={{marginTop:"3px"}}>
                                                <Chip  color="success"
                                                       label={music.name+" by "+music.artist}
                                                       onDelete={() => {
                                                           removeMusic(music.name)
                                                           // console.log(music)
                                                       }}
                                                       avatar={<Avatar src={music.image} />} />
                                            </div>


                                        )
                                    })}
                                </div>
                                <div className={""}>
                                    <p>Dedicate to yourself a few songs: </p>
                                    <SearchComponent setMusicAdded={setMusicAdded}/>

                                </div>

                                <p>Letter:</p>
                                <label htmlFor="select-doc">
                                    <div style={{fontSize: "20px"}} className="writeIcon"><FcUpload></FcUpload>
                                        {(letter)? <><div onClick={(e)=>{
                                            e.preventDefault()
                                            setLetter()
                                        }}>{letter.name}</div>
                                        <p style={{fontSize:"1vh"}}>Tap to remove file</p>
                                        </>:`Upload Letter Instead`}</div>
                                </label>
                                <input  type="file" id="select-doc" style={{display: "none"}}
                                       onChange={e=>{onSelectLetter(e)}}/>
                                <div className={"letter"}>
                                    <Texteditor MainContent={usermessage} setMC={setUsermessage}></Texteditor>
                                </div>
                                <button onClick={e=>{handleUpload(e)}}>Send</button>{/*add func for form handling*/}
                            </div>
                        </form>

                    </div>
                </div>
            </header>
            <Strip></Strip>
            <Footer></Footer>

        </>

    )


}

export default Uploads