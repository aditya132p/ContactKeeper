import React, { Children, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
// import { Cross2Icon } from "@radix-ui/react-icons";
import MyForm from "../form";
import { IoMdContacts } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { Tooltip } from "@radix-ui/themes";
import { User } from "@/types/Error";


const ButtonDailog = (
    { buttonName, style, data, isEdit }: { buttonName: string, style: string, data?: User, isEdit: boolean }
) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    console.log(isEdit)

    return (
        <>
            <Dialog.Root
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            >
                <Dialog.Trigger asChild>
                    <button
                        className={style}>
                        {buttonName}
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
                        <Dialog.Title className="m-0 text-[34px] text-center text-[#202020] font-bold">
                            {isEdit ? "Edit  Contact" : "Add New Contact"}
                        </Dialog.Title>
                        <Dialog.Description className="mb-5 mt-2.5 text-[18px] text-center leading-normal text-[#6F6C90]">
                            {isEdit ? "Fill out the below form to Update a member" : "Fill out the below form to add new member"}
                        </Dialog.Description>

                        <MyForm
                            setDialogOpen={setDialogOpen}
                            isEdit={isEdit} contactInfo={data} />

                        <Dialog.Close asChild>
                            <button
                                className="absolute right-2.5 top-2.5 inline-flex text-2xl appearance-none items-center justify-center rounded-full text-violet-900 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                                aria-label="Close"
                            >
                                <CgClose size={24} fill="#8E4EC6" />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}

export default ButtonDailog