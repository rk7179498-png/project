import  { useContext } from 'react'
import {Link} from "react-router-dom"
import { dataContext } from './ShowDate'
function Nav() {
  let{show, setShow}=useContext(dataContext)
  console.log(show)
  return (
    <div>
     <button onClick={()=>{
      setShow("hellojaan")
     }}>click me</button>
        </div>
  )
}

export default Nav







