import CompanyCard from '@/Components/CompanyCard'
import { Button } from '@material-tailwind/react'
import { Link } from '@inertiajs/react'
import React, {useState,useContext} from 'react'


function CompanyScreen({companies}) {
console.log(companies)
    return (
        <div>
         
            <section className="max-w-4xl p-6 mx-auto bg-gray-100 rounded-md shadow-md dark:bg-gray-800 my-10">
                <div className='flex justify-between my-3'>

                    <h1 className="text-xl font-bold text-gray-800 center dark:text-white">My Businesses</h1>
                    <Link href='/business/register'>
                        <Button className='bg-primary'>
                            Register New Business
                        </Button>
                    </Link>
                </div>

                {companies && companies.map((company =>(

                <CompanyCard props={company}/>
                )))}
                
            </section>
        </div>
    )
}

export default CompanyScreen