import { Building2, Award, Shield, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About iTraders Store</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted destination for premium Apple products and accessories in Kenya. 
          We are an authorized Apple reseller, ensuring you get only the best and most authentic products.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-gray-600">
            Founded with a vision to provide authentic Apple products to the Kenyan market, 
            iTraders Store has grown to become one of the most trusted names in premium electronics. 
            Our commitment to quality and customer satisfaction has made us the preferred choice 
            for Apple enthusiasts across the country.
          </p>
          <p className="text-gray-600">
            We pride ourselves on offering only certified Apple products, ensuring that our customers 
            receive genuine items with full warranty coverage. Our team of experts is always ready to 
            provide guidance and support for all your Apple product needs.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Why Choose Us?</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Award className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Authorized Apple Reseller</h3>
                <p className="text-gray-600">All our products are certified and come with official warranty</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Shield className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Genuine Products</h3>
                <p className="text-gray-600">100% authentic Apple products with warranty</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Users className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Expert Support</h3>
                <p className="text-gray-600">Professional team ready to assist you</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-16">
        <h2 className="text-2xl font-semibold mb-6">Visit Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Building2 className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Our Location</h3>
                <p className="text-gray-600">Pioneer House, 7th Floor</p>
                <p className="text-gray-600">Kimathi Street, Nairobi</p>
                <p className="text-gray-600">Kenya</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-medium">Business Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.794441789999!2d36.8275!3d-1.2875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d2a2f39a97%3A0x1b0d535e0a9f63bf!2sPioneer%20House%2C%20Kimathi%20St%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1648123456789!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Have Questions?</h2>
        <p className="text-gray-600 mb-6">
          We're here to help! Contact us for any inquiries about our products or services.
        </p>
        <Button asChild>
          <a href="/shop/contact">Contact Us</a>
        </Button>
      </div>
    </div>
  );
}

export default AboutPage; 