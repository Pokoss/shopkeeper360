import{r as n,j as e,y as b}from"./app-BBasbjv1.js";import{L as V}from"./Layout-B0ltOled.js";import{S as Y}from"./react-select.esm-2ZVMhDiI.js";import{B as c,Q as J}from"./react-toastify.esm-dZoPzqJH.js";/* empty css                      */import{R as K}from"./Receipt-BlafMeq1.js";import{l as Z}from"./index-DuxTzWdq.js";import{r as u}from"./index-Ve6Pk4NC.js";import"./index.es-BnKg5YEA.js";function ee({company:d,products:v,cart_items:o}){console.log(o);const S=n.useRef(),L=Z.useReactToPrint({content:()=>S.current});n.useEffect(()=>{var t=v.data.map(r=>({value:r.id,label:String(r.name),price:"UGX "+Intl.NumberFormat("en-US").format(r.retail_price),available:r.available}));p(t)},[v]);const[U,p]=n.useState([]),[P,j]=n.useState(null),[m,k]=n.useState(null),[x,y]=n.useState(0),[te,_]=n.useState(0),[R,w]=n.useState(0),[C,D]=n.useState(0),[h,B]=n.useState(),E=t=>{t.preventDefault(),B(t.target.value);var r=t.target.value-x;w(r)},O=t=>{t.preventDefault(),D(t.target.value);var r=parseFloat(t.target.value)+(parseFloat(h)-parseFloat(x));w(r)};n.useEffect(()=>{h==""&&w(0),o.length==0&&y(0);var t=0,r=0;o&&o.map(s=>{var a=s.quantity*parseFloat(s.product.retail_price);t=t+a,y(t);var l=s.quantity*(parseFloat(s.product.retail_price)-parseFloat(s.product.cost_price));r=r+l,_(r)})},[o,h]);const A=t=>{k(t),console.log(t.value)},[q,F]=n.useState(""),G=({value:t,label:r,available:s,price:a})=>e.jsxs("div",{style:{display:""},children:[e.jsx("div",{className:"text-normal font-semibold",children:r}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{className:"text-red-700 text-xs font-semibold",children:a}),e.jsx("div",{className:"text-gray-400 text-xs font-semibold",children:"Expiry: Not specified"}),e.jsx("div",{className:"text-green-700 text-xs",children:s+" remaining"})]})]}),X=async t=>{var r=d.company_id;if(F(t),!t){var s=v.data.map(l=>({value:l.id,label:String(l.name),price:"UGX "+Intl.NumberFormat("en-US").format(l.retail_price),available:l.available}));p(s);return}try{const l=await axios.get(`/search_stock?q=${t}&company_id=${r}`);if(l.data.product.data&&l.data.product.data){console.log("pro data:",l.data.product.data);var a=l.data.product.data.map(f=>({value:f.id,label:String(f.name),price:"UGX "+Intl.NumberFormat("en-US").format(f.retail_price),available:f.available}));p(a)}else console.error("unexpected"),p([])}catch(l){console.error("Error fetching products:",l),p([])}};let[i,g]=n.useState(0);function M(){i==1e3?c.error("1000 is the max number"):(i=i+1,g(parseInt(i)))}function T(){i==0?c.error("Quantity below 0 is forbidden"):(i=i-1,g(parseInt(i)))}function Q(t,r){var s=d.company.id;b.post("/delete_cart_item",{itemId:t,company_id:s},{preserveScroll:!0,onSuccess:()=>{c.success(r+" removed")}})}function W(){var t=d.company.id;b.post("/empty_cart_item",{company_id:t},{preserveScroll:!0,onSuccess:()=>{y(0),c.success("Cart Cleared")}})}function $(){var t=d.company.id;if(o.length==0)c.error("You cant sale nothing");else{var r=x,s=C;b.post("/register_pay",{company_id:t,sale_total:r,discount:s},{preserveScroll:!0,onSuccess:async()=>{c.success("Success");try{const a=await axios.get(`/getlastsale?company_id=${t}`);console.log(a),a.data&&a.data?(console.log("pro data:",a.data),j(a.data),N("xl")):(console.error("unexpected"),j(null))}catch(a){console.error("Error fetching products:",a),j(null)}}})}}function z(){if(i<1)c.error("Quantity must be 1 or higher");else if(i=="")c.error("Input the quantity");else if(m==null)c.error("Select the item");else{var t=d.company.id,r=d.user.id,s=m.value,a=i;b.post("/addtocart",{quantity:a,product_id:s,company_id:t,user_id:r},{preserveScroll:!0,onSuccess:()=>{c.success(m.label+" added to cart"),k(null),g(0),F("")}})}}const[I,H]=n.useState(null),N=t=>H(t);return e.jsxs("div",{children:[e.jsxs("div",{className:"px-5 pt-1",children:[e.jsxs("div",{className:"w-full grid grid-cols-1 gap-3 sm:grid-cols-3 place-items-center class justify-center",children:[e.jsxs("div",{className:"w-full space-y-2 mt-2",children:[e.jsx(u.Input,{type:"number",label:"Amount received",value:h,onChange:E}),o&&o.length==0?e.jsx(e.Fragment,{}):e.jsx(u.Input,{type:"number",label:"Discount Amount",value:C,onChange:O})]}),e.jsx("div",{className:"font-bold text-xl",children:o&&o.length==0?e.jsx(e.Fragment,{}):e.jsxs("span",{className:"text-base font-semibold",children:["Change: UGX ",Intl.NumberFormat("en-US").format(R)]})}),e.jsxs("div",{children:[e.jsxs("div",{className:"font-bold text-xl mb-1",children:["UGX ",Intl.NumberFormat("en-US").format(x),e.jsx("br",{})]}),e.jsx("button",{onClick:()=>$(),className:"py-2 px-10 rounded-md font-semibold text-base text-gray-100 bg-primary hover:bg-red-700",children:"Record Sale"})]})]}),e.jsxs("div",{className:"bg-gray-400 p-2 mt-7 w-full grid grid-cols-1 gap-3 sm:grid-cols-3 place-items-center class justify-center",children:[e.jsx(Y,{value:m,onChange:A,formatOptionLabel:G,options:U,isClearable:!0,placeholder:"Search for a product...",onInputChange:X,noOptionsMessage:()=>"No product found",inputValue:q,className:"w-full",styles:{control:(t,r)=>({...t,borderColor:(r.isFocused,"brown")})}}),e.jsxs("div",{className:"flex gap-1",children:[e.jsx("button",{onClick:T,className:"bg-primary h-10 w-10 rounded-full flex justify-center items-center",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"white",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M5 12h14"})})}),e.jsx("input",{type:"number",required:!0,placeholder:"",form:"stock_item_form",className:"rounded-md w-16 flex [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",value:i,onChange:t=>g(t.target.value)}),e.jsx("button",{onClick:M,className:"bg-primary h-10 w-10 rounded-full flex justify-center items-center",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"1.5",stroke:"white",className:"w-6 h-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})})})]}),e.jsxs("button",{onClick:z,className:"rounded-md flex justify-center items bg-primary p-2 w-full sm:w-32",children:[" ",e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"white",className:"w-6 h-6 mr-1",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"})})," Add"]})]}),o&&o.length==0?e.jsx(e.Fragment,{}):e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-between items-center bg-tertiary px-5 py-2 mt-5",children:[e.jsx("span",{className:"font-semibold text-base",children:"Cart"}),e.jsx("button",{onClick:()=>W(),className:"bg-red-400 py-1 px-5 rounded-md text-white hover:bg-primary md:mr-28",children:"Clear all"})]}),e.jsxs("table",{className:"w-full text-left",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"w-2/6",children:"Product"}),e.jsx("th",{className:"w-1/6",children:"Price (UGX)"}),e.jsx("th",{className:"w-1/6",children:"Qty"}),e.jsx("th",{className:"w-1/6 print:hidden",children:"Action"})]})}),e.jsx("tbody",{className:"text-gray-600 dark:text-gray-100 ",children:o&&o.map(t=>e.jsxs("tr",{className:"w-full justify-end",children:[e.jsx("td",{onClick:()=>c.success(t.product.name),className:"cursor-pointer sm:px-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 w-1/3",children:t.product.name}),e.jsx("td",{className:"sm:px-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 ",children:Intl.NumberFormat("en-US").format(t.product.retail_price)}),e.jsx("td",{className:"sm:px-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800",children:t.quantity}),e.jsx("td",{className:"sm:px-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800",children:e.jsx("button",{onClick:()=>Q(t.id,t.product.name),className:"bg-red-400 rounded-md p-2",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"white",className:"w-5 h-5",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"})})})})]},t.id))})]})]})]}),e.jsx(n.Fragment,{children:e.jsxs(u.Dialog,{open:I==="xl",size:I,handler:N,children:[e.jsx(u.DialogHeader,{children:e.jsx(u.Typography,{variant:"h5",color:"blue-gray",children:"Print Receipt"})}),e.jsx("form",{children:e.jsx(u.DialogBody,{divider:!0,className:"h-[29rem] overflow-scroll",children:e.jsx("div",{ref:S,children:e.jsx(K,{company:d,props:P})})})}),e.jsx(u.DialogFooter,{children:e.jsxs("div",{className:"flex w-full justify-between",children:[e.jsx(u.Button,{onClick:N,variant:"gradient",color:"red",children:"Ignore"}),e.jsx("div",{className:"space-x-2",children:e.jsx(u.Button,{onClick:L,type:"submit",className:"bg-green-500",children:"Print"})})]})})]})}),e.jsx(J,{})]})}ee.layout=d=>e.jsx(V,{children:d,props:d.props.company});export{ee as default};