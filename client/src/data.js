// import icons
import {
  IoLogoYoutube,
  IoLogoFacebook,
  IoLogoGithub,
  IoLogoInstagram,
  IoMdAddCircle,
  IoIosCheckmarkCircle,
  IoIosArrowRoundForward,
  IoIosChatboxes,
  IoMdLock,
  IoIosList,IoIosArrowDown
} from 'react-icons/io';

// import images
import Features1Img from './assets/img/features-1.jpg';
import Features2Img from './assets/img/features-2.jpg';
import ChairImg from './assets/img/photo.jpg';
import BedImg from './assets/img/venue.jpg';
import CupboardImg from './assets/img/decor.jpg';
import photo from '../src/Pages/User/Photographer'
import login from '../src/Pages/User/Otp'

// import Product1Img from './assets/img/products/Product1.jpg';

// import Product3Img from './assets/img/products/produc3.jpg';
// import Product4Img from './assets/img/products/product-4.png';
// import Product5Img from './assets/img/products/product-5.png';
// import Product6Img from './assets/img/products/product-6.png';
// import Product7Img from './assets/img/products/product-7.png';
// import Product8Img from './assets/img/products/product-8.png';
// import Product9Img from './assets/img/products/product-9.png';
// import Product10Img from './assets/img/products/product-10.png';
import TestimonialImg from './assets/img/testimonial.jpg';
import Avatar1Img from './assets/img/avatar-1.png';
import Avatar2Img from './assets/img/avatar-2.png';
import Avatar3Img from './assets/img/avatar-3.png';
import Avatar4Img from './assets/img/avatar-4.png';


export const navigation = [
  {
    name: 'HOME',
    href:'/'
    
  },
 
  {
    name: 'EVENT MANAGEMENT',
    href: '/vendor/vendor',
  },
  {
    name: 'LOGIN',
    href: '/login',
  },
 
];

export const hero = {
  title: 'Creative Home Simpify your Furniture',
  subtitle:
    'Do i have consent to record this meeting gain locaion, root-and-branch, review, nor game plan who’s the goto',
  buttonText: 'Shop Now',
};

export const stats = [
  {
    value: '1+',
    text: 'Planning',
  },
  {
    value: '1+',
    text: 'Decorations',
  },
  {
    value: '1+',
    text: 'Weddings',
  },
  {
    value: '1+',
    text: 'Experiance',
  },
];

export const features = {
  image: <Features1Img />,
  title: 'About us :We Are The Best Event Planner & Decor.',
  subtitle:
    'Convallis gravida odio viverra nisi, aliquam. Sed at semper at lacus. Nam integer nunc pellentesque nunc pulvinar donec scelerisque. Malesuada massa facilisis aliquam nunc ut nisl tincidunt nibh. Massa feugiat vitae habitant metus viverra. Praesent massa habitant sapien odio ac scelerisque praesent id.',
  buttonText: 'Show Now',
  items: [
    {
      icon: <IoIosCheckmarkCircle />,
      title: 'Valuation Services',
      subtitle:
        'Sometimes features require a short description.  This can be detailed description',
    },
    {
      icon: <IoIosCheckmarkCircle />,
      title: 'Development of Furniture Models',
      subtitle:
        'Sometimes features require a short description.  This can be detailed description',
    },
  ],
  feature2: {
    image: <Features2Img />,
    title: 'The Best event planner for your choice',
    subtitle:
      'Event management power is a software as services for multiperpose business management system, expecially for them who are running two or more business exploree the future Furnitre power is a software as services.',
  },
};

export const newInStore = {
  title: 'Start with Enlance Magico',
  subtitle:'planning your everlasting memories.',

  icon: <IoIosArrowRoundForward />,
  products: [
    {
      name: 'WEDDING PLANNERS',
      image: <ChairImg />,
      href:'photo'
    
     
    },
    {
      name: 'PERSONAL EVENTS',
      image: <BedImg />,
      href:'login'
    },
    {
      name: 'BIRTHDAY PARTY',
      image: <CupboardImg />,
    },
    
  ],
};

// export const products = {
//   title: 'Our Featured  Wedding Stories',
//   subtitle:
//     'The products we provide only for you as our service are selected from the best products with number 1 quality in the world',
//   pages: [
//     {
//       productList: [
//         {
//           image: <Product1Img />,
//           icon: <IoMdAddCircle />,
//           name: 'Ceiling Light',
         
//         },
       
//         {
//           image: <Product3Img />,
//           icon: <IoMdAddCircle />,
         
//         },
//         {
//           image: <Product4Img />,
//           icon: <IoMdAddCircle />,
//           name: 'Ole Gundorse Spring',
//         },
        
//       ],
//     },
//     {
//       productList: [
//         {
//           image: <Product1Img />,
//           icon: <IoMdAddCircle />,
//           name: 'Ceiling Light',
//           price: 75,
//           oldPrice: 82,
//         },
     
//         {
//           image: <Product3Img />,
//           icon: <IoMdAddCircle />,
//           name: 'Papper Cupboard',
//           price: 105,
//           oldPrice: 120,
//         },
//         {
//           image: <Product4Img />,
//           icon: <IoMdAddCircle />,
//           name: 'Ole Gundorse Spring',
//           price: 75,
//           oldPrice: 82,
//         },
//         {
//           image: <Product5Img />,
//           icon: <IoMdAddCircle />,
//           name: 'Treos Seroes 911',
//           price: 200,
//           oldPrice: 210,
//         },
//         {
//           image: <Product6Img />,
//           icon: <IoMdAddCircle />,
//           name: 'Multi bilderman slibber',
//           price: 45,
//           oldPrice: 50,
//         },
//         {
//           image: <Product7Img />,
//           icon: <IoMdAddCircle />,
//           name: 'XORA corner desk',
//           price: 320,
//           oldPrice: 325,
//         },
//         {
//           image: <Product8Img />,
//           icon: <IoMdAddCircle />,
//           name: 'Black Forest Series Wood',
//           price: 225,
//           oldPrice: 240,
//         },
//         {
//           image: <Product9Img />,
//           icon: <IoMdAddCircle />,
//           name: 'Papper Cupboard',
//           price: 105,
//           oldPrice: 120,
//         },
       
//       ],
//     },
//   ],
// };

export const testimonial = {
  title: 'What people are saying about us',
  image: <TestimonialImg />,
  persons: [
    {
      avatar: <Avatar1Img />,
      name: 'Josh Smith',
      occupation: 'Manager of The New York Times',
      message:
        '“They are have a perfect touch for make something so professional ,interest and useful for a lot of people .”',
    },
    {
      avatar: <Avatar2Img />,
      name: 'Brandi Johns',
      occupation: 'Manager of The New York Times',
      message:
        '“They are have a perfect touch for make something so professional ,interest and useful for a lot of people .”',
    },
    {
      avatar: <Avatar3Img />,
      name: 'Paula Pfeffer',
      occupation: 'Manager of The New York Times',
      message:
        '“They are have a perfect touch for make something so professional ,interest and useful for a lot of people .”',
    },
  ],
};

export const newsletter = {
  title: 'Get more discount Off your order',
  subtitle: 'Join our mailing list',
  placeholder: 'Your email address',
  buttonText: 'Shop Now',
};

export const footer = {
  social: [
    {
      icon: <IoLogoYoutube />,
      href: '#',
    },
    {
      icon: <IoLogoInstagram />,
      href: '#',
    },
  
    {
      icon: <IoLogoFacebook />,
      href: '#',
    },
  ],
  copyright: 'FurniShop 2022 - All Rights Reserved.',
};
