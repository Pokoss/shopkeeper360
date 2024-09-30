import{r,j as t,b as se,y as p}from"./app-BBasbjv1.js";import{L as re}from"./Layout-B0ltOled.js";import{r as a}from"./index-Ve6Pk4NC.js";import{X as ne}from"./index.es-BnKg5YEA.js";import{S as oe}from"./react-select.esm-2ZVMhDiI.js";import{Q as le,B as s}from"./react-toastify.esm-dZoPzqJH.js";/* empty css                      */function ie({company:i,stock_item:h,product:x}){console.log(i);const[v,_]=r.useState(""),[m,b]=r.useState(""),[S,j]=r.useState(""),[f,w]=r.useState(""),[A,C]=r.useState(""),[y,H]=r.useState(null),R=e=>{H(e),console.log(e)};r.useState([]);const[$,d]=r.useState([]),[k,M]=r.useState(""),[W,E]=r.useState(""),[D,N]=r.useState(""),[B,F]=r.useState(""),[I,z]=r.useState("");function T(e,n,l,c,o){u("xl"),M(e),E(n),z(l),N(c),F(o)}r.useEffect(()=>{var e=x.data.map(n=>({value:n.id,label:String(n.name)}));d(e)},[x]);const U=async e=>{if(C(e),!e){var n=x.data.map(o=>({value:o.id,label:String(o.name)}));d(n);return}try{var l=i.company_id;const o=await se.get(`/search_stock?q=${e}&company_id=${l}`);if(console.log("full response",o.data),o.data.product.data&&o.data.product.data){console.log("pro data:",o.data.product.data);var c=o.data.product.data.map(Q=>({value:Q.id,label:String(Q.name)}));d(c)}else console.error("unexpected"),d([])}catch(o){console.error("Error fetching products:",o),d([])}},V={headRow:{style:{border:"none"}},headCells:{style:{color:"#997400",fontSize:"14px"}},rows:{highlightOnHoverStyle:{backgroundColor:"rgb(230, 244, 244)",borderBottomColor:"#FFFFFF",outline:"1px solid #FFFFFF"}},pagination:{style:{border:"none"}}},X=[{name:"Product",selector:e=>e.product.name},{name:"Quantity",selector:e=>e.quantity},{name:"Batch",selector:e=>e.batch==null?"No batch":e.batch},{name:"Expiry Date",selector:e=>e.expiry_date==null?"No date":new Date(e.expiry_date).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})},,{name:"Added On",selector:e=>new Date(e.created_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"})},{selector:e=>t.jsx("button",{onClick:()=>T(e.id,e.product.name,e.quantity,e.batch,e.expiry_date),className:"bg-green-600 rounded-md p-1",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"white",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"})})})}],[ce,L]=r.useState(h.current_page),Z=e=>{p.get(`/dashboard/${i.company.slug}/inventory/stock`,{page:e,search:v},{preserveState:!0})},G=e=>{L(e),Z(e)},J=e=>{e.preventDefault(),_(e.target.value),L(1);var n=e.target.value;p.get(`/dashboard/${i.company.slug}/inventory/stock`,{search:n,page:1},{preserveState:!0,preserveScroll:!0,onSuccess:()=>{}})},K=e=>{e.preventDefault();var n=k;try{p.post("/delete-stock",{stockId:n},{onSuccess:()=>{s.success("Product deleted"),u()}})}catch(l){s.dismiss(),s.error(l)}},Y=e=>{e.preventDefault();var n=k,l=I,c=D,o=B;if(l=="")s.dismiss(),s.error("Write the quantity");else if(l<=0)s.dismiss(),s.error("Quantity cannot be 0 or less");else try{p.post("/edit-stock",{stockId:n,quantity:l,batch:c,expiry_date:o},{onSuccess:()=>{s.success("Product edited successfully"),u()}})}catch(q){s.dismiss(),s.error(q)}},ee=async e=>{e.preventDefault(),s.loading();var n=i.company_id,l=y.value;if(y==null)s.dismiss(),s.error("Item is required");else if(m=="")s.dismiss(),s.error("Write the quantity");else if(m<=0)s.dismiss(),s.error("Quantity cannot be 0 pr less");else try{p.post("/add-stock",{product_id:l,companyId:n,quantity:m,batch:S,expiry:f},{onSuccess:()=>{s.success("Product added successfully"),g(),j(""),b(""),w(""),C("")}})}catch(c){s.dismiss(),s.error(c)}},[O,te]=r.useState(null),[P,ae]=r.useState(null),g=e=>te(e),u=e=>ae(e);return t.jsxs("div",{children:[t.jsx(r.Fragment,{children:t.jsxs(a.Dialog,{open:O==="xl",size:O,handler:g,children:[t.jsx(a.DialogHeader,{children:t.jsx(a.Typography,{variant:"h5",color:"blue-gray",children:"Add a stock"})}),t.jsxs("form",{onSubmit:ee,children:[t.jsxs(a.DialogBody,{divider:!0,className:"grid place-items-center gap-4",children:[t.jsx(oe,{className:"w-full",value:y,onChange:R,options:$,isClearable:!0,placeholder:"Search for a product...",onInputChange:U,inputValue:A,loadingMessage:"searching..",styles:{control:(e,n)=>({...e,borderColor:(n.isFocused,"brown")})}}),t.jsx(a.Input,{label:"Quantity",type:"number",value:m,onChange:e=>b(e.target.value)}),t.jsx(a.Input,{label:"Batch",value:S,onChange:e=>j(e.target.value)}),t.jsx(a.Input,{label:"Expiry",type:"date",value:f,onChange:e=>w(e.target.value)})]}),t.jsxs(a.DialogFooter,{className:"space-x-2",children:[t.jsx(a.Button,{onClick:g,variant:"gradient",color:"blue-gray",children:"Close"}),t.jsx(a.Button,{type:"submit",className:"bg-primary",children:"Add"})]})]})]})}),t.jsx(ne,{title:t.jsxs("div",{className:"flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2",children:[t.jsx("span",{children:"Stock"}),t.jsxs("div",{className:"flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden",children:[t.jsx(a.Input,{type:"text",label:"Search",value:v,onChange:J,className:"md:w-full"}),t.jsx("span",{children:t.jsxs(a.Button,{size:"sm",color:"green",type:"submit",className:"flex h-10 items-center bg-primary",onClick:()=>g("xl"),children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"mr-2 w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})}),"Add"]})})]})]}),columns:X,data:h.data,customStyles:V,pointerOnHover:!0,onRowClicked:(e,n)=>!children&&ExpandableComponent?null:editRow(e,n),highlightOnHover:!0,pagination:!0,paginationServer:!0,paginationTotalRows:h.total,paginationPerPage:h.per_page,onChangePage:G,paginationRowsPerPageOptions:[]}),t.jsx(r.Fragment,{children:t.jsxs(a.Dialog,{open:P==="xl",size:P,handler:u,children:[t.jsx(a.DialogHeader,{children:t.jsx(a.Typography,{variant:"h5",color:"blue-gray",children:"Edit a Stock"})}),t.jsxs("form",{onSubmit:Y,children:[t.jsxs(a.DialogBody,{divider:!0,className:"grid place-items-center gap-4",children:[t.jsx(a.Input,{label:"Name",disabled:!0,value:W,onChange:e=>E(e.target.value),size:"sm"}),t.jsx(a.Input,{label:"Quantity",type:"number",value:I,onChange:e=>z(e.target.value),size:"sm"}),t.jsx(a.Input,{label:"Batch",value:D,onChange:e=>N(e.target.value),size:"sm"}),t.jsx(a.Input,{label:"Expiry",type:"date",value:B,onChange:e=>F(e.target.value),size:"sm"})]}),t.jsx(a.DialogFooter,{children:t.jsxs("div",{className:"flex w-full justify-between",children:[t.jsx(a.Button,{onClick:K,variant:"gradient",color:"red",children:"Delete"}),t.jsxs("div",{className:"space-x-2",children:[t.jsx(a.Button,{onClick:u,variant:"gradient",color:"blue-gray",children:"Close"}),t.jsx(a.Button,{type:"submit",className:"bg-primary",children:"Edit"})]})]})})]})]})}),t.jsx(le,{})]})}ie.layout=i=>t.jsx(re,{children:i,props:i.props.company});export{ie as default};