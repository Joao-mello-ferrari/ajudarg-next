import dynamic from 'next/dynamic'

const getMarkers = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/markers`, {
    method: 'GET',
    cache: 'no-cache',
  })
  return await response.json()
}
const getRiskAreas = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/risk-areas`,
    {
      method: 'GET',
      cache: 'no-cache',
    },
  )
  return await response.json()
}

const DynamicMap = dynamic(() => import('../components/maps'), {
  ssr: false,
})

export default async function Page() {
  const markers = await getMarkers()
  const riskAreas = await getRiskAreas()
  return (
    <main className="h-[calc(100vh-5rem)] w-full">
      <DynamicMap markers={markers} risks={riskAreas} />
    </main>
  )
}