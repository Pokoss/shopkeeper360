import Layout from '@/Layouts/components/Layout'
import React from 'react'

function BusinessQrScreen({company}) {
  return (
    <div>BusinessQrScreen</div>
  )
}
BusinessQrScreen.layout = page => <Layout children={page} props={page.props.company} />
export default BusinessQrScreen