import { Input, Button, Textarea } from '@material-tailwind/react'
import React,{useState} from 'react'
import Compressor from 'compressorjs';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from '@inertiajs/react';
import Navbar from '@/Layouts/components/Navbar';
import Footer from '@/Layouts/components/Footer';


function RegisterCompanyScreen() {
    const [logo, setLogo] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
    
        new Compressor(file, {
          quality: 0.6,
          success(result) {
            setLogo(result);
          },
          error(err) {
            console.log(err.message);
          },
        });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();

        toast.loading('Creating company please wait..');

        if(companyName == ''){
            toast.dismiss();
            toast.error("Company Name is required");
        }
        
        else{

            router.post('/register-company', { logo, companyName,contact,location, email }, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.dismiss();
                }
              })

        }
      }

    
    return (
        <div>
            <Navbar/>
            <section className="max-w-4xl p-6 mx-auto bg-gray-100 rounded-md shadow-md dark:bg-gray-800 my-10">
                <div className='flex justify-center'>
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Register New Business</h1>
                </div>
                <div className='my-6'>
                <form onSubmit={handleSubmit}>
                
                    <div className='w-full items-center flex justify-between my-3' >
                        <Input  label='Company Logo' accept=".jpg,.jpeg,.png" size='md' type='file' onChange={handleImageChange}/>
                    </div>
                    <div className='w-full my-3' >
                        <Input color='deep-orange' label='Company Name' size='md' 
                        value={companyName} onChange={(event) => setCompanyName(event.target.value)}/>
                    </div>
                    <div className='w-full my-3' >
                        <Input color='deep-orange' label='Location' size='md' 
                        value={location} onChange={(event) => setLocation(event.target.value)}/>
                    </div>
                    <div className='w-full my-3' >
                        <Input color='deep-orange' label='Contact' size='md' 
                        value={contact} onChange={(event) => setContact(event.target.value)}/>
                    </div>
                    <div className='w-full my-3' >
                        <Input color='deep-orange' label='Email' size='md' 
                        value={email} onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                    <Button className='bg-primary mt-3' type='submit'>Register Company</Button>
                    </form>
                </div>
            </section>
            <ToastContainer/>
            <Footer/>
        </div>
    )
}

export default RegisterCompanyScreen