'use client'

import React, { useEffect, useState } from 'react'
import { IComment } from '@/interfaces/index'
import { FaDeleteLeft } from "react-icons/fa6";

const ReadComments = () => {
    const replies = [
        {
            id: '1',
            writer: 'aaa',
            content: 'AAA',
            password: '123',
            createdAt: "2024-01-05",
            updatedAt: "2024-01-05"
        },
        {
            id: '2',
            writer: 'bbb',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut atque voluptatibus et labore minima debitis voluptatum sunt provident nobis saepe, facere soluta quod recusandae commodi illum quasi eligendi laboriosam perspiciatis molestiae fuga temporibus voluptates. Iusto, vitae dolorem error quia nulla, obcaecati officia, architecto consectetur facilis delectus dicta maiores accusamus expedita?',
            password: '123',
            createdAt: "2024-01-05",
            updatedAt: "2024-01-05"
        },
        {
            id: '3',
            writer: 'ccc',
            content: 'CCC',
            password: '123',
            createdAt: "2024-01-05",
            updatedAt: "2024-01-05"
        },
    ]

    return (
        <>
            { replies.map((reply: IComment) => (
                <div className='m-4 flex gap-2 justify-between items-start'>
                    <div className='flex gap-4'>
                        <span>{ reply.writer }</span>

                        <span>{ reply.content }</span>        
                    </div>

                    {/* delete icon / password box */}
                    <div onClick={() => {}} className='cursor-pointer'>
                        <FaDeleteLeft />
                    </div>
                </div>
            ))}
        </>
    )
}

export default ReadComments