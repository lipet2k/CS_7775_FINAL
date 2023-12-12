import { ReactElement, useEffect, useContext } from 'react';
import Layout from '@/components/Layout';
import Proof from '@/components/Proof';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image'
import Link from 'next/link'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Block from '@/components/Block';
import { ProofContext } from '../_app';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const navigation = [
    { name: 'Classify', href: '/demo/classify' },
    { name: 'Erase', href: '/demo/erase' },
    { name: 'Verify', href: '/demo/verify' },
];

export async function getServerSideProps() {
    const res = await fetch('http://' + serverRuntimeConfig.BACKEND_ADDRESS + ':' + serverRuntimeConfig.BACKEND_PORT + '/examples')
    const examples = await res.json()
    const blocks = []

    for (let i = 0; i < examples.length; i++) {
        const model_examples = examples[i].data;
        for (let j = 0; j < model_examples.length; j++) {
            const example = model_examples[j][0]
            blocks.push({
                id: { "block_id": examples[i].id, "idx": j },
                age: example[0],
                income: example[1],
                credit_ex: example[2],
                home_ownership: example[3],
                employment: example[4],
                reports: example[5],
                selected: false,
            })
        }
    }


    return {
        props: {
            examples: blocks,
        },
    }
}

export default function Erase({ examples }: { examples: any }) {
    const { proof, setProof } = useContext(ProofContext);
    const [generatingProof, setGeneratingProof] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [blocks, setBlocks] = useState<any[]>(examples);

    async function handleReset(e: any) {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/reset', {
            method: "POST"
        })
        const data = await res.json()
        toast.info("Reset", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    }

    async function handleUnlearn(e: any) {
        e.preventDefault();
        setGeneratingProof(true);
        const params = {
            "model_id_1": blocks[0].id.block_id.toString(),
            "datapoint_idx_1": "5",
        }
        const res = await fetch('/api/unlearn' + '?' + new URLSearchParams(params), {
            method: "POST"
        });
        const data = await res.json()
        setProof(JSON.stringify(data, null, '\t'));
        setGeneratingProof(false);
    }

    function Floating() {
        return (
            <div className="flex fixed bottom-0 bg-transparent backdrop-blur-lg text-xl w-screen p-2 items-center text-center rounded justify-center flex">
                <div className="flex space-x-8">
                    {(!generatingProof) ? (<button
                        type="button"
                        className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={handleUnlearn}
                    >
                        <Link href="#scroll">
                            Unlearn
                        </Link>
                    </button>) : (
                        <button
                            type="button"
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:cursor-wait"
                        >
                            <Link href="#scroll">
                                Loading...
                            </Link>
                        </button>
                    )}
                    <button
                        type="button"
                        className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-900 h-screen">
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
                <div className="flex flex-col justify-center mt-10 ml-4 mr-4 mb-10">
                    <div className="mb-20 bg-white p-2 rounded border border-black border-dotted border-2 flex flex-col justify-center items-center">
                        <h1 className="text-6xl">Credit Score Database</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-10">
                            {blocks.map((block, key) => (
                                <Block block={block} blocks={blocks} setBlocks={setBlocks} key={key} />
                            ))}
                        </div>
                        {proof &&
                    (<div className="mt-[10rem] mb-[10rem]">
                        <Proof proof={proof} />
                    </div>)}
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
            <div className="flex justify-center">
                <Floating />
            </div>
        </div>
    )
}

