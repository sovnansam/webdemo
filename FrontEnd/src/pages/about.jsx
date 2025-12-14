// src/pages/About.jsx
const About = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About Our Medical Center
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For over 20 years, we have been providing exceptional healthcare services 
              with compassion, innovation, and excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To provide comprehensive, high-quality healthcare services that are accessible 
                to all members of our community. We strive to deliver compassionate care 
                while advancing medical knowledge and technology.
              </p>
              <p className="text-lg text-gray-600">
                Our dedicated team of healthcare professionals works tirelessly to ensure 
                that every patient receives personalized attention and the best possible 
                medical outcomes.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Medical Team" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '❤️',
                title: 'Compassion',
                description: 'We treat every patient with empathy, kindness, and understanding.'
              },
              {
                icon: '⭐',
                title: 'Excellence',
                description: 'We maintain the highest standards of medical care and service quality.'
              },
              {
                icon: '🤝',
                title: 'Integrity',
                description: 'We are honest, transparent, and ethical in all our actions.'
              },
              {
                icon: '💡',
                title: 'Innovation',
                description: 'We embrace new technologies and medical advancements.'
              },
              {
                icon: '👥',
                title: 'Teamwork',
                description: 'We collaborate to provide comprehensive patient care.'
              },
              {
                icon: '🎯',
                title: 'Patient-Centered',
                description: 'We put patients at the center of everything we do.'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Two decades of serving our community</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {[
                {
                  year: '2003',
                  title: 'Foundation',
                  description: 'Established with a vision to provide quality healthcare to the community.'
                },
                {
                  year: '2008',
                  title: 'Expansion',
                  description: 'Added new specialized departments and advanced medical equipment.'
                },
                {
                  year: '2015',
                  title: 'Technology Upgrade',
                  description: 'Implemented electronic health records and digital imaging systems.'
                },
                {
                  year: '2020',
                  title: 'Pandemic Response',
                  description: 'Led community COVID-19 response and vaccination efforts.'
                },
                {
                  year: '2023',
                  title: 'Modernization',
                  description: 'Completed major facility upgrade with state-of-the-art technology.'
                }
              ].map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{milestone.year}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-lg text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50K+', label: 'Patients Treated' },
              { number: '100+', label: 'Expert Doctors' },
              { number: '25+', label: 'Medical Departments' },
              { number: '24/7', label: 'Emergency Service' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Meet the experts leading our medical center</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. James Wilson',
                position: 'Chief Medical Officer',
                image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                bio: 'Over 25 years of experience in healthcare management and patient care.'
              },
              {
                name: 'Dr. Maria Rodriguez',
                position: 'Head of Surgery',
                image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                bio: 'Renowned surgeon with expertise in minimally invasive procedures.'
              },
              {
                name: 'Dr. Robert Kim',
                position: 'Medical Director',
                image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                bio: 'Leading our medical operations with focus on quality and innovation.'
              }
            ].map((leader, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={leader.image} 
                  alt={leader.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{leader.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{leader.position}</p>
                  <p className="text-gray-600">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Whether you need a routine check-up or specialized care, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
              Book Appointment
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About