import { mailIcon, phoneIcon } from '@/constants/image'
import { User } from '@/types/Error'
import { Box, Heading, Text, Tooltip } from '@radix-ui/themes'
import Image from 'next/image'
import React from 'react'
import { CiMenuKebab } from "react-icons/ci";
import DropDown from '../dropDownMenu'
import DropdownMenuDemo from '../dropDownMenu'
import { Card } from '@prisma/client'
type CardBoxprops = {
    userData: Card
}
const CardBox = ({ userData }: CardBoxprops) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Box className='flex justify-between relative shadow-sm flex-col h-full py-5 w-full border-[1px] border-slate-100 bg-white rounded-lg px-8'>

            <Tooltip content="Options">
                <div className='absolute top-6 right-6'>
                    <DropdownMenuDemo id={userData?.id} Data={userData} />

                </div>
            </Tooltip>


            <div className='flex flex-col gap-5 items-center justify-center pt-4'>
                <span className='font-bold text-2xl h-16 items-center flex justify-center w-16 p-5 text-slate-700 rounded-full bg-purple-400'>
                    {userData?.name.charAt(0)}
                </span>
                <div className='text-center'>
                    <Heading className='text-lg capitalize'>{userData?.name}</Heading>
                    <Text className='text-sm capitalize' as='p'>{userData?.title} at</Text>
                    <Text className='text-sm text-purple-700 capitalize font-bold'>{userData?.company}</Text>
                </div>
            </div>


            <div className='info'>
                <Tooltip content={userData?.phone}>
                    <span className='flex items-center gap-3'>
                        <Image src={phoneIcon} width={35} height={35} alt='phone icon' />
                        {userData?.phone}
                    </span>
                </Tooltip>
                <Tooltip content={userData?.email}>
                    <span className='flex text-sm items-center gap-3 mt-1'>
                        <Image src={mailIcon} width={35} height={35} alt='mail icon' />
                        {userData?.email}
                    </span>
                </Tooltip>
            </div>
        </Box>
    );
}

export default CardBox;
