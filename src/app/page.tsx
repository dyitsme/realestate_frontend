import Navbar from '../components/Navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="flex flex-col flex-col-reverse sm:flex-row items-center px-20 py-20">
        <div className="flex-1 flex flex-col gap-20">
          <div>
            <h1 className="font-bold sm:text-5xl text-4xl mb-4">HomeBudget</h1>
            <p className="text-xl sm:text-2xl">A price predictor tool for residential properties in Pasig and Paranaque city.</p>
          </div>
          <div>
            <a href="/map" className="focus:outline-none text-white bg-sky-500 hover:bg-sky-600 focus:ring-2 focus:ring-sky-300 font-medium rounded text-lg px-5 py-2.5 me-2 mb-2">Go to dashboard</a>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <Image src="accounting.svg" width={446} height={314} alt="realestate"/>
        </div>
      </div>
    </div>
  )
}
