import React, { useState } from 'react';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-toastify';
// const { publicRuntimeConfig } = getConfig();

const navigation = [
    { name: 'Classify', href: '/demo/classify' },
    { name: 'Erase', href: '/demo/erase' },
    { name: 'Verify', href: '/demo/verify' },
]

export default function Classify() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const [age, setAge] = useState<number>(0);
    const [income, setIncome] = useState<number>(0);
    const [credit_ex, setCreditEx] = useState<number>(0);
    const [home_ownership, setHomeOwnership] = useState<boolean>(false);
    const [employment, setEmployment] = useState<boolean>(false);
    const [reports, setReports] = useState<number>(0);

    function handleChange(e: any) {
        e.preventDefault();
        switch (e.target.name) {
            case "age":
                setAge(e.target.value);
                break;
            case "income":
                setIncome(e.target.value);
                break;
            case "credit_ex":
                setCreditEx(e.target.value);
                break;
            case "home_ownership":
                setHomeOwnership(e.target.value);
                break;
            case "employment":
                setEmployment(e.target.value);
                break;
            case "reports":
                setReports(e.target.value);
                break;
        }
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            let ownership = home_ownership ? 1 : 0;
            let employ = employment ? 1 : 0;

            const params = {
                age: age.toString(),
                income: income.toString(),
                credit_ex: credit_ex.toString(),
                home_ownership: ownership.toString(),
                employment: employ.toString(),
                reports: reports.toString(),
            }
            const response = await fetch('/api/classify' + '?' + new URLSearchParams(params));
            const data = await response.json();

            toast.info(data.prediction, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-gray-900">
            <header className="absolute inset-x-0 -top-2 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <span aria-hidden="true" className="text-black font-bold text-xl">&larr;</span>
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-800"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link key={item.name} href={item.href} className="text-md font-semibold leading-6 text-black">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="-m-1.5 p-1.5">
                                <h1 className="text-2xl font-bold text-black">Erasify</h1>
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-800"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/25">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black hover:bg-gray-100"
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>

            <div className="relative isolate overflow-hidden pt-14">
                <Image
                    src="/images/waldo_background.jpeg"
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                    width={5120}
                    height={2880}
                />
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="flex flex-col items-center">
                        <form>
                            <div className="space-y-12 bg-white p-4 rounded shadow border border-dotted border-black border-2 pb-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Credit Score Profile*</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        *This information will be used to classify the user into one of two binary categories. The
                                        data is derived from the analcatdata_creditscore dataset from the Penn Machine Learning Benchmarks (PMLB) library.
                                    </p>
                                </div>
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <div className="mt-[3rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                                            Age
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="age"
                                                id="age"
                                                autoComplete="age"
                                                placeholder="18"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[3rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="income-per-dependent" className="block text-sm font-medium leading-6 text-gray-900">
                                            Income Per Dependent
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="income-per-dependent"
                                                id="income-per-dependent"
                                                placeholder="0"
                                                autoComplete="income-per-dependent"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-[3rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="monthly-credit-card-expidenture" className="block text-sm font-medium leading-6 text-gray-900">
                                            Monthly credit card expidenture
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="monthly-credit-card-expidenture"
                                                id="monthly-credit-card-expidenture"
                                                placeholder="0"
                                                autoComplete="monthly-credit-card-expidenture"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="home-ownership"
                                            name="home-ownership"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="home-ownership" className="font-medium text-gray-900">
                                            Home Ownership
                                        </label>
                                        <p className="text-gray-500">Do you currently own a home (the home is owned by you or someone in your household with a mortgage or loan)?</p>
                                    </div>
                                </div>

                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="self-employment"
                                            name="self-employment"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="self-employment" className="font-medium text-gray-900">
                                            Self Employment
                                        </label>
                                        <p className="text-gray-500">Are you currently self-employed (are you an independent contractor or in business for yourself)?</p>
                                    </div>
                                </div>

                                <div className="mt-[3rem] grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="deragatory-reports" className="block text-sm font-medium leading-6 text-gray-900">
                                            Deragatory Reports
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                name="deragatory-reports"
                                                id="deragatory-reports"
                                                autoComplete="deragatory-reports"
                                                placeholder="0"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="submit"
                                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-100 border border-black border-dashed"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}