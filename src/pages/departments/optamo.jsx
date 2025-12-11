// src/pages/departments/Optamo.jsx
const Optamology = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-green-600 to-blue-700 text-white py-16 px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ophthalmology Department</h1>
            <p className="text-xl opacity-90">Comprehensive Eye Care & Vision Services</p>
          </div>
        </section>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Our Ophthalmology Department</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Our Ophthalmology Department provides comprehensive eye care services 
                using state-of-the-art technology for diagnosis and treatment of eye conditions.
              </p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Services</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  'Cataract Surgery',
                  'LASIK & Refractive Surgery',
                  'Glaucoma Treatment',
                  'Retina Services',
                  'Cornea Treatment',
                  'Pediatric Ophthalmology',
                  'Contact Lens Fitting',
                  'Low Vision Rehabilitation'
                ].map((service, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (023) 456-7892
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  ophthalmology@medicalcenter.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Optamology