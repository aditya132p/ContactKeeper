"use client";
import React from 'react';
import { useFormik } from "formik";
import { validationSchema } from '@/utils/yup';
import { useAddContactMutation, useUpdateContactMutation, useGetContactsQuery, contactApi } from '@/store/api';
import { toast } from 'react-toastify';
import { Button, Dialog } from '@radix-ui/themes';
import { DialogClose } from '@radix-ui/react-dialog';
import { User } from '@/types/Error';

type MyFormProps = {
    isEdit?: boolean;
    contactInfo?: User;
    setDialogOpen: (value: boolean) => void;

};

const MyForm = ({ contactInfo, isEdit, setDialogOpen }: MyFormProps) => {
    const initialValues = {
        // id: contactInfo?.id || "",
        name: contactInfo?.name || '',
        email: contactInfo?.email || '',
        phone: contactInfo?.phone || '',
        company: contactInfo?.company || '',
        title: contactInfo?.title || '',
    };

    const { refetch } = useGetContactsQuery([]);
    const [addContact] = useAddContactMutation();
    const [updateContact] = useUpdateContactMutation(); // Mutation for updating contact

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values, action) => {
            try {
                if (isEdit && contactInfo) {

                    const response = await updateContact({ contactId: contactInfo?.id, updatedContact: values })
                    toast('🦄 Contact Updated!');
                    action.resetForm();
                    refetch();
                } else {
                    const response = await addContact(values).unwrap();
                    toast('🦄 Contact Added!');
                    refetch();
                }
                action.resetForm();
                refetch();
                setDialogOpen(false)

            } catch (error) {
                console.log(error);
                toast.error('An error occurred while saving contact.');
            }
        },
    });

    return (
        <div className="w-full flex justify-center">
            <form onSubmit={handleSubmit} className="flex w-5/6 flex-col gap-7">
                <div className="flex flex-col">
                    <label className="text-lg text-[#202020] font-bold" htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="px-6 py-3 outline-none border-none placeholder:col drop-shadow rounded-full"
                        required
                        autoComplete="off"
                        placeholder="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    {errors.name && touched.name ? (
                        <p className="text-red-500">{errors.name}</p>
                    ) : null}
                </div>
                <div className="flex w-full gap-5">
                    <div className="flex w-1/2 flex-col gap-1">
                        <label className="text-lg text-[#202020] font-bold" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="px-6 py-3 outline-none border-none placeholder:col drop-shadow rounded-full"
                            required
                            autoComplete="off"
                            placeholder="Email address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        {errors.email && touched.email ? (
                            <p className="text-red-500">{errors.email}</p>
                        ) : null}
                    </div>
                    <div className="flex w-1/2 flex-col gap-1">
                        <label className="text-lg text-[#202020] font-bold" htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            className="px-6 py-3 outline-none border-none placeholder:col drop-shadow rounded-full"
                            required
                            autoComplete="off"
                            placeholder="(123) 456 - 7890"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                        />
                        {errors.phone && touched.phone ? (
                            <p className="text-red-500">{errors.phone}</p>
                        ) : null}
                    </div>
                </div>

                <div className="flex w-full gap-5">
                    <div className="flex w-1/2 flex-col gap-1">
                        <label className="text-lg text-[#202020] font-bold" htmlFor="company">Company</label>
                        <input
                            type="text"
                            name="company"
                            className="px-6 py-3 outline-none border-none placeholder:col drop-shadow rounded-full"
                            required
                            autoComplete="on"
                            placeholder="Company name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.company}
                        />
                        {errors.company && touched.company ? (
                            <p className="text-red-500">{errors.company}</p>
                        ) : null}
                    </div>
                    <div className="flex w-1/2 flex-col gap-1">
                        <label className="text-lg text-[#202020] font-bold" htmlFor="designation">Designation</label>
                        <input
                            type="text"
                            name="title"
                            className="px-6 py-3 outline-none border-none placeholder:col drop-shadow rounded-full"
                            required
                            autoComplete="off"
                            placeholder="Marketing Manager"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                        />
                        {errors.title && touched.title ? (
                            <p className="text-red-500">{errors.title}</p>
                        ) : null}
                    </div>
                </div>

                <div className="mt-[25px] flex gap-4 justify-center">
                    <button
                        type="submit"
                        className="inline-flex justify-center px-[25px] py-[20px] rounded-md text-white bg-[#6418C3] font-medium leading-none focus:outline-none">
                        {isEdit ? 'Update' : 'Submit'}
                    </button>
                    <DialogClose >
                        <button className="inline-flex justify-center px-[25px] py-[20px] rounded-md text-[#6418C3] border-[#6418C3] border font-medium leading-none focus:outline-none"
                        >
                            Cancel
                        </button>
                    </DialogClose>
                </div>
            </form>
        </div>
    );
};

export default MyForm;
