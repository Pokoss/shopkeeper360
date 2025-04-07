import Layout from '@/Layouts/components/Layout'
import React from 'react'
import { Input, Button } from '@material-tailwind/react';
import { QRCodeSVG } from 'qrcode.react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import * as htmlToImage from 'html-to-image'
import { useRef } from 'react';

function BusinessProfileScreen({ company }) {
  const currentUrl = location.hostname;

  const domEl = useRef(null);
    const downloadImage = async ()=>{
        const dataUrl = await htmlToImage.toPng(domEl.current);

        const link = document.createElement('a');
        link.download = `${company.company.name}.png`; 
        link.href =dataUrl;
        link.click();
    }

  const config = {
    public_key: 'FLWPUBK_TEST-dcc65cf1c7e549240c7a97b4a913307c-X',
    tx_ref: Date.now(),
    amount: 38500,
    currency: 'UGX',
    payment_options: 'card,mobilemoney',
    customer: {
      email: 'pokos333@gmail.com',
      phone_number: '0765974111',
      name: 'john doe',
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
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  };


  return (
    <div className='font-oswald p-5'>
      <p className='w-full font-semibold text-lg'>Business Details</p>
      <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <Input color='deep-orange' size="lg" label="Business Name"
            value={company.company.name}
          />
        </div>
        <div>
          <Input color='deep-orange' size="lg" label="Business Contacts"
            value={company.company.contacts}
          />
        </div>
        <div>
          <Input color='deep-orange' size="lg" label="Business Location"
            value={company.company.location}
          />
        </div>
        <div>
          <Input color='deep-orange' size="lg" label="Business Email"
            value={company.company.email}
          />
        </div>
        <div>
          <Input color='deep-orange' size="lg" label="Subscription Date"
            value={company.company.subscription_date == null ? 'Not yet subscribed' : new Date(company.company.subscription_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', })}
          />
        </div>
        <div>
          <Input color='deep-orange' size="lg" label="Subscription Expiry"
            value={company.company.subscription_expiry == null ? 'Not yet subscribed' : new Date(company.company.subscription_expiry).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', })}
          />
        </div>


        {/* <FlutterWaveButton {...fwConfig} className='rounded-md bg-primary text-white px-5 py-2'/> */}
        {/* <Button type='submit' className='bg-primary'>
          Pay subscription
        </Button> */}
      </div>

      <p className='w-full font-semibold text-lg mt-5'>Business Link Code</p>
      <div className='mt-3 ml-2'>
        <QRCodeSVG ref={domEl} value={'https://'+currentUrl+'/business/'+company.company.slug} />
      </div>
      <Button onClick={downloadImage} type='submit' className='bg-primary mt-4'>
        Download Code
      </Button>
    </div>
  )
}
BusinessProfileScreen.layout = page => <Layout children={page} props={page.props.company} />
export default BusinessProfileScreen