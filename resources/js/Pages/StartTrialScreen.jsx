import { Head, Link, router } from '@inertiajs/react'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StartTrialScreen({ company }) {

    console.log(company);

    const startTrial = async (event) => {
        event.preventDefault();



        if (company.company.status == 'inactive' && company.position =='owner') {

            toast.loading('Activating trial please wait')
            var company_id = company.company.id
            
            router.post('/start-free-trial', { company_id }, {
                preserveScroll: true,
                onSuccess: () => {
    
                    toast.dismiss();
                    
                }
            })
        }
        
        else {
            toast.success('Something went wrong contact the business owner or biashari support')
        }
    }

    return (
        <div>
            <Head>
                <title>
                    Start Trial
                </title>
            </Head>
            <section>
                <div className="container flex flex-col items-center px-4 py-8 mx-auto text-center md:px-10 lg:px-32 xl:max-w-3xl">
                    <img className='w-28 h-28' src='/images/user/shopkeeper360.png' />
                    <h1 className="text-4xl text-primary font-bold leading sm:text-4xl">Biashari

                    </h1>
                    <p className="px-8 mt-8 mb-5 text-lg">Welcome to Biashari {company.company.name}, start your free trial by clicking the activate button</p>
                    <div className="flex flex-wrap justify-center">
                        <Link href='/company' className="px-8 py-3 m-2 text-lg font-semibold rounded bg-white shadow-sm shadow-primary  text-gray-900">Go Home</Link>
                        <button onClick={startTrial} className="px-8 py-3 m-2 text-lg border bg-primary text-white rounded ">Activate Trial</button>
                        {/* <Link href='/register' className="px-8 py-3 m-2 text-lg border bg-primary text-white rounded ">Be a marketeer</Link> */}
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    )
}

export default StartTrialScreen