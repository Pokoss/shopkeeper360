import Layout from '@/Layouts/components/Layout'
import React from 'react'
import { Input, Button } from '@material-tailwind/react';
import QRCode, { QRCodeSVG } from 'qrcode.react';

function BusinessProfileScreen({ company }) {
  const currentUrl = location.hostname;
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

        <Button type='submit' className='bg-primary'>
          Pay subscription
        </Button>
      </div>

      <p className='w-full font-semibold text-lg mt-5'>Business Link Code</p>
      <div className='mt-3 ml-2'>
        <QRCodeSVG value={'https://'+currentUrl+'/business/'+company.company.slug} />
      </div>
      <Button type='submit' className='bg-primary mt-4'>
        Download Code
      </Button>
    </div>
  )
}
BusinessProfileScreen.layout = page => <Layout children={page} props={page.props.company} />
export default BusinessProfileScreen