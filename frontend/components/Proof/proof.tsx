import { ClipboardIcon } from '@heroicons/react/20/solid'

export default function Proof({ proof }: { proof: string }) {

    async function handleClick(proof: string) {
        try {
            await navigator.clipboard.writeText(proof)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    return (
        <div className="bg-gray-200 px-4 py-5 sm:px-6 rounded w-[22rem] lg:w-[50rem] border border-black border-dashed overflow-hidden">
            <div className="flex space-x-3">
                <div className="min-w-0 flex-1">
                    <pre className="text-xs lg:text-xs">{proof.slice(0, 600) + "..."}</pre>
                </div>
                <div className="flex flex-shrink-0">
                    <div className="relative inline-block text-left">
                        <ClipboardIcon
                            className="h-5 w-5 hover:text-gray-600 hover:cursor-pointer"
                            aria-hidden="true"
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(proof);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}