import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'


export default function Layout({ children }){
return (
<div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
<Navbar />
<main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
{children}
</main>
<Footer />
</div>
)
}