import Layout from '@/Layouts/components/Layout'
import React from 'react'

function ExpenseScreen() {
  return (
    <div>ExpenseScreen</div>
  )
}
ExpenseScreen.layout = page => <Layout children={page} props={page.props.company} />

export default ExpenseScreen