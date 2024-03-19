import { Link } from "react-router-dom"

export const ErorPage = () => {
  return (
    <>
     <h2 className="search-heading">
        This page doesn`t exist, please input correct page or go home!
      </h2>
      
      
        
        <button className="btn-home"><Link to="/">Go home</Link></button>
      </>
  )
}
