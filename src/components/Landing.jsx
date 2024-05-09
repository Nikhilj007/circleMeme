
import lp1 from '../assets/lp1.jpg';
import lp2 from '../assets/lp2.png';
import lp3 from '../assets/lp3.png';
import Carousel from '../utils/Carousel';

const slides = [
    lp1, lp2, lp3
]

function Landing() {
    return ( 
    <div className='w-full py-4 max-w-lg'>
      <Carousel>
        {slides.map((s,index)=><img key={index} src={s} alt='landing page' className='w-full  object-fit mx-5 pl-5' />)}
      </Carousel>
      <button>
        <a href='/gossip' className='bg-blue-600 mt-4 block px-6 py-3 text-white  rounded-2xl'>Get Started</a>
      </button>
      <div>
        Already have an account? <a href='/signin' className='text-blue-600'>Sign In</a>
      </div>
    </div> );
}

export default Landing;