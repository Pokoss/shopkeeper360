import{r as a,j as t,y as c}from"./app-C8WKr6KS.js";import{L as oe}from"./Layout-l3DxoYn-.js";import{r as s}from"./index-faAi_gFe.js";import{X as ce}from"./index.es-Co7BxNCE.js";import{Q as de,B as r}from"./react-toastify.esm-Bd0QyV2l.js";/* empty css                      */function ue({company:i,products:d,measurements:u}){const[h,f]=a.useState(""),[m,P]=a.useState(""),[O,M]=a.useState(""),[g,C]=a.useState(""),[R,H]=a.useState(""),[x,w]=a.useState(""),[E,W]=a.useState(""),[v,D]=a.useState(""),[S,F]=a.useState(""),[b,k]=a.useState(""),[_,$]=a.useState(""),[j,B]=a.useState(""),[T,X]=a.useState(""),[y,N]=a.useState(""),[z,q]=a.useState("");function Q(e,n,l,re,ae,ne,ie,le){o("xl"),q(e),D(n),F(l),$(re),k(ae),B(ne),X(le),N(ie)}const[me,I]=a.useState(d.current_page),U=e=>{c.get(`/dashboard/${i.company.slug}/inventory/product`,{page:e,search:E},{preserveState:!0})},V=e=>{I(e),U(e)},Z=e=>{e.preventDefault(),c.post("/delete-product",{productId:z},{onSuccess:()=>{r.success("Product deleted successfully"),o()}})},G=e=>{e.preventDefault(),r.loading();var n=i.company_id;if(v=="")r.dismiss(),r.error("Write product name");else if(S=="")r.dismiss(),r.error("Select the quantity available");else if(b=="")r.dismiss(),r.error("Set the measurement");else if(j=="")r.dismiss();else if(y=="")r.dismiss();else try{c.post("/edit-product",{companyId:n,productId:z,editProduct:v,editAvailable:S,editBarcode:_,editMeasurement:b,editCostPrice:y,editSellingPrice:j,editWholeSaleSellingPrice:T},{onSuccess:()=>{r.success("Product edited successfully"),o()}})}catch(l){r.dismiss(),r.error(l)}},J=e=>{e.preventDefault(),W(e.target.value),I(1);var n=e.target.value;c.get(`/dashboard/${i.company.slug}/inventory/product`,{search:n,page:1},{preserveState:!0,preserveScroll:!0,onSuccess:()=>{}})},K=async e=>{e.preventDefault(),r.loading();var n=i.company_id;if(h=="")r.dismiss(),r.error("Write product name");else if(m=="")r.dismiss(),r.error("Select the measurement");else if(g=="")r.dismiss(),r.error("Set the selling Price");else if(x=="")r.dismiss();else try{c.post("/add-product",{companyId:n,product:h,measurement:m,barcode:O,costPrice:x,sellingPrice:g,wholeSaleSellingPrice:R},{onSuccess:()=>{r.success("Product added successfully"),f(""),P(""),M(""),C(""),H(""),w(""),p()},onError:l=>{r.error(l)}})}catch(l){r.dismiss(),r.error(l)}};console.log(m);const Y={headRow:{style:{border:"none"}},headCells:{style:{color:"#997400",fontSize:"14px"}},rows:{highlightOnHoverStyle:{backgroundColor:"rgb(230, 244, 244)",borderBottomColor:"#FFFFFF",outline:"1px solid #FFFFFF"}},pagination:{style:{border:"none"}}},ee=[{name:"Product",selector:e=>e.name},{name:"Available",selector:e=>`${e.available}`},{name:"Measurement",selector:e=>`${e.measurement.name} (${e.measurement.abbriviation})`},,{name:"Added On",selector:e=>new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric"})},{selector:e=>t.jsx("div",{className:"flex items-center",children:t.jsx("button",{onClick:()=>Q(e.id,e.name,e.available,e.barcode,e.measurement.id,e.retail_price,e.cost_price,e.wholesale_price),className:"bg-green-600 rounded-md p-1",children:t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"white",className:"w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"})})})})}],[A,te]=a.useState(null),p=e=>te(e),[L,se]=a.useState(null),o=e=>se(e);return t.jsxs("div",{children:[t.jsx(a.Fragment,{children:t.jsxs(s.Dialog,{open:A==="xl",size:A,handler:p,children:[t.jsx(s.DialogHeader,{children:t.jsx(s.Typography,{variant:"h5",color:"blue-gray",children:"Add a product"})}),t.jsxs("form",{onSubmit:K,children:[t.jsxs(s.DialogBody,{divider:!0,className:"h-[28rem] overflow-scroll grid place-items-center gap-4",children:[t.jsx(s.Input,{label:"Product",value:h,onChange:e=>f(e.target.value),size:"sm"}),t.jsx(s.Select,{color:"deep-orange",label:"Measurement",value:m,onChange:e=>P(e),children:u&&u.map((e,n)=>t.jsxs(s.Option,{value:e.id,children:[" ",e.name," (",e.abbriviation,")"]}))}),t.jsx(s.Input,{label:"Cost Price",type:"number",value:x,onChange:e=>w(e.target.value),size:"sm"}),t.jsx(s.Input,{label:"Retail Selling Price",value:g,onChange:e=>C(e.target.value),size:"sm"})]}),t.jsxs(s.DialogFooter,{className:"space-x-2",children:[t.jsx(s.Button,{onClick:p,variant:"gradient",color:"blue-gray",children:"Close"}),t.jsx(s.Button,{type:"submit",className:"bg-primary",children:"Add"})]})]})]})}),t.jsx(ce,{title:t.jsxs("div",{className:"flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-5 md:space-y-0 whitespace-nowrap items-start md:items-center justify-between w-full border-b-2 border-primary pb-3 pt-2",children:[t.jsx("span",{children:"Products"}),t.jsxs("div",{className:"flex space-x-3 items-center md:space-x-5 w-full md:w-1/2 md:justify-end print:hidden",children:[t.jsx(s.Input,{type:"text",label:"Search",value:E,onChange:J,className:"md:w-full"}),t.jsx("span",{children:t.jsxs(s.Button,{size:"sm",color:"success",type:"submit",className:"flex h-10 items-center bg-primary",onClick:()=>p("xl"),children:[t.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"mr-2 w-5 h-5",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4.5v15m7.5-7.5h-15"})}),"Add"]})})]})]}),columns:ee,data:d.data,customStyles:Y,pointerOnHover:!0,onRowClicked:(e,n)=>!children&&ExpandableComponent?null:editRow(e,n),highlightOnHover:!0,pagination:!0,paginationServer:!0,paginationTotalRows:d.total,paginationPerPage:d.per_page,onChangePage:V,paginationRowsPerPageOptions:[]}),t.jsx(a.Fragment,{children:t.jsxs(s.Dialog,{open:L==="xl",size:L,handler:o,children:[t.jsx(s.DialogHeader,{children:t.jsx(s.Typography,{variant:"h5",color:"blue-gray",children:"Edit Product"})}),t.jsxs("form",{onSubmit:G,children:[t.jsxs(s.DialogBody,{divider:!0,className:"grid place-items-center gap-4",children:[t.jsx(s.Input,{label:"Product",value:v,onChange:e=>D(e.target.value),size:"sm"}),t.jsx(s.Input,{label:"Available",value:S,onChange:e=>F(e.target.value),size:"sm"}),t.jsx(s.Select,{color:"deep-orange",label:"Measurement",value:b,onChange:e=>k(e),children:u&&u.map((e,n)=>t.jsxs(s.Option,{value:e.id,children:[" ",e.name," (",e.abbriviation,")"]}))}),t.jsx(s.Input,{label:"Cost Price",type:"number",value:y,onChange:e=>N(e.target.value),size:"sm"}),t.jsx(s.Input,{label:"Retail Price",type:"number",value:j,onChange:e=>B(e.target.value),size:"sm"})]}),t.jsx(s.DialogFooter,{children:t.jsxs("div",{className:"flex w-full justify-between",children:[t.jsx(s.Button,{onClick:Z,variant:"gradient",color:"red",children:"Delete"}),t.jsxs("div",{className:"space-x-2",children:[t.jsx(s.Button,{onClick:o,variant:"gradient",color:"blue-gray",children:"Close"}),t.jsx(s.Button,{type:"submit",className:"bg-primary",children:"Edit"})]})]})})]})]})}),t.jsx(de,{})]})}ue.layout=i=>t.jsx(oe,{children:i,props:i.props.company});export{ue as default};
