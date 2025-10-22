import React from 'react'


export default function Button({ children, variant='primary', className='', ...props }){
const base = 'px-4 py-2 rounded-lg font-medium transition-transform transform active:scale-95'
const variants = {
primary: 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600',
secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-slate-700 dark:text-white',
danger: 'bg-red-500 text-white hover:bg-red-600'
}
return (
<button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
{children}
</button>
)
}