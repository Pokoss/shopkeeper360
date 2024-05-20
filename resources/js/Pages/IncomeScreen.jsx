import Layout from '@/Layouts/components/Layout'
import React from 'react'

function IncomeScreen() {
  return (
    <div>IncomeScreen</div>
  )
}
IncomeScreen.layout = page => <Layout children={page} props={page.props.company} />

export default IncomeScreen