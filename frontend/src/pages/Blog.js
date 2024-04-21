import { useEffect, useState } from 'react';
// import Axios from 'axios';

const Blog = () => {
    const [strays, setStrays] = useState([])
    useEffect(() => {
        const fetchStrays = async () => {
            const response = await fetch('http://localhost:3000/api/blog');
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
        <main id="main">
        {/* ======= Breadcrumbs ======= */}
        <div className="breadcrumbs about-container">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="display-3">Blog</h1>
              <ol>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>Blog</li>
              </ol>
            </div>
          </div>
        </div>
        {/* End Breadcrumbs */}
        {/* ======= Blogs ======= */}
        <section className="py-4">
          <div className="container px-3 px-lg-3">
            <div className="row clearfix justify-content-center">
              <div className="col-lg-8 col-md-12">
                {/*---single post-----*/}
                <div className="card single_post">
                  <div className="body">
                    <div className="img-post">
                      <img
                        className="d-block img-fluid"
                        src="./bg-parallax.jpg"
                        alt="First slide"
                      />
                    </div>
                    <h3>
                      <a href="blog-details.html">Furparent Guide 101</a>
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                  <div className="footerBlog">
                    <div className="actions">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-outline-secondary"
                      >
                        Continue Reading
                      </a>
                    </div>
                    <ul className="stats">
                      <li>
                        <a href="javascript:void(0);">General</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" className="fa fa-heart">
                          28
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" className="fa fa-comment">
                          128
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/*---single post-----*/}
                <div className="card single_post">
                  <div className="body">
                    <div className="img-post">
                      <img
                        className="d-block img-fluid"
                        src="./home-1.jpg"
                        alt="First slide"
                      />
                    </div>
                    <h3>
                      <a href="blog-details.html">Furparent Guide 101</a>
                    </h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                  <div className="footerBlog">
                    <div className="actions">
                      <a
                        href="javascript:void(0);"
                        className="btn btn-outline-secondary"
                      >
                        Continue Reading
                      </a>
                    </div>
                    <ul className="stats">
                      <li>
                        <a href="javascript:void(0);">General</a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" className="fa fa-heart">
                          28
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0);" className="fa fa-comment">
                          128
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      

      
    
        
    )
}

export default Blog;