import Image from 'next/image'
import ethPic from '../assets/ethPic.png'
import { useMetamask } from '@thirdweb-dev/react'

const Login = () => {
    const connectWithMetamask = useMetamask();

    return (
        <div className='bg-[#091B18] min-h-screen flex flex-col items-center justify-center text-center'>
            <div className='flex flex-col items-center mb-10'>
                <Image
                    className='rounded-full h-56 w-56 mb-10'
                    src={ethPic} width='300px'
                    height='200px'
                    alt='this is my image'
                />
                <h1 className='text-6xl text-white font-bold'>The Lottery</h1>
                <h2 className='text-white'>Get Started By logging in with your MetaMask</h2>
                <button
                    onClick={connectWithMetamask}
                    className='bg-white px-8 py-5 mt-10 rounded-lg shadow-lg font-bold'>
                    Login with MetaMask
                </button>
            </div>
        </div>
    )
}

export default Login