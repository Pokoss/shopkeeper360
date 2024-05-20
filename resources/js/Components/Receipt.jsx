import { useForm, usePage } from "@inertiajs/react";
import React, { useRef } from "react";
import { forwardRef } from "react";
import DataTable from "react-data-table-component";
// import Table from "./Table"
// import moment from 'moment';


const columns = [
    {
        name: <b>Item</b>,
        selector: row => row.product.name + ' ('+row.product.brand+')',
        wrap: true,
    },
    {
        name: <b>Qty</b>,
        selector: row => row.quantity,
        grow: true,
        width: '60px',
        right: true
    },
    {
        name: <b>Price</b>,
        selector: row => Intl.NumberFormat('en-US').format(row.sale_price),
        grow: true,
        width: '90px',
        right: true
    },
];


const Receipt = forwardRef(( {company, props} ) => {

    console.log(props)
    const form = useForm();
    // const { facility } = usePage().props

    return (
        <div className="text-sm text-uppercase monospace" >
            <div className="w-full items-center justify-center space-x-5">
                <div className="flex items-center justify-center w-full">
                    
                     <img src={'/'+company.company.logo} 
                    alt="facility logo" className="h-20 object-contain rounded-lg mb-2" />
                </div>
                <div className="flex flex-col mb-4 items-center">
                    <div className="text-lg">{company.company.name}</div>
                    {/* <div className="mt-2">Receipt No.  */}
                    {/* {props.receiptData.receipt_no.toString().padStart(3, '0')} */}
                    {/* </div> */}
                    <div className="my-1">
                    No. {props.receipts.sale_id}
                    {/* {props.receiptData.receipt_no.toString().padStart(3, '0')} */}
                    </div>
                    <div>
                        {/* {moment(props.receiptData.date).format('MM/DD/YYYY hh:mm A')} */}
                        {new Date(props.receipts.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                        </div>
                </div>
            </div>

            <DataTable columns={columns}
                data={props.receipts.sales}/>

            {/* <Table dense title='Items' showHeader={false}
                data={props.receiptData.products} columns={product_columns} form={form}>
            </Table> */}

            <table className="w-full mt-2 bg-transparent">
                <tbody>
                    <tr>
                        <td className="font-semibold text-start pl-5 py-2">TOTAL</td>
                        <td className="text-end pr-5">
                            {/* {facility.currency ?? 'UGX'} 
                            {props.receiptData.total.toLocaleString()} */}
                            {"UGX "+Intl.NumberFormat('en-US').format(props.receipts.sale_total)}
                            </td>
                    </tr>
                        {/* <tr>
                            <td className="font-semibold text-start pl-5 py-2">PAID</td>
                            <td className="text-end pr-5"> */}
                                {/* {facility.currency ?? 'UGX'} {props.receiptData.amount_paid.toLocaleString()} */}
                                {/* 10,000
                                </td>
                        </tr> */}
                        {/* <tr>
                            <td className="font-semibold text-start pl-5 py-2">BALANCE</td>
                            <td className="text-end pr-5"> */}
                                {/* {facility.currency ?? 'UGX'} {props.receiptData.balance.toLocaleString()} */}
                                {/* 100000 */}
                                {/* </td>
                        </tr> */}
                    
                </tbody>
            </table>

            {/* {props.receiptData.employee && */}
                <div className="flex justify-between mt-5">
                    <div className="text-start pl-5">Served by</div>
                    <div className="text-end pr-5">{props.receipts.user.name}</div>
                </div>
            {/* } */}

            <div className="flex flex-col mt-5 mb-4 items-center">
                <div>Thank you for supporting us!</div>
                <div>{company.company.contacts}</div>
                <div>{company.company.location}</div>
                {/* <div>Thank you</div> */}
            </div>
        </div>
    );
});

export default Receipt;