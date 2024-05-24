import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <body className="bg-gray-100">
	<Navbar/>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4">Welcome to the Property Price Predictor</h1>
        <p className="text-gray-600 mb-6">
          This site provides a rough estimate for a given property price.
          To get a price prediction, you'll need to provide the following property details:
        </p>
        <ul className="list-disc pl-6 mb-6">
          <li>Address of the property</li>
          <li>Number of bedrooms</li>
          <li>Number of bathrooms</li>
          <li>Lot size (m²)</li>
          <li>Land size (m²)</li>
          <li>Number of included amenities in the property</li>
          <li>Type of payment (e.g., cash, mortgage, etc.)</li>
        </ul>
        <p className="text-gray-600">
          After providing these details, the site will generate a rough estimate of the property price.
          Keep in mind that these predictions are not expected to be completely accurate with the actual value of the property.
        </p>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Authors</h2>
          <ul className="list-disc pl-6">
            <li>Sean Iverson Caoile</li>
            <li>Daniel Philippe Capinpin</li>
            <li>Gavin Matthew Tan</li>
            <li>Denzel Yongco</li>
          </ul>
        </div>
      </div>
    </body>
  );
}
