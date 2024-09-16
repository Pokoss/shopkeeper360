import Layout from '@/Layouts/components/Layout'
import React from 'react'

function BusinessSubscriptionScreen({company}) {
  return (
    <div>BusinessSubscriptionScreen</div>
  )
}
BusinessSubscriptionScreen.layout = page => <Layout children={page} props={page.props.company} />
export default BusinessSubscriptionScreen