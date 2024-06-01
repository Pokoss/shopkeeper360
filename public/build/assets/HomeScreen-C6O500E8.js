import{r as l,j as e,d as a}from"./app-Co8BOSdG.js";import{F as m}from"./Footer-B3g6D92e.js";import{N as h}from"./Navbar-BhZb6kJb.js";import{r as i}from"./index-C23UCwZM.js";function f(){const[r,n]=l.useState({latitude:null,longtitude:null}),[o,t]=l.useState("");l.useEffect(()=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(s=>{const{latitude:c,longitude:x}=s.coords;n({latitude:c,longitude:x})},d):t("Geolocation is not supported by this browser.")},[]);const d=s=>{switch(s.code){case s.PERMISSION_DENIED:t("User denied the request for Geolocation.");break;case s.POSITION_UNAVAILABLE:t("Location information is unavailable.");break;case s.TIMEOUT:t("The request to get user location timed out.");break;case s.UNKNOWN_ERROR:t("An unknown error occurred.");break;default:t("An error occurred.")}};return e.jsxs("div",{className:"space-y-12 dark:bg-gray-800 dark:text-gray-100",children:[e.jsx(h,{}),e.jsx("section",{children:e.jsxs("div",{className:"container flex flex-col items-center px-4 py-8 mx-auto text-center md:px-10 lg:px-32 xl:max-w-3xl",children:[e.jsx("h1",{className:"text-4xl font-bold leadi sm:text-5xl",children:"Shopkeeper 360"}),e.jsx("p",{className:"px-8 mt-8 mb-12 text-lg",children:"A system designed to help your retail store keep track of all activities income and expenses"}),e.jsxs("div",{className:"flex flex-wrap justify-center",children:[e.jsx(a,{href:"/company",className:"px-8 py-3 m-2 text-lg font-semibold rounded bg-white shadow-sm shadow-primary  text-gray-900",children:"Get started"}),e.jsx(a,{href:"/home",className:"px-8 py-3 m-2 text-lg border bg-primary text-white rounded ",children:"Shop Online"})]})]})}),e.jsx("section",{className:"p-6 dark:bg-gray-800 dark:text-gray-100",children:e.jsxs("div",{className:"container grid justify-center grid-cols-2 mx-auto text-center lg:grid-cols-3",children:[e.jsxs("div",{className:"flex flex-col justify-start m-2 lg:m-6",children:[e.jsx("p",{className:"text-4xl font-bold leadi lg:text-6xl",children:"30+"}),e.jsx("p",{className:"text-sm sm:text-base",children:"Clients"})]}),e.jsxs("div",{className:"flex flex-col justify-start m-2 lg:m-6",children:[e.jsx("p",{className:"text-4xl font-bold leadi lg:text-6xl",children:"2.4K"}),e.jsx("p",{className:"text-sm sm:text-base",children:"Daily transations"})]}),e.jsxs("div",{className:"flex flex-col justify-start m-2 lg:m-6",children:[e.jsx("p",{className:"text-4xl font-bold leadi lg:text-6xl",children:"100+"}),e.jsx("p",{className:"text-sm sm:text-base",children:"Users"})]}),e.jsxs("div",{className:"flex flex-col justify-start m-2 lg:m-6",children:[e.jsx("p",{className:"text-4xl font-bold leadi lg:text-6xl",children:"13"}),e.jsx("p",{className:"text-sm sm:text-base",children:"Employees"})]}),e.jsxs("div",{className:"flex flex-col justify-start m-2 lg:m-6",children:[e.jsx("p",{className:"text-4xl font-bold leadi lg:text-6xl",children:"4"}),e.jsx("p",{className:"text-sm sm:text-base",children:"Years of experience"})]}),e.jsxs("div",{className:"flex flex-col justify-start m-2 lg:m-6",children:[e.jsx("p",{className:"text-4xl font-bold leadi lg:text-6xl",children:"5"}),e.jsx("p",{className:"text-sm sm:text-base",children:"Workshops"})]}),e.jsxs("p",{className:"text-black font-bold text-lg",children:["latitude: ",r.latitude]}),e.jsx("br",{}),e.jsx("br",{}),e.jsxs("p",{className:"text-black font-bold text-lg",children:["longtitude: ",r.longitude]}),e.jsxs("p",{className:"text-black font-bold text-lg",children:["longtitude: ",r.longitude]}),e.jsxs("p",{className:"text-black font-bold text-lg",children:["error: ",o]})]})}),e.jsx("section",{className:"py-8",children:e.jsx("div",{className:"container mx-auto",children:e.jsxs("div",{className:"p-4 mx-auto text-center md:px-10 lg:px-32 xl:max-w-3xl",children:[e.jsx("h2",{className:"text-2xl font-bold leadi sm:text-4xl",children:"What can we offer to you?"}),e.jsx("p",{className:"px-8 my-4",children:"We offer a high end affordable system that will help manage you business by helping you manage finances and keeping you upto date with business transations and reports like daily sales, weekly sales or sales for a specific peroid of time, your profits and losses. The system also tracks your inventory has a sale point for sellinging products and many more features. So basically youll be missing out if you dont join us so please scale your business by joing us today and watch your business start growing massively"})]})})}),e.jsxs("section",{className:"py-6 dark:bg-gray-800 dark:text-gray-50",children:[e.jsx("div",{children:e.jsxs("h3",{className:"my-6 w-full text-center text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900",children:["Our",e.jsx("span",{className:"text-primary",children:" Services"})]})}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2",children:[e.jsx("div",{className:"bg-white p-12 md:p-24 flex justify-end items-center",children:e.jsx("a",{href:"","data-aos":"fade-right",children:e.jsx("img",{src:"/images/user/dashboard.JPG",className:"w-full max-w-md"})})}),e.jsx("div",{className:"bg-gray-100 p-12 md:p-24 flex justify-start items-center",children:e.jsxs("div",{className:"max-w-md","data-aos":"fade-left",children:[e.jsx("div",{className:"w-24 h-2 bg-secondary mb-4"}),e.jsx("h2",{className:"font-display font-bold text-2xl md:text-3xl lg:text-4xl mb-6",children:"Retail Business System"}),e.jsx(i.Typography,{children:"We offer businesses a system to manage their daily business activities and also an online platform like a website for business to show products people"}),e.jsx(i.Typography,{children:e.jsx(a,{href:"/company/register",className:"mt-5 inline-block border-2 border-primary font-light text-primary text-sm uppercase tracking-widest item-left py-3 px-8 hover:bg-primary hover:text-white",children:"Register"})})]})})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2",children:[e.jsx("div",{className:"bg-white p-12 md:p-24 flex justify-start items-center",children:e.jsx("a",{href:"","data-aos":"fade-left",children:e.jsx("img",{src:"/images/user/user-screen.JPG",className:"w-full max-w-md"})})}),e.jsx("div",{className:"md:order-first bg-gray-100 p-12 md:p-24 flex justify-end items-center",children:e.jsxs("div",{className:"max-w-md","data-aos":"fade-right",children:[e.jsx("div",{className:"w-24 h-2 bg-secondary mb-4"}),e.jsx("h2",{className:"font-display font-bold text-2xl md:text-3xl lg:text-4xl mb-6",children:"Online Shopping Center"}),e.jsx(i.Typography,{children:"We offer users a place to find various businesses, make bookings from that business order different products from the business. Its a place where you find different type of retail stores view their products and order from them or visit them for what you want"}),e.jsx(a,{href:"/home",className:"mt-5 inline-block border-2 border-primary font-light text-primary text-sm uppercase tracking-widest py-3 px-8 hover:bg-primary hover:text-white",children:"View Businesses"})]})})]})]}),e.jsx("section",{class:"bg-white ",children:e.jsxs("div",{class:"container px-6 py-8 mx-auto",children:[e.jsxs("h2",{class:"text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl ",children:["Our ",e.jsx("span",{className:"text-primary",children:"Team"})]}),e.jsxs("div",{class:"grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center w-full",children:[e.jsxs("div",{class:"w-full max-w-xs text-center",children:[e.jsx("img",{class:"object-cover object-top w-full h-48 mx-auto rounded-lg",src:"/images/team/opoka-daniel.jpeg",alt:"opoka"}),e.jsxs("div",{class:"mt-2",children:[e.jsx("h3",{class:"text-lg font-medium text-gray-700 ",children:"Opoka Daniel"}),e.jsx("span",{class:"mt-1 font-medium text-gray-600 ",children:"C.E.O / Sotware Developer"})]})]}),e.jsxs("div",{class:"w-full max-w-xs text-center",children:[e.jsx("img",{class:"object-cover object-top w-full h-48 mx-auto rounded-lg",src:"/images/team/hannah-mercy.jpg",alt:"hannah"}),e.jsxs("div",{class:"mt-2",children:[e.jsx("h3",{class:"text-lg font-medium text-gray-700 ",children:"Biyinzika Hannah"}),e.jsx("span",{class:"mt-1 font-medium text-gray-600 ",children:"Database Administrator / I.S.O"})]})]}),e.jsxs("div",{class:"w-full max-w-xs text-center",children:[e.jsx("img",{class:"object-cover object-top w-full h-48 mx-auto rounded-lg",src:"/images/team/olet.jpg",alt:"Olet Robert"}),e.jsxs("div",{class:"mt-2",children:[e.jsx("h3",{class:"text-lg font-medium text-gray-700 ",children:"Olet Robert"}),e.jsx("span",{class:"mt-1 font-medium text-gray-600 ",children:"Creative Director"})]})]})]})]})}),e.jsxs("h3",{className:"w-full text-center text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900",children:["Frequent",e.jsx("span",{className:"text-primary",children:" Questions"})]}),e.jsx("section",{className:"bg-white",children:e.jsx("div",{className:"container px-6 py-12 mx-auto",children:e.jsxs("div",{className:"grid grid-cols-1 gap-8 mt-8 lg:mt-8 md:grid-cols-2 xl:grid-cols-3",children:[e.jsxs("div",{children:[e.jsx("div",{className:"inline-block p-3 text-white bg-primary rounded-lg",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-semibold text-gray-700",children:"What type of businesses can use the shopkeeper360 system"}),e.jsx("p",{className:"mt-2 text-sm text-gray-500",children:"The shopkeeper360 system is designed for all retail type of businesses like shops, supermarkets hardware stores, electronic stores, pharmacies, restaurants and cosmetic stores and so many more. Has long has there is a product that can be sold to customers we are here to help you thrive and get reach more customers"})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"inline-block p-3 text-white bg-primary rounded-lg",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-semibold text-gray-700",children:"What happens if i fail to renew my subscription"}),e.jsx("p",{className:"mt-2 text-sm text-gray-500",children:"Pretty much nothing big, we disable the important features from working but your data still remains safe until you renew the subscription. We also give reminders and a 4 day grace period to enable you proceed, our aim is to make sure your business succeeds and if it does ours does too."})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"inline-block p-3 text-white bg-primary rounded-lg",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-semibold text-gray-700",children:"Does your system work offline"}),e.jsx("p",{className:"mt-2 text-sm text-gray-500",children:"Currently the system is fully online but we are soon releasing an offline sale point where by you can sell and make transactions without interent then later on you when you get internet connect it the data of your transactions will be automatically uploaded."})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"inline-block p-3 text-white bg-primary rounded-lg",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-semibold text-gray-700",children:"What is your cancellation policy?"}),e.jsx("p",{className:"mt-2 text-sm text-gray-500",children:"Our cancellation policy may vary depending on the specific reason of the package. If you feel you wish to discontinue the use of the system. No pentalty will be given, just simply stop the use of the system. Or let the subcription expire. You thoroughly revise through our terms and contions and privacy policy, or you could contact our team on any of the provided platforms."})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"inline-block p-3 text-white bg-primary rounded-lg",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-semibold text-gray-700",children:"If my retail store has very many products, do you do data entry for us?"}),e.jsx("p",{className:"mt-2 text-sm text-gray-500",children:"If you feel it will be difficult to enter the data first time, we can offer to get for you data entrants who you will compensate with shs.50 per product entered and stocked on the system. These are proffessionals and will ensure the data is entered  correctly."})]})]}),e.jsxs("div",{children:[e.jsx("div",{className:"inline-block p-3 text-white bg-primary rounded-lg",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"w-6 h-6",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-semibold text-gray-700",children:"How can I contact Shopkeeper360 for further assistance or inquiries?"}),e.jsx("p",{className:"mt-2 text-sm text-gray-500",children:"For further assistance or inquiries, you can reach our friendly team through various channels. You can fill out the contact form on our website, email us at info@lehub.dev, or call us at +256-765-974-111. We'll be more than happy to assist you and provide any additional information you may need."})]})]})]})})}),e.jsx("div",{className:"bg-gray-100 py-12",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[e.jsxs("div",{className:"lg:text-center",children:[e.jsx("h2",{className:"text-base text-primary font-semibold tracking-wide uppercase",children:"Location"}),e.jsx("p",{className:"mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl",children:"Our Offices"})]}),e.jsx("div",{className:"mt-10",children:e.jsxs("dl",{className:"space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10",children:[e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("div",{className:"flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"})})})}),e.jsxs("div",{className:"ml-4",children:[e.jsx("dt",{className:"text-lg leading-6 font-medium text-gray-900",children:"Addresses"}),e.jsxs("dd",{className:"mt-2 text-base text-gray-500",children:["1. Wandegeya Kampala",e.jsx("br",{}),"2. Munyonyo",e.jsx("br",{}),"3. Namanve Exibition and Business Center (opening soon)"]})]})]}),e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("div",{className:"flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"})})})}),e.jsxs("div",{className:"ml-4",children:[e.jsx("dt",{className:"text-lg leading-6 font-medium text-gray-900",children:"Phone number"}),e.jsx("dd",{className:"mt-2 text-base text-gray-500",children:"+256 765 974 111"})]})]}),e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("div",{className:"flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"})})})}),e.jsxs("div",{className:"ml-4",children:[e.jsx("dt",{className:"text-lg leading-6 font-medium text-gray-900",children:"Email"}),e.jsx("dd",{className:"mt-2 text-base text-gray-500",children:"info@lehub.dev"})]})]}),e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"flex-shrink-0",children:e.jsx("div",{className:"flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"})})})}),e.jsxs("div",{className:"ml-4",children:[e.jsx("dt",{className:"text-lg leading-6 font-medium text-gray-900",children:"Working Hours"}),e.jsxs("dd",{className:"mt-2 text-base text-gray-500",children:["Monday -  Friday: 9am to 6pm",e.jsx("br",{}),"Saturday - 10am to 2pm",e.jsx("br",{}),"Sunday -  Contact if its a serious emergency"]})]})]})]})})]})}),e.jsx(m,{})]})}export{f as default};