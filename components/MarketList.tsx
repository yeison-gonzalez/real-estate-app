import React from 'react'
import Link from 'next/link'
import MarketCard from './MarketCard'
import { useGetIdsBySymbol } from '@/hooks'
import { fetchGetAllTickers, fetchGetMarketByCoin } from '@/api/fetchApi'

interface IMarketListProps {
    markets: string
}

export interface IMarket {
    name: string
    base: string
    quote: string
    price: number
    price_usd: number
    volume: number
    volume_usd: number
    time: number
}

const MarketList: React.FC<IMarketListProps> = async ({ markets }) => {
    const { handleGetIds } = useGetIdsBySymbol()
    const cryptos = await fetchGetAllTickers()
    const optionsMarkets = await fetchGetMarketByCoin({ id: handleGetIds(cryptos, markets) })

    return (
        <div className='flex flex-col gap-y-6'>
            <div className='flex justify-center rounded-2xl bg-black p-5 relative'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 fill-orange-400 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
                <h3 className='text-white font-bold text-xl'>Markets ({ markets })</h3>

                <Link href='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 stroke-red-600 absolute top-2 right-2">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                    </svg>
                </Link>
            </div>
            <div className='flex flex-col gap-y-4 rounded-2xl bg-black p-5'>
                {optionsMarkets?.map((market, index) => (
                    <MarketCard key={index} market={market} />
                ))}
            </div>
        </div>
    )
}

export default MarketList
