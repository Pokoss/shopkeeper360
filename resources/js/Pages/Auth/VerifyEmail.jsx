import { Head, Link, useForm } from '@inertiajs/react';
import Navbar from '@/Layouts/components/Navbar';
import Footer from '@/Layouts/components/Footer';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <div className="min-h-screen bg-gray-50 font-oswald">
            <Head title="Email Verification" />
            <Navbar />

            <div className="flex items-center justify-center p-4 py-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center mb-4">
                            <img 
                                src='/images/user/shopwhite.png' 
                                className='h-16 bg-gradient-to-r from-primary to-secondary p-3 rounded-2xl shadow-lg' 
                                alt="Biashari Logo" 
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
                        <p className="text-gray-600">Check your inbox to get started</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="text-center mb-6">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                                <svg className="h-8 w-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            
                            <div className="text-gray-700 mb-6 space-y-3">
                                <p className="font-medium">Thanks for signing up!</p>
                                <p className="text-sm">
                                    Before getting started, please verify your email address by clicking on the
                                    link we just emailed to you.
                                </p>
                                <p className="text-sm text-gray-600">
                                    If you didn't receive the email, we'll gladly send you another.
                                </p>
                            </div>

                            {status === 'verification-link-sent' && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                                    A new verification link has been sent to your email address!
                                </div>
                            )}
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-4 rounded-xl hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    'Resend Verification Email'
                                )}
                            </button>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full text-center py-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
                            >
                                Log Out
                            </Link>
                        </form>
                    </div>

                    <p className="text-center mt-6 text-gray-600 text-sm">
                        Check your spam folder if you don't see the email in your inbox.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
