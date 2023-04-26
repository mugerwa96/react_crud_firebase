import { doc, updateDoc } from 'firebase/firestore'
import React, {  useEffect, useState } from 'react'
import { db } from './firebase'

const Edit = (props) => {

    
    const [titleEdit, setTitle] = useState("")
    const [authorEdit, setAuthor] = useState("")   
    const[id,setId]=useState(0)
    const [update, setUpdate] = useState(true)

    useEffect(()=>{
    setTitle(props.data.title)
    setAuthor(props.data.author)
    setId(props.data.id)
    setUpdate(props.data.update)
    },[props.data])
    // Handling clicks
    
    const handleSubmit =(e)=>{
        e.preventDefault()
        // docReference
      const docRef=  doc(db,"books",id)
        
        updateDoc(docRef,{
            title:titleEdit,
            author:authorEdit
        }).then(()=>{
            window.location.reload(true)
        })
        

    }
    return (
     
            <div className="flex flex-col w-full items-center justify-center ">
            <form className="flex flex-col space-y-2 my-5  bg-gry-200" onSubmit={handleSubmit}>
                <p>Edit Movies </p>
                
                <input type="text" placeholder="Enter title"  value={titleEdit}  onChange={(e) => setTitle(e.target.value)}  className="border py-2 border-purple-700" />
                <input type="text" placeholder="Enter author" 
                 onChange={(e) => setAuthor(e.target.value)} 
                 value={authorEdit}
                className="border py-2 border-purple-700" />

                <button className="px-3 py-2 text-white  bg-purple-500" type="submit">Update</button>
            </form>
        </div>
    
  )
}


export default Edit
