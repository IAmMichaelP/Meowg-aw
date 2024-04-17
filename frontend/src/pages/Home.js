import { useEffect, useState } from 'react';
// import Axios from 'axios';

const Home = () => {
    const [strays, setStrays] = useState([{"name":"Jus", "animal":"cat"}, {"name":"Gis", "animal":"dog"}])
    useEffect(() => {
        const fetchStrays = async () => {
            const response = await fetch('http://localhost:3000/');
            console.log(response);
            
            let json = await response.json();
            // json = JSON.stringify(json);
            console.log(typeof(json));
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
        <div className="home">
            <div className="strays">
                {strays.map((stray) => (
                    <p key={stray.name}>{stray.name}</p>
                ))}
            </div>
            
        </div>
    )
}

export default Home;