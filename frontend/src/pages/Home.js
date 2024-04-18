import { useEffect, useState } from 'react';
// import Axios from 'axios';

const Home = () => {
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
        <><section className="menu">
        <div className="menu-text">
            <h5>
            K<sup>2</sup>MJS
            </h5>
            <h4>Find Your Furry Soulmate</h4>
            <h1>MeowgAw</h1>
            <p>
            Welcome to MeowgAw! We're dedicated to finding loving FURever homes for
            our furry friends. Discover a variety of adorable and playful pets, from
            cuddly cats to energetic dogs, waiting to bring joy into your life. Let's
            create a world where every pet finds a loving home.
            </p>
            <a href="/gallery">
            <button className="menu-btn button2 check">Check-out strays</button>
            </a>
            <a href="/donate">
            <button className="menu-btn button2">Donate</button>
            </a>
        </div>
        <div className="menu-img">
            <img src="./pics/icon2.png" />
        </div>
        </section>
        {/*-----------icons------------*/}
  <div className="icons">
    <a href="#">
      <i className="ri-instagram-fill" />
    </a>
    <a href="#">
      <i className="ri-youtube-fill" />
    </a>
    <a href="#">
      <i className="ri-facebook-circle-fill" />
    </a>
  </div>
  <div className="scroll-down">
    <a href="#footer" id="scroll-link">
      <i className="ri-arrow-down-line" />
    </a>
  </div>
  {/*-----------adoption info---------*/}
  <div className="infosection">
    <h2>Planning to Adopt a Pet?</h2>
    <div id="infos">
      <div className="info-card">
        <h4>Checklist for New Adopters</h4>
        <img className="infoimg" src="./pics/checklist.png" />
        <p>Make your adoption experience as smooth as possible.</p>
        <button className="button1" onclick="location.href='/blogs'">
          Learn More
        </button>
      </div>
      <div className="info-card">
        <h4>Furparent Guide 101</h4>
        <img className="infoimg" src="./pics/info.png" />
        <p>All you need to know on what to expect as a new pet owner.</p>
        <button className="button1" onclick="location.href='/blogs'">
          Learn More
        </button>
      </div>
      <div className="info-card">
        <h4>FAQs About Pet Adoption</h4>
        <img className="infoimg" src="./pics/adoption.png" />
        <p>Get answers to all of your questions about pet adoption.</p>
        <button className="button1" onclick="location.href='/blogs'">
          Learn More
        </button>
      </div>
    </div>
  </div>
        <div className="home">
            <div className="strays">
                {strays.map((stray) => (
                    <p key={stray.name}>{stray.name}</p>
                ))}
            </div>
            
        </div></>
        
    )
}

export default Home;