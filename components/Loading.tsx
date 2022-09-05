import React from 'react'
import Image from 'next/image'
import ethPic from '../assets/ethPic.png'
import PropagateLoader from 'react-spinners/PropagateLoader'
import {
    useContract,
    useMetamask,
    useDisconnect,
    useAddress,
    useContractData,
    useContractCall
  } from "@thirdweb-dev/react"

const Loading = () => {
    return (
        <div>
            <div className='bg-[#091B18] h-screen flex flex-col items-center justify-center'>
                <div className='flex items-center space-x-2 mb-10'>
                    <Image className='rounded-full h-10 w-10' src={ethPic} width='300px' height='200px' alt='this is my image' />
                    <h1 className='text-lg text-white font-bold'>Loading the Lottery</h1>
                </div>
                <PropagateLoader color='white' size={30} />
            </div>

        </div>
    )
}

export default Loading