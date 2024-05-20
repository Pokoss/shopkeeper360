import React, { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react'
import { Avatar } from '@material-tailwind/react'



function CompanyCard({props}) {


  return (
    <div className='w-full hover:bg-gray-200'>
      <Link href={`/dashboard/${props.company.slug}`}>
        <div className='flex items-center'>


          <Avatar className='mr-2' src={props.company.logo!=''?props.company.logo:'/images/user/user.png'}></Avatar>
          <div className="flex justify-between py-4 px-2 items-center w-full border-b-2 ">
            <div className="w-full content-start">
              <div className=" text-start text-lg font-semibold">{props.company.name}</div>
              <span className="text-gray-900"></span>
            </div>
              <div className='p-2 text-xs font-light text-white bg-primary rounded-full'>
                {props.position}
              </div>
            

          </div>
        </div>
      </Link>
    </div>
  )
}

export default CompanyCard