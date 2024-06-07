
import lp1 from '../assets/lp1.jpg';
import lp2 from '../assets/lp2.png';
import lp3 from '../assets/lp3.png';
import lp4 from '../assets/lp4.jpg'
import Carousel from 'react-elastic-carousel'
let data = [
  {
    des: "1",
    imgSrc: lp1
  },
  {
    des: "2",
    imgSrc: lp2
  },
  {
    des: "3",
    imgSrc: lp3
  }
];

let sliderBoxStyle = {
  height: "70vh",
  background: "transparent",
};

let itemsStyle = {
  height: "100%", width : "300px",
  marginRight:"4rem",
  padding : "0px 2rem"
};

let textBoxStyle = {
  display: "none"
};

let buttonSetting = {
  display:"none"
};

let manner = {
  autoSliding: {interval: "4s"}
  , duration: "0.3s"
};

function Landing() {
    return ( 
    <div className='w-full h-[100vh] relative py-4 max-w-lg'>
    <div className="h-1/2 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel
       itemsToShow={1}
       enableAutoPlay={true}
       autoPlaySpeed={3000}
       showArrows={false}
       >
        <item><img style={{pointerEvents:'none'}} className='mt-16 h-80' src={lp1} alt="" /></item>
        <item><img style={{pointerEvents:'none', height:'20rem'}} className='mt-10' src={lp2} alt="" /></item>
        <item><img className='h-80 mt-16' style={{pointerEvents:'none'}} src={lp3} alt="" /></item>
        <item><img style={{pointerEvents:'none'}} className='mt-16 h-80' src={lp4} alt="" /></item>
      </Carousel>
    </div>
      <div className='absolute bottom-12 left-1/2 transform -translate-x-1/2'>
      <button>
        <a href='https://anonymously.link/signup.php' className='bg-blue-600 w-72 mt-4 block px-6 py-3 text-white  rounded-2xl'>Get Started</a>
      </button>
      <div className='mt-3'>
        Already have an account? <span><a  href='https://anonymously.link/signin.php' className='text-blue-600 inline'>Sign In</a></span>
      </div>
      </div>
    </div> );
}

export default Landing;