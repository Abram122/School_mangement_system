import '../asset/styles/landing.css'
export default function Landing() {
    return (
        <div className="landing">
            <div className='heading flex items-center flex-col justify-center h-full'>
                <h1 className='text-3xl text-white'>Abram School Management System</h1>
                <div className='heading-buttons mt-4'>
                    <button className='py-2 px-6 bg-black text-white rounded-md mx-4 hover:bg-slate-400 duration-200'>Details</button>
                    <button className='py-2 px-6 bg-black text-white rounded-md mx-4 hover:bg-slate-400 duration-200'>Login</button>
                </div>
            </div>
        </div>
    );
}