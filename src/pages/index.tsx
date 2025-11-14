import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { IconType } from 'react-icons';
import { FaShieldAlt, FaLink, FaEye } from 'react-icons/fa';
import Background from 'public/assests/background.jpg'


const FeatureCard = ({ icon: Icon, title, description }: { icon: IconType; title: string; description: string }) => (
  <div className="p-6 bg-gray-800 rounded-xl  transition duration-300">
    <div className="text-white mb-4">
      <Icon className="h-8 w-8 text-muted-foreground" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const backgroundStyle = {
    backgroundImage: `url(${Background.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-16 max-md:px-5 max-sm:px-2">
      <section 
      className="relative rounded-xl flex  items-center justify-center p-6 sm:p-12 text-white py-20  relative my-10 md:py-32"
      style={backgroundStyle}
    >
        <div className="container bg-black/40 p-6 rounded-lg mx-auto text-center">
          <h1 className="text-4xl md:text-3xl max-sm:text-2xl  font-bold tracking-tighter mb-4">
            One link. Infinite unique destinations.
          </h1>
          <p className="text-base max-sm:text-sm md:text-lg mt-6 max-w-4xl mx-auto mb-8 tracking-tighter">
            Create a single gateway URL that generates unique cloaked links for each visitor, hiding the original destination while displaying its content via proxy.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-10 md:py-30 w-full">
        <div className="container mx-auto text-start">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
            Key Features
          </h2>
          <h4 className="text-bold tracking-tighter mb-12">
            Explore the powerful capabilities of Link-veil that make it the ultimate link management solution
          </h4>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          <FeatureCard
            icon={FaShieldAlt}
            title="Enhanced Security"
            description="Protect your original destination URL from being exposed to visitors, ensuring privacy and security."
          />
          
          <FeatureCard
            icon={FaLink}
            title="Unique Cloaked Links"
            description="Generate unique, cloaked links for each visitor, allowing for personalized experiences and detailed tracking."
          />
          
          <FeatureCard
            icon={FaEye}
            title="Transparent Proxy"
            description="Display the content of the original destination via a proxy, maintaining transparency while masking the actual URL."
          />
          
        </div>
        </div>
      </section>

      <section className="py-10 md:py-30 w-full">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
            Ready to transform your link sharing?
          </h2>
          <h4 className="text-bold tracking-tighter mb-12">
            Join thousands of users who are already benefiting from Link-veil's innovative approach to link management
          </h4>
          <div className="flex justify-center mb-16">
            <Button asChild size="lg">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </section>  
    </div>  
  ); 
}