import { Block } from '@/types/Block';
import { Dispatch, SetStateAction, useState } from 'react';
import { useEffect } from 'react';

export default function Block({ block, blocks, setBlocks }: { block: Block, blocks: Block[], setBlocks: Dispatch<SetStateAction<Block[]>> }) {

    function handleSelect(id: number) {
        let tmp = blocks;
        tmp.forEach((block: Block) => {
            if (block.id === id) {
                block.selected = !block.selected;
            }
            else {
                block.selected = false;
            }
        })
        setBlocks([...tmp]);
    }

    return (
        <div className={`bg-white shadow rounded border border-2 p-2 w-[16rem] h-[10rem] ${block.selected ? 'border-red-500 bg-red-100' : 'border-black border-dashed'} hover:cursor-pointer`} onClick={() => {
            handleSelect(block.id);
            console.log(block)
        }}>
            <div className="flex flex-col text-sm">
                <p>Age: {block.age}</p>
                <p>Income Per Dependent: {block.income}</p>
                <p>Monthly Credit Card Expidenture: {block.credit_ex}</p>
                <p>Home Ownership: {block.home_ownership}</p>
                <p>Self Employment: {block.employment}</p>
                <p>Deragatory Reports: {block.reports}</p>
            </div>
        </div>
    )
}