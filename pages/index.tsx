import type { NextPage } from "next";
import Head from "next/head";

import {
  useContract,
  useMetamask,
  useDisconnect,
  useAddress,
  useContractData,
  useContractCall,
} from "@thirdweb-dev/react";
import { } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Loading from '../components/Loading'
import { currency } from '../constants'
import Header from "../components/Header";
// import CountdownTimer from "../components/CountdownTimer";
// import Marquee from "react-fast-marquee";
import PropagateLoader from "react-spinners/PropagateLoader";
import Login from "../components/Login";
import toast from "react-hot-toast";
import CountdownTimer from "../components/CountdownTimer";


const Home: NextPage = () => {
  const address = useAddress();
  const [userTickets, setUserTickets] = useState(0);

  const [quantity, setQuantity] = useState<number>(1)
  const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS)

  const { data: remainingTickets } = useContractData(contract, "RemainingTickets");
  const { data: currentWinningReward } = useContractData(contract, "CurrentWinningReward");
  const { data: ticketPrice } = useContractData(contract, "ticketPrice");
  const { data: ticketCommission } = useContractData(contract, "ticketCommission")
  const { data: tickets } = useContractData(contract, "getTickets")
  const { data: expiration } = useContractData(contract, "expiration");

  if (isLoading) return (<Loading />)
  if (!address) return (<Login />)

  const { mutateAsync: BuyTickets } = useContractCall(contract, "BuyTickets");


  useEffect(() => {

    if(!tickets) return;

    
  }, [tickets, address])


  const handleClick = async () => {
    if (!ticketPrice) return;

    const notification = toast.loading("Buying your tickets...");
    try {
      const data = await BuyTickets([
        {
          value: ethers.utils.parseEther((Number(ethers.utils.formatEther(ticketPrice)) * quantity).toString()),
        }
      ]);

      toast.success("Tickets purchased successfully!", {
        id: notification,
      });

      console.info("contract call successs", data);
    } catch (err) {
      toast.error("Whoops something went wrong!", {
        id: notification,
      });

      console.error("contract call failure", err);
    }
  };

  return (
    <div className=" bg-[#091B18] min-h-screen flex flex-col">
      <Head>
        <title>Lottery Dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex-1'>

        <Header />

        <div className='space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5'>
          <div className='stats-container'>
            <h1 className='text-5xl mb-5 text-white font-semibold text-center'>
              The Next Draw
            </h1>

            <div className='flex justify-between p-2 space-x-2'>
              <div className='stats'>
                <h2 className='text-sm'>Total Pool</h2>
                <p className="text-xl">
                  {currentWinningReward && ethers.utils.formatEther(currentWinningReward?.toString())}{" "}{currency}
                </p>
              </div>
              <div className="stats">
                <h2>Tickets Remaining</h2>
                <p className="text-xl">{remainingTickets?.toNumber()}</p>
              </div>
            </div>
            {/* countdown timer */}
            <div className="mt-5 mb-3">
              <CountdownTimer />
            </div>
          </div>

          <div className="stats-container space-y-2">
            <div className="stats-container">
              <div className="flex justify-between items-center text-white">


                <h2>Price per ticket</h2>
                <p>{ticketPrice && ethers.utils.formatEther(ticketPrice.toString())}{" "}{currency}</p>
              </div>
              <div className='flex text-white items-center space-x-2 bg=[#091b18] border-[#004337] border p-4'>
                <p>TICKETS</p>
                <input
                  className='flex w-full bg-transparent text-right outline-none'
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className='space-y-2 mt-5'>
                <div className='flex items-center justify-between text-emerald-300 text-sm italic font-extrabold'>
                  <p>Total cost of tickets </p>
                  <p> {ticketPrice && Number(ethers.utils.formatEther(ticketPrice?.toString())) * quantity}{" "}{currency}</p>
                </div>

                <div className='flex items-center justify-between text-emerald-300 text-xs italic'>
                  <p>Service Fees</p>
                  <p>{ticketCommission && ethers.utils.formatEther(ticketCommission.toString())}{" "}{currency}</p>
                </div>

                <div className='flex items-center justify-between text-emerald-300 text-xs italic'>
                  <p>+ Network Fees</p>
                  <p>TBD</p>
                </div>
              </div>


              <button
                // onClick={handleClick}
                disabled={expiration?.toString() < Date.now().toString() || remainingTickets?.toNumber() === 0}
                className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 rounded-md font-semibold text-white shadow-xl disabled:to-gray-600 disabled:from-gray-600 disabled:text-gray-100 disabled:cursor-not-allowed"
              >
                Buy {quantity} Ticket(s) for{" "}
                {ticketPrice &&
                  Number(ethers.utils.formatEther(ticketPrice?.toString())) *
                  quantity}{" "}
                {currency}
              </button>
            </div>
          </div>

        </div>
        {/* The price per ticket */}
        <div className=''>

        </div>
      </div>
    </div>
  )
}

export default Home
