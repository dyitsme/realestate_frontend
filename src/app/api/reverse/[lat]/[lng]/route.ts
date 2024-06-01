
// To handle a GET request to /api
export async function GET(request: Request, context: any) {
  const { params } = context
  console.log(params)
  console.log(params.lat)
  console.log(params.lng)
  // const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(params.query)}&key=${key}`
  const url = `https://photon.komoot.io/reverse?lon=${params.lng}&lat=${params.lat}`
  console.log(url)
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  // console.log(JSON.stringify(await res.json(), null, '\t'))
  const addresses = await res.json()
  const city = addresses.features[0].properties.city
  return Response.json(city)
}