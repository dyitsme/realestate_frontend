import Navbar from '@/components/Navbar'

export default function About() {
  return (
    <div className="">
      <Navbar/>
        <div className="max-h-screen mx-auto px-8 sm:px-48 lg:px-72 py-8 overflow-scroll">
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
            <li>Age</li>
            <li>Number of floors</li>
            <li>Number of car spaces</li>
            <li>Purchase type</li>
            <li>Sale type</li>
            <li>Furnishing type</li>
            <li>Property type</li>
            <li>Number of included amenities in the property</li>
            <li>Image of the property</li>
            <li>Type of payment (e.g., cash, mortgage, etc.)</li>
          </ul>
          <p className="text-gray-600">
            After providing these details, the site will generate a rough estimate of the property price.
            Keep in mind that these predictions are not expected to be completely accurate with the actual value of the property.
          </p>
          <div className="my-10">
            <h2 className="text-xl font-semibold mb-2">Acknowledgements</h2>
            We'd like to thank Kafa Studio from Iconscout, Elegant Themes, and Flowbite for the illustrations and icons used.
          </div>

          <div className="my-10">
            <h2 className="text-xl font-semibold mb-2">Authors</h2>
            <ul className="list-disc pl-6">
              <li>Sean Iverson Caoile</li>
              <li>Daniel Philippe Capinpin</li>
              <li>Gavin Matthew Tan</li>
              <li>Denzel Yongco</li>
            </ul>
          </div>
        </div>
      </div>
  );
}
