import SignUpForm from '@/components/authentication/SignUpForm/SignupForm';
import styles from '@/app/styles.module.css'
import Image from 'next/image';
import loginLogo from '../../../../public/images/others/cake logo.png'
import logoWhite from '../../../../public/images/others/logoWhite.png'

export const metadata = {
    title: "Signup | Infotecsourz",
    description: "$20 Free Credit Photo Retouching App"
}



const SignUp = () => {


    return (

        <div className='lg:grid grid-cols-2 min-h-screen  mx-auto '>
            <div className={`hidden lg:flex justify-center items-center ${styles.bg_image}`}>
                <div className=' fill rounded-2xl bg-opacity-80  p-20 mx-20 relative '>


                    <Image
                        src={logoWhite}
                        height={600}
                        width={600}
                        fil="true"
                        alt="brand logo"
                        style={{ maxWidth: '140%', marginLeft: '-70px' }}

                    />
                    <p className=' text-xl mt-5 text-center text-white '>Virtual Photo Retouching Studio</p>
                </div>
            </div>

            {/* **************right side ************ */}

            <SignUpForm />
        </div>
    );
};

export default SignUp;