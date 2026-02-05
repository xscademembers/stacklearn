import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const branches = [
  {
    name: "Stack Learn - Hyderabad",
    address: "Hyderabad, Telangana, India",
    phone: "+91 9606031842",
    email: "hyderabad@stacklearn.com",
  },
  {
    name: "Stack Learn - Chennai",
    address: "Chennai, Tamil Nadu, India",
    phone: "+91 9606031843",
    email: "chennai@stacklearn.com",
  },
  {
    name: "Stack Learn - Gudivada",
    address: "Gudivada, Andhra Pradesh, India",
    phone: "+91 9606031844",
    email: "gudivada@stacklearn.com",
  },
];

export default function BranchesPage() {
  return (
    <div className="pb-0">
      {/* Hero */}
      <section className="relative h-64 text-white flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Modern office interior"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">Our Branches</h1>
          <p className="text-xl">Visit the nearest Stack Learn branch for personalized counselling.</p>
        </div>
      </section>

      {/* Search */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto flex gap-4">
            <input
              type="text"
              placeholder="Enter City or Pincode"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
            />
            <select className="px-4 py-3 border border-gray-300 rounded-lg">
              <option>All States</option>
              <option>Telangana</option>
              <option>Andhra Pradesh</option>
              <option>Tamil Nadu</option>
            </select>
            <button className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-strong transition-colors">
              Find Branch
            </button>
          </div>
        </div>
      </section>

      {/* Branches Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {branches.map((branch, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{branch.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FiMapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{branch.address}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPhone className="w-5 h-5 text-primary-600" />
                    <a href={`tel:${branch.phone}`} className="text-gray-600 hover:text-primary-600">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMail className="w-5 h-5 text-primary-600" />
                    <a href={`mailto:${branch.email}`} className="text-gray-600 hover:text-primary-600">
                      {branch.email}
                    </a>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    Get Directions
                  </a>
                  <a
                    href={`tel:${branch.phone}`}
                    className="block w-full text-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Contact Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Find Us on Map</h2>
          <div className="relative rounded-xl h-96 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600"
              alt="Map view"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Team working together"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Can&apos;t find a branch near you?</h2>
          <p className="text-xl mb-8">Get online counselling from anywhere in India.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:shadow-xl transition-all"
          >
            Book Online Counselling
          </Link>
        </div>
      </section>
    </div>
  );
}
