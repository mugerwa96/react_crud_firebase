import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { db } from "./firebase";
import { useEffect } from "react";
import Edit from "./Edit";



export default function App() {
  const [books, setBooks] = useState([])
  const [titleInput, setTitle] = useState("")
  const [authorInput, setAuthor] = useState("")
  const [update, setUpdate] = useState(false)

const form=document.querySelector('.form')
  // collection reference
  const collectionRef = collection(db, 'books');
  useEffect(() => {
  //   //data from the collectionref

    getDocs(collectionRef).then((snapShot) => {
      // empty refArrat
      let bookArray = [];
      snapShot.docs.map((item) => {
        bookArray.push({ ...item.data(), id: item.id })
      })

      setBooks(bookArray)
    }).catch((error)=>{
      console.error("Firebase error")
    })
  });

  // saving data 
  const handleSubmit = (e) => {
    
    e.preventDefault();

    if (titleInput === "" || authorInput === "") {
      alert('title required');
      return false
    }else{

      addDoc(collectionRef, {
        title: titleInput,
        author: authorInput
      })
    
      form.reset();
     
    }

  }

  const deleteBook = (id) => {

    const docRef = doc(db, 'books', id)
    deleteDoc(docRef).then(() =>
      console.log("removed"))
  }

  // const updateBook = (id) => {
  //   const docRef = doc(db, 'books', id)

  //   updateDoc(docRef, {
  //     title: "Updated title",
  //     author: "updated"
  //   })

  // }
  return (
    <div>
      {update ? <Edit data={update}/>:
     
  <div className="flex flex-col w-full items-center justify-center ">
      <h1 className="text-center">Fire Base Fire store</h1>

      <form  className="form flex flex-col space-y-2 my-5  bg-gry-200" onSubmit={handleSubmit}>
        <p>Add Movies</p>
        <input type="text" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)} className="border py-2 border-purple-700" />
        <input type="text" placeholder="Enter author" onChange={(e) => setAuthor(e.target.value)} className="border py-2 border-purple-700" />

        <button className="px-3 py-2 text-white  bg-purple-500" type="submit">save</button>
      </form>

      {books.length<1?<p className="bg-red-500 px-3 py-1 text-white font-bold"> Please wait ,data loading</p>:

      <ul className="bg-gray-200  block p-4 rounded shadow">
        {books.map(({ id, title, author }) => {
          return <li key={id} className="p-2 mb-2 bg-purple-600 rounded text-white">
            <div>
              <span>Title:</span>
              <span>{title}</span>
            </div>
            <div>
              <span>Author:</span>
              <span>{author}</span>
            </div>
            <div className="my-2">

              <span className="my-2 bg-red-500 px-3 py-1 text-white rounded shadow" onClick={() => deleteBook(id)} >delete</span>
              <span className="my-2 mx-2 bg-orange-500 px-3 py-1 text-white rounded shadow"
                onClick={() => setUpdate({id,title,author ,update})} >Edit</span>
            </div>
          </li>
        })}

      </ul>
}
    </div>
     }
    </div>

  
  )
}