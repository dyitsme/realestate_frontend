'use client'
// import Map from '../../components/Map'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

export default function MyPage() {
  const Map = useMemo(() => dynamic(
    () => import('@/components/Map'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

  return <div>
    <Map />
  </div>
}
