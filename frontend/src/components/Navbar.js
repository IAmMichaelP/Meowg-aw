import { Link } from 'react-router-dom'

const Navbar = () => {
    
    return (

        <>
  <a href="/" className="logo">
    <img src="/pics/logo.png" id="logopic" />
  </a>
  <ul className="navlist">
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/gallery">Gallery</a>
    </li>
    <li>
      <a href="/about">About Us</a>
    </li>
    <li>
      <a href="/donate">Donate</a>
    </li>
    <li>
      <a href="/blogs">Blogs</a>
    </li>
    <li>
      <a href="/shop">Shop</a>
    </li>
  </ul>
</>

    )
}

export default Navbar;