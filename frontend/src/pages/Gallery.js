import { useEffect, useState } from 'react';
// import Axios from 'axios';

const Gallery = () => {
    const [strays, setStrays] = useState([])
    useEffect(() => {
        const fetchStrays = async () => {
            const response = await fetch('http://localhost:3000/api/');
            console.log(response);
            
            let json = await response.json();
            // json = JSON.stringify(json);
            console.log(typeof(json));
            console.log(json);
            if (response.ok) {
                setStrays(json);
            }
        }
        fetchStrays()
        // console.log("out");
        // Axios.get("/api/gallery").then((res) => {
        //     console.log("response");
        //     console.log(res);
        //     console.log(res.data);
        //     // setStrays(res.data);
        // })
    }, []);

    return (
        <>
  {/*gallery banner*/}
  <main id="main">
    {/* ======= Breadcrumbs ======= */}
    <div className="breadcrumbs gallery-container mb-3">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="display-3">Gallery</h1>
          <ol>
            <li>
              <a href="/">Home</a>
            </li>
            <li>Gallery</li>
          </ol>
        </div>
      </div>
    </div>
    {/* End Breadcrumbs */}
    <div className="container p-1">
      <div className="mb-4">
        {/*-filter buttons-*/}
        <div className="dropdown d-inline mb-2">
          <h4
            className="btn dropdown-toggle filterBtn"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Type
          </h4>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Cat
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Dog
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Reptile
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Other
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown d-inline">
          <button
            className="btn dropdown-toggle filterBtn"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sex
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Male
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Female
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown d-inline">
          <button
            className="btn dropdown-toggle filterBtn"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Color
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                White
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Black
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Orange
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Brown
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Other
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown d-inline">
          <button
            className="btn dropdown-toggle filterBtn"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Size
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown d-inline">
          <button
            className="btn dropdown-toggle filterBtn"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Age Range
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                &lt;1 year old
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                1 - 2 years old
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                3-4 years old
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                &gt;5 years old
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row galleryWrapper"></div>
    </div>
    {/* End */}
  </main>
</>

      
    
        
    )
}

export default Gallery;