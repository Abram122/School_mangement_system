import flag from '../asset/images/flag.png'
import docs from '../asset/images/sheet.png'
import rooms from '../asset/images/business-presentation.png'
import '../asset/styles/About.css'
const AboutSchool = () => {
    return (
        <div className="about-school mt-5" id='about-us'>
            <h1 className="text-4xl text-center"><span className="text-lime-500">About</span> our School</h1>
            <hr className="bg-lime-500 w-40 h-1 mt-3 m-auto"/>
            <h1 className="text-xl text-center mt-3">Abram's international school provides</h1>
            <hr className="bg-lime-500 w-40 h-1 mt-3 m-auto"/>
            <div className="mt-5 flex flex-wrap justify-center gap-7">
                <div className="about w-[340px] text-center shadow-lg gap-4 flex flex-col items-center justify-center bg-white rounded-lg p-4 ">
                    <div className='w-[70px] h-[70px] p-3 rounded-full bg-gray-200'>
                        <img src={flag} alt='flag img' className='w-full h-full' />
                    </div>
                    <div className='text'>
                        <h1 className='text-2xl text-lime-500 about-heading'>Clean Enveronment</h1>
                        <p className='leading-[26px] mt-2 text-[17px]'>Maintaining a clean and hygienic environment is a top priority at our school. We ensure that all areas, including classrooms, restrooms,
                            and common spaces, are regularly sanitized to provide a safe and healthy atmosphere for our students and staff.</p>
                    </div>
                </div>
                <div className="w-[340px] text-center shadow-lg gap-4 flex flex-col items-center justify-center bg-white rounded-lg p-4 about">
                    <div className='w-[70px] h-[70px] p-3 rounded-full bg-gray-200'>
                        <img src={docs} alt='flag img' className='w-full h-full' />
                    </div>
                    <div className='text'>
                        <h1 className='text-2xl text-lime-500 about-heading'>Big playground & area</h1>
                        <p className='leading-[26px] mt-2 text-[17px]'>We are proud to offer a spacious playground and recreational area where students can engage in physical activities and outdoor games. This large space ensures
                            that every child has the opportunity to play, explore, and develop essential social skills.</p>
                    </div>
                </div>
                <div className="w-[340px] text-center shadow-lg gap-4 flex flex-col items-center justify-center bg-white rounded-lg p-4 about">
                    <div className='w-[70px] h-[70px] p-3 rounded-full bg-gray-200'>
                        <img src={rooms} alt='flag img' className='w-full h-full' />
                    </div>
                    <div className='text'>
                        <h1 className='text-2xl text-lime-500 about-heading'>Arrange Rooms</h1>
                        <p className='leading-[26px] mt-2 text-[17px]'>Our classrooms are thoughtfully arranged to create an optimal learning environment. Each room is equipped with modern
                            amenities and organized to encourage collaborative and individual learning experiences.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutSchool;