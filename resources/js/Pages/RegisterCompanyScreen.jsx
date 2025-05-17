import { Input, Button, Textarea,Select, Option } from '@material-tailwind/react'
import React, { useState, useEffect } from 'react'
import Compressor from 'compressorjs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Head, router } from '@inertiajs/react';
import Navbar from '@/Layouts/components/Navbar';
import Footer from '@/Layouts/components/Footer';


function RegisterCompanyScreen({ category }) {
  console.log(category)
  const [logo, setLogo] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const [geoL, setGeoL] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setGeoL({ latitude, longitude });
          //   fetchBusinesses(latitude, longitude);
        },
        handleError
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);


  const handleError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
      default:
        setError("An error occurred.");
    }
  };

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

    console.log(geoL.latitude)
    // toast.loading('Creating company please wait..');
    var latitude = geoL.latitude;
    var longitude = geoL.longitude


    if (companyName == '') {
      toast.dismiss();
      toast.error("Company Name is required");
    }

    else {

     
      router.post('/register-company', { logo, companyName, contact, location, email,categoryId,latitude,longitude }, {
        preserveScroll: true,
        onSuccess: () => {
          toast.dismiss();
        }
      })

    }
  }


  return (
    <div className='font-oswald'>
      <Head>
                <title>
                    Create a business
                </title>
            </Head>
      <Navbar />
      <section className="max-w-4xl p-6 mx-auto bg-gray-100 rounded-md shadow-md dark:bg-gray-800 my-10">
        <div className='flex justify-center'>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Register New Business</h1>
        </div>
        <div className='my-6'>
          <form onSubmit={handleSubmit}>

            <div className='w-full items-center flex justify-between my-3' >
              <Input label='Company Logo' accept=".jpg,.jpeg,.png" size='md' type='file' onChange={handleImageChange} />
            </div>
            <div className='w-full my-3' >
              <Input color='deep-orange' label='Company Name' size='md'
                value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
            </div>
            <div className='w-full my-3' >
              <Input color='deep-orange' label='Location' size='md'
                value={location} onChange={(event) => setLocation(event.target.value)} />
            </div>
            <div className='w-full my-3' >
              <Select color='deep-orange' label="Business Category"
                value={categoryId} onChange={(e) => setCategoryId(e)}
              >
                {category && category.map((m, index) =>
                  <Option value={m.id}> {m.name}</Option>
                )}

              </Select>
            </div>
            <div className='w-full my-3' >
              <Input color='deep-orange' label='Contact' size='md'
                value={contact} onChange={(event) => setContact(event.target.value)} />
            </div>
            <div className='w-full my-3' >
              <Input color='deep-orange' label='Email' size='md'
                value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <Button className='bg-primary mt-3' type='submit'>Register Company</Button>
          </form>
        </div>
      </section>
      <ToastContainer />
      <Footer />
    </div>
  )
}

export default RegisterCompanyScreen