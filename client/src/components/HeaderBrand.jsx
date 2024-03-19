import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../assets/logo.png'
import '../App.css'


function HeaderBrand() {
  return (
    <>
        <div className="d-flex align-items-center">
            <img 
                className="logo"
                src={logo} 
                alt="" 
            />
            <h1 className="brand-name">LexMeet!</h1>
        </div>
    </>
  )
}

export default HeaderBrand