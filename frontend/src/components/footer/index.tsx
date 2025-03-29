const footerNavigation = {
    products: [
        { name: "Bags", href: "#" },
        { name: "Tees", href: "#" },
        { name: "Objects", href: "#" },
        { name: "Home Goods", href: "#" },
        { name: "Accessories", href: "#" },
    ],
    customerService: [
        { name: "Contact", href: "#" },
        { name: "Shipping", href: "#" },
        { name: "Returns", href: "#" },
        { name: "Warranty", href: "#" },
        { name: "Secure Payments", href: "#" },
        { name: "FAQ", href: "#" },
        { name: "Find a store", href: "#" },
    ],
    company: [
        { name: "Who we are", href: "#" },
        { name: "Sustainability", href: "#" },
        { name: "Press", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Terms & Conditions", href: "#" },
        { name: "Privacy", href: "#" },
    ],
    legal: [
        { name: "Terms of Service", href: "#" },
        { name: "Return Policy", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Shipping Policy", href: "#" },
    ],
    bottomLinks: [
        // { name: "Accessibility", href: "#" },
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
    ],
};

export default function Footer() {
    return (

        <footer aria-labelledby="footer-heading" className="bg-white">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="py-10 md:flex md:items-center md:justify-between">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} All Rights Reserved
                        </p>
                    </div>

                    <div className="mt-4 flex items-center justify-center md:mt-0">
                        <div className="flex space-x-8">
                            {footerNavigation.bottomLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm text-gray-500 hover:text-gray-600"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}
