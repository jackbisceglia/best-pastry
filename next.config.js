/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "https://www.masslive.com/resizer/XjPHu86FEwFyoPi9xngz9uEdOKQ=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/63SS2NLLCNE4HD5XV6GTN4H7YE.jpg",
      "https://www.pastriesbyrandolph.com/wp-content/uploads/2019/03/raspberry-almond-bear-claw.jpg",
      "https://www.smalltownwoman.com/wp-content/uploads/2019/04/Apple-Fritters-DSC_0145-4-500x400.jpg",
    ],
  },
};

module.exports = nextConfig;
