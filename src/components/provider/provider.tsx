"use client"

import { store } from '@/store'
import React from 'react'
import { Provider } from 'react-redux'
import { Bounce, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";


const Providers = ({ children, }: { children: React.ReactNode; }) => {
    return (<>
        <Provider store={store}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            {children}
        </Provider>
    </>
    )
}

export default Providers