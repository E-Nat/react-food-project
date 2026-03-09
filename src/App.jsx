import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { 
  Facebook, Instagram, Twitter, Youtube, 
  Search, Plus, Star, ArrowRight 
} from "lucide-react";

const CouponBanner = () => {
  return (
    <section className="container my-5">
      <div className="bg-white rounded-4 d-flex flex-column flex-md-row align-items-center justify-content-between p-4 p-md-5 shadow-lg position-relative overflow-hidden">
        
        <div className="position-absolute bg-black rounded-circle" style={{ width: '40px', height: '40px', left: '-20px', top: '50%', transform: 'translateY(-50%)' }}></div>
        <div className="position-absolute bg-black rounded-circle" style={{ width: '40px', height: '40px', right: '-20px', top: '50%', transform: 'translateY(-50%)' }}></div>

        <div className="text-start">
          <h3 className="fw-bold text-dark mb-1">
            Delicious food with <br /> exciting discounts you'll love!
          </h3>
          <div className="d-flex align-items-center my-3">
             <div className="d-flex">
                {[1,2,3].map(i => (
                  <div key={i} className={`rounded-circle border border-2 border-white bg-secondary ms-n2`} style={{ width: '35px', height: '35px', marginLeft: i > 1 ? '-12px' : '0' }}></div>
                ))}
             </div>
             <span className="ms-3 text-muted small fw-bold">+2k Happy Clients</span>
          </div>
          <p className="text-muted small mb-0">*Terms and conditions apply</p>
        </div>

        <div className="d-flex align-items-center mt-4 mt-md-0">
          <div className="text-end me-4">
            <p className="mb-0 text-muted small">Grab Flat</p>
            <h2 className="fw-bold display-4 mb-0 text-dark">50% <small className="fs-4">OFF</small></h2>
            <p className="small text-warning fw-bold mb-0">Limited Time Only!</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=150&q=80" 
            alt="deal" 
            className="rounded-circle shadow-sm d-none d-sm-block"
            style={{ width: '110px', height: '110px', objectFit: 'cover', border: '4px solid #f8f9fa' }}
          />
        </div>
      </div>
    </section>
  );
};

const FooterSection = () => {
  return (
    <footer className="pt-5 pb-4 bg-black text-white border-top border-secondary">
      <div className="container">
        <div className="row gy-5">
          <div className="col-md-4">
            <h3 className="text-warning fw-bold mb-3">FOODIE</h3>
            <p className="text-secondary small pe-md-5">Bringing the world's best cuisines straight to your doorstep with love, freshness, and lightning-fast delivery.</p>
            <div className="d-flex gap-3 mt-4">
              <Facebook size={20} className="text-warning cursor-pointer" />
              <Instagram size={20} className="text-warning cursor-pointer" />
              <Twitter size={20} className="text-warning cursor-pointer" />
              <Youtube size={20} className="text-warning cursor-pointer" />
            </div>
          </div>
          <div className="col-6 col-md-2">
            <h6 className="fw-bold mb-4">Quick Links</h6>
            <ul className="list-unstyled text-secondary d-grid gap-2 small">
              <li>Home</li>
              <li>About Us</li>
              <li>Menu</li>
              <li>Chef's Special</li>
            </ul>
          </div>
          <div className="col-6 col-md-2">
            <h6 className="fw-bold mb-4">Categories</h6>
            <ul className="list-unstyled text-secondary d-grid gap-2 small">
              <li>Breakfast</li>
              <li>Lunch Specials</li>
              <li>Dinner</li>
              <li>Fast Food</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold mb-4">Newsletter</h6>
            <p className="small text-secondary">Subscribe to get latest updates and offers.</p>
            <div className="input-group mb-3">
              <input type="text" className="form-control bg-dark border-secondary text-white" placeholder="Email Address" />
              <button className="btn btn-warning" type="button">Go</button>
            </div>
          </div>
        </div>
        <hr className="border-secondary mt-5" />
        <p className="text-center text-secondary small mb-0">Copyright © 2026 Foodie Inc. All Rights Reserved.</p>
      </div>
    </footer>
  );
};


const App = () => {
  return (
    <div className="bg-black text-white min-vh-100 overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      
     
      <nav className="navbar navbar-expand-lg navbar-dark container py-4">
        <a className="navbar-brand fw-bold text-warning fs-3" href="/">FOODIE</a>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-lg-4 fw-medium">
            <li className="nav-item"><a className="nav-link text-warning" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">About</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Menu</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
          </ul>
        </div>
      </nav>

      
      <header className="container my-5 pt-lg-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-2 fw-bold lh-1 mb-4">
              Delicious <br />
              <span className="text-warning">Food For</span> You!
            </h1>
            <p className="text-secondary mb-5 fs-5">
              Experience the art of fine dining delivered to your home. Fresh ingredients, professional chefs, and fast service.
            </p>
            
            <div className="d-flex flex-column gap-4" style={{ maxWidth: '480px' }}>
              <button className="btn btn-warning px-5 py-3 rounded-pill fw-bold fs-5 shadow-lg w-fit-content">
                Discover Our Menu <ArrowRight className="ms-2" size={20} />
              </button>

              <div className="position-relative mt-2">
                <Search size={20} className="text-warning position-absolute translate-middle-y top-50 ms-4" />
                <input 
                  type="text"
                  placeholder="Search for your favorite dish..." 
                  className="form-control bg-dark border-secondary text-white rounded-pill py-3 ps-5 border-opacity-50"
                  style={{ height: '60px' }}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6 text-center mt-5 mt-md-0 position-relative">
          
            <div className="position-absolute top-50 start-50 translate-middle bg-warning rounded-circle opacity-25" style={{ width: '400px', height: '400px', filter: 'blur(80px)' }}></div>
            <img 
              src="https://i.pinimg.com/736x/95/9d/07/959d075f1d43263e53f1bbff0dee4baf.jpg" 
              alt="Food Bowl" 
              className="img-fluid rounded-circle shadow-lg border border-warning border-4 position-relative z-1"
              style={{ width: '450px', height: '450px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </header>

      <CouponBanner />   
      <section className="container py-5">
        <h2 className="text-center mb-5 fw-bold">Explore Our <span className="text-warning">Favorites</span></h2>
        <div className="row g-4">
          {[
            { name: "Burger", price: "29.00", img: "https://i.pinimg.com/1200x/e2/63/e5/e263e50bc39528becbd777a271e297af.jpg" },
            { name: "Chiken friesn", price: "49.00", img: "https://i.pinimg.com/736x/98/0e/43/980e43af1a102d49e8a12cbee8736d9d.jpg" },
            { name: "French fries", price: "35.00", img: "https://i.pinimg.com/736x/72/b5/a1/72b5a16458ea71865ecc8189a3bf42eb.jpg" },
            { name: "Dumplings", price: "19.00", img: "https://i.pinimg.com/736x/de/61/8c/de618cb9693c931a970204f8f81cc51f.jpg" },
             { name: "Noodles", price: "9.00", img: "https://i.pinimg.com/736x/cc/0e/c6/cc0ec678549698920af1632150a0e361.jpg" },
              { name: "Fried shrimp", price: "48.00", img: "https://i.pinimg.com/736x/01/de/4b/01de4b545bb768d801350894727e6862.jpg" },
              { name: "Sushi", price: "89.00", img: "https://i.pinimg.com/736x/2d/59/4d/2d594dcfb176b51ed8c5c094f1788918.jpg" },
              { name: "so yummy tikky", price: "12.00", img: "https://i.pinimg.com/736x/8b/1d/f1/8b1df1457978c9c2c59a37ebc08d4eb0.jpg" },
              { name: "Seafood Boil ", price: "50.00", img: "https://i.pinimg.com/1200x/e1/b9/f6/e1b9f6bccebea2bca086746d48d601f0.jpg" },
              { name: "Fish, food", price: "8.00", img: "https://i.pinimg.com/1200x/1b/5a/b6/1b5ab6a80198c9855bd1f8876cafbab1.jpg" },
              { name: "Grilled Salmon", price: "18.00", img: "https://i.pinimg.com/736x/d0/d7/9c/d0d79cc7c5971f32d1a2273fafabfd48.jpg" },
              { name: "Fried rice", price: "10.00", img: "https://i.pinimg.com/736x/5b/2d/90/5b2d90c8538fb59f07a41794427e861b.jpg" },

              { name: "Mango Juice ", price: "6.00", img: "https://i.pinimg.com/1200x/18/70/8b/18708bba823f75e82385bb1f049611fa.jpg" },
              { name: "Avocado", price: "8.00", img: "https://i.pinimg.com/1200x/49/d3/f7/49d3f72c680c2153d5238c054afbeb12.jpg" },
              { name: "Fresh fruit juice", price: "8.00", img: "https://i.pinimg.com/736x/f2/8b/98/f28b9803a3f2c48ea6f735287cfb1901.jpg" },
              { name: "Fresh fruit juice", price: "10.00", img: "https://i.pinimg.com/736x/58/b2/59/58b25946d0c62eda79e73b3e6ebcbf7e.jpg" },
         ].map((item, index) => (
      <div className="col-6 col-md-3" key={index}>
        <div className="bg-dark bg-opacity-50 p-3 rounded-4 border border-secondary border-opacity-25 h-100 transition-all">
          <img src={item.img} alt={item.name} className="img-fluid rounded-3 mb-3" style={{ height: '160px', width: '100%', objectFit: 'cover' }} />
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0 fw-bold">{item.name}</h6>
            {/* Changed ₹ to $ below */}
            <span className="text-warning small fw-bold">${item.price}</span>
          </div>
          <button className="btn btn-outline-warning btn-sm rounded-pill w-100 mt-3 d-flex align-items-center justify-content-center gap-2">
            <Plus size={14} /> Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

      <FooterSection />
    </div>
  );
};

export default App;