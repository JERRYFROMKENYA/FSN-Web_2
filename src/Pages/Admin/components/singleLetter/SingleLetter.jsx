import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../../../../fbConfigSetter.jsx";
import {useEffect, useState} from "react";


// querySnapshot.forEach((doc) => {
//
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
// });




export const SingleLetter = () => {
    const [letter, setLetter]=useState([]);


    const read=async () => {
        const querySnapshot = await getDocs(collection(db, "letters"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            const x=doc.data()
            setLetter((oldData) => [...oldData,doc.data()])
            console.log(doc.id, " => ", doc.data());
            console.log(letter)
        });
    }
    const neoRead =()=>{
        db.collection("letters").get().then((querySnapshot) => {

            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                setLetter(arr => [...arr, data]);
                console.log(letter)

            });
        })
    }

    useEffect(async()=>{
       await read()
    },[1])

    return (
        <>

            {
                letter.map((r)=>{
                    return(
                        <div>{r.name}</div>
                    )

                })
            }

        </>
    )
}
