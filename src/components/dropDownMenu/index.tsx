import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
    HamburgerMenuIcon,
    DotFilledIcon,
    CheckIcon,
    ChevronRightIcon,
} from "@radix-ui/react-icons";
import { CiMenuKebab } from "react-icons/ci";
import ButtonDailog from "../buttonDailog/buttonDailog";
import { useDeleteContactMutation, useGetContactsQuery } from "@/store/api";
import { number } from "yup";
import { User } from "@/types/Error";



const DropdownMenuDemo = ({ id, Data }: { id: number; Data: User }) => {

    const [deleteContact] = useDeleteContactMutation()
    const { data, refetch } = useGetContactsQuery([])
    const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
    const [open, setOpen] = React.useState(false);

    // console.log({ Aditya: Data });
    return (
        <DropdownMenu.Root
        >
            <DropdownMenu.Trigger asChild>
                <button
                    // className="inline-flex size-[35px] border-none items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
                    aria-label="Customise options"
                >
                    <CiMenuKebab />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                    sideOffset={5}
                >
                    <div onClick={() => setOpen(true)} className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 hover:text-white data-[disabled]:text-mauve8 hover:bg-violet9 data-[highlighted]:text-violet1">
                        <ButtonDailog isEdit={bookmarksChecked} buttonName=" Edits" style='' data={Data} />
                    </div>
                    <button onClick={async () => {
                        try {
                            const response = await deleteContact(id)
                            refetch()
                            console.log("dropDown", id)
                        } catch (error) {
                            console.log(error)
                        }

                    }} className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
                        Delete
                    </button>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default DropdownMenuDemo;
