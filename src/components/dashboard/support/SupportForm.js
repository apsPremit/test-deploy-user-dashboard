"use client"
import { UserAuth } from '@/context/AuthProvider';
import sendSupportMessage from '@/utils/functions/sendSupportMessage';

import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SupportForm = () => {
    const { user } = UserAuth()

    const sendMessage = async (e) => {
        e.preventDefault()
        const form = e.target;
        const subject = form.subject.value;
        const message = form.message.value;
        const messageData = { email: user?.email, subject, message }
        try {
            const sendResult = await sendSupportMessage(messageData)

            if (sendResult.success) {
                toast.success('message sent')
            }
        } catch (error) {
            alert('unknown error')
        }

    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                    Contact Us
                </h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                    Got a technical issue? Want to send feedback about a our services? Need
                    details about our Business plan? Let us know.
                </p>
                <form onSubmit={sendMessage} action="#" className="space-y-8">
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Your email
                        </label>
                        <input
                            type="email"
                            defaultValue={user?.email}
                            id="email"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                            placeholder="name@flowbite.com"
                            required=""
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="subject"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name='subject'
                            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                            placeholder="Let us know how we can help you"
                            required
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                        >
                            Your message
                        </label>
                        <textarea
                            id="message"
                            name='message'
                            rows={6}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Leave a comment..."

                        />
                    </div>
                    <button type='submit' className='bg-main px-3 py-2.5 text-white hover:bg-mainHover rounded '>Send Message</button>
                </form>
            </div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </section>
    );
};

export default SupportForm;