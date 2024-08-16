import img from '../asset/images/landing3.jpg'
import "../asset/styles/About.css"
const VideoSection = () => {
    return (
        <div className="vedio-section mt-6">
            <div className='video-text'>
                <h1 className="text-4xl text-center"><span className="text-lime-500">Video</span> About <span className="text-lime-500">our</span> School</h1>
                <hr className="bg-lime-500 w-52 h-1 mt-3 m-auto" />
                <h1 className="text-xl text-center mt-3">Video Presentation About Website</h1>
                <hr className="bg-lime-500 w-44 h-1 mt-3 m-auto" />
            </div>  
            <div className='mt-8 flex flex-wrap gap-y-7 w-[90%] flex-col-reverse md:flex-row  m-auto justify-center md:justify-between items-center'>
                <div className='w-[100%] md:w-[45%]'>
                    <img src={img} alt="video" className='w-full h-[300px]' />
                </div>
                <div className='w-[100%] md:w-[45%] space-y-3 p-2 hover:bg-lime-500 hover:text-white hover:shadow-lg hover:translate-x-2 hover:translate-y-2 duration-300 video-text'>
                    <h3 className='text-2xl text-lime-500 video-heading'>In This Video Website Offers :</h3>
                    <h3 className='ms-3'>- Create Account feature</h3>
                    <h3 className='ms-3'>- Register feature</h3>
                    <h3 className='ms-3'>- Be In Touch With Teachers</h3>
                    <h3 className='ms-3'>- Contact School</h3>
                    <h3 className='ms-3'>- Upload Assignment</h3>
                    <h3 className='ms-3'>- Get Materials</h3>
                    <h3 className='ms-3'>- And more</h3>
                </div>
            </div>
        </div>
    );
}

export default VideoSection;