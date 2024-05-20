import Layout from '@/Layouts/components/Layout'
import React from 'react'

function PurchaseScreen() {
  return (
    <div>PurchaseScreen</div>
  )
}
PurchaseScreen.layout = page => <Layout children={page} props={page.props.company} />

export default PurchaseScreen