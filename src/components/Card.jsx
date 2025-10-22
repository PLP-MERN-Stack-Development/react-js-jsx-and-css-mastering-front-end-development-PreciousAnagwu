import React from 'react'


export default function Card({ children, className='' }){
return (
<div className={`card-shadow ${className}`}>
{children}
</div>
)
}