import { Link, router } from '@inertiajs/react';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

function SubscriptionExpiredScreen({ company }) {
    const renewSubscription = async (event) => {
        var company_id = company.company.id

        router.post('/renew-subscription', { company_id }, {
            preserveScroll: true,
            onSuccess: () => {

                closePaymentModal() // this will close the modal programmatically
                toast.dismiss();

            }
        })
    }

    // public_key: 'FLWPUBK_TEST-dcc65cf1c7e549240c7a97b4a913307c-X',
const config = {
    public_key: 'FLWPUBK-505ff9ef3205cff84de16c7170ee6d88-X',
    tx_ref: Date.now(),
    amount: 38500,
    currency: 'UGX',
    payment_options: 'card,mobilemoney',
    customer: {
        email: company.user.email,
        name: company.user.name,
    },
    customizations: {
        title: 'Biashari',
        description: 'Subscription',
        logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
};

const fwConfig = {
    ...config,
    text: 'Pay subscription',
    callback: (response) => {
        console.log(response);
        var company_id = company.company.id

        router.post('/renew-subscription', { company_id }, {
            preserveScroll: true,
            onSuccess: () => {

                closePaymentModal() // this will close the modal programmatically
                toast.dismiss();

            }
        })

    },
    onClose: () => { },
};

return (
    <div>
        <section>
            <div className="container flex flex-col items-center px-4 py-8 mx-auto text-center md:px-10 lg:px-32 xl:max-w-3xl">
                <img className='w-28 h-28' src='/images/user/shopkeeper360.png' />
                <h1 className="text-4xl text-primary font-bold leading sm:text-4xl">Biashari

                </h1>
                <p className="px-8 mt-8 mb-5 text-lg">Hey, {company.company.name}, it seems your subscription as expired, please click renew below to renew your subscription</p>
                <div className="flex flex-wrap justify-center">
                    <Link href='/company' className="px-8 py-3 m-2 text-lg font-semibold rounded bg-white shadow-sm shadow-primary  text-gray-900">Go Home</Link>
                    {/* <button onClick={renewSubscription} className="px-8 py-3 m-2 text-lg border bg-primary text-white rounded ">Renew Subscription</button> */}
                    <FlutterWaveButton {...fwConfig} className='px-8 py-3 m-2 text-lg border bg-primary text-white rounded ' />
                    {/* <Link href='/register' className="px-8 py-3 m-2 text-lg border bg-primary text-white rounded ">Be a marketeer</Link> */}
                </div>
            </div>
        </section>
        <ToastContainer />
    </div>
)
}

export default SubscriptionExpiredScreen