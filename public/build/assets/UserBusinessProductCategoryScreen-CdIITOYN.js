import{r as o,j as e,d as i,y as c}from"./app-B8uZndRD.js";import{F as d}from"./Footer-KvEBd3hq.js";import{N as n}from"./Navbar-CO2aF0em.js";import{Q as m}from"./react-toastify.esm-Dl32Pnh0.js";import"./index-CE3Qag5a.js";function g({products:a}){console.log(a);const[l,r]=o.useState(""),t=s=>{s.preventDefault(),toast.loading(),c.get("/business/",{search:l})};return e.jsxs("div",{className:"font-oswald h-screen w-full scrollbar-thumb-rounded overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200",children:[e.jsx(n,{}),e.jsx("div",{children:e.jsxs("div",{className:"container mx-auto flex flex-wrap  max-w-full",children:[e.jsxs("main",{className:"p-2 w-full md:w-4/5 flex flex-col items-center",children:[e.jsx("form",{onSubmit:t,className:"mt-5",children:e.jsxs("div",{className:"flex rounded-md mx-5",children:[e.jsx("input",{className:"shadow appearance-none border rounded-l-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",id:"articleTitle",type:"text",placeholder:"Search products ",value:l??"",onChange:s=>r(s.target.value)}),e.jsx("button",{type:"submit",className:"bg-primary px-4 rounded-r-md shadow text-white",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"})})})]})}),e.jsx("div",{className:"w-full mt-3 grid grid-cols-2 gap-y-3 gap-x-2 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-3"}),e.jsx("div",{className:"font-oswald w-full mt-3 grid grid-cols-2 gap-y-3 gap-x-2 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-3",children:a.data&&a.data.map(s=>e.jsx(i,{className:"shadow-sm shadow-gray-400 hover:shadow-primary hover:shadow-lg text-gray-800 hover:text-primary",href:`/product/${s.slug}`,children:e.jsxs("div",{className:"cursor-pointer w-full",children:[e.jsx("img",{src:`/${s.image}`,className:"object-cover w-full h-64 sm:h-90",alt:""}),e.jsxs("div",{className:"p-4",children:[e.jsx("div",{className:"justify-between",children:e.jsx("p",{className:"inline-block line-clamp-2 mb-2 text-lg font-medium leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700",children:s.product.name})}),e.jsx("div",{className:"flex justify-start align-middle",children:e.jsx("p",{className:"font-oswald text-red-700 texts mb-1 font-semibold line-clamp-1",children:`UGX ${Intl.NumberFormat("en-US").format(s.product.retail_price)}`})})]})]})}))})]}),e.jsx("aside",{className:"p-2 w-full md:w-1/5 flex flex-col items-center",children:e.jsx("a",{className:"uppercase mt-5",href:"",children:"Promoted"})})]})}),e.jsx(m,{}),e.jsx(d,{})]})}export{g as default};
