import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-off-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-montserrat font-bold text-4xl text-deep-gray mb-4">
            About CopperBear
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted partner for electrical products and services in Madurai
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-montserrat font-bold text-3xl text-deep-gray mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 mb-4">
              Founded in Madurai with a vision to provide high-quality electrical products and reliable services, 
              CopperBear has been serving the local community for over a decade.
            </p>
            <p className="text-gray-600 mb-4">
              We specialize in electrical installations, repairs, and maintenance services for both residential 
              and commercial properties. Our team of certified electricians ensures safety and quality in every project.
            </p>
            <p className="text-gray-600">
              With over 1,000+ electrical products in stock and a commitment to customer satisfaction, 
              we're your one-stop solution for all electrical needs.
            </p>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&h=400&fit=crop"
              alt="CopperBear Team"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-copper rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-bolt text-white text-2xl"></i>
            </div>
            <h3 className="font-montserrat font-bold text-xl text-deep-gray mb-2">
              Expert Service
            </h3>
            <p className="text-gray-600">
              Certified electricians with years of experience in residential and commercial projects.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-copper rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-shield-alt text-white text-2xl"></i>
            </div>
            <h3 className="font-montserrat font-bold text-xl text-deep-gray mb-2">
              Safety First
            </h3>
            <p className="text-gray-600">
              All work follows strict safety protocols and industry standards for your peace of mind.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-copper rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-clock text-white text-2xl"></i>
            </div>
            <h3 className="font-montserrat font-bold text-xl text-deep-gray mb-2">
              Reliable Support
            </h3>
            <p className="text-gray-600">
              24/7 customer support and quick response times for emergency electrical issues.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="font-montserrat font-bold text-2xl text-deep-gray mb-6 text-center">
            Why Choose CopperBear?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-copper rounded-full flex items-center justify-center mt-1">
                <i className="fas fa-check text-white text-xs"></i>
              </div>
              <div>
                <h4 className="font-semibold text-deep-gray mb-1">Quality Products</h4>
                <p className="text-gray-600 text-sm">Premium electrical products from trusted brands</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-copper rounded-full flex items-center justify-center mt-1">
                <i className="fas fa-check text-white text-xs"></i>
              </div>
              <div>
                <h4 className="font-semibold text-deep-gray mb-1">Competitive Pricing</h4>
                <p className="text-gray-600 text-sm">Best prices in Madurai with no hidden charges</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-copper rounded-full flex items-center justify-center mt-1">
                <i className="fas fa-check text-white text-xs"></i>
              </div>
              <div>
                <h4 className="font-semibold text-deep-gray mb-1">Professional Team</h4>
                <p className="text-gray-600 text-sm">Skilled and certified electrical professionals</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-copper rounded-full flex items-center justify-center mt-1">
                <i className="fas fa-check text-white text-xs"></i>
              </div>
              <div>
                <h4 className="font-semibold text-deep-gray mb-1">Local Expertise</h4>
                <p className="text-gray-600 text-sm">Deep understanding of Madurai's electrical needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}