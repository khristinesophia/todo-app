import 'bootstrap/dist/css/bootstrap.min.css'
import header from '../assets/header.png'
import '../App.css'


function HeaderImage() {
  return (
    <>
        <img 
          className="header"
          src={header} 
          alt="" 
        />
    </>
  )
}

export default HeaderImage