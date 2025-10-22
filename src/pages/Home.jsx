import React from 'react'
import Card from '../components/Card'


export default function Home(){
return (
<div className="space-y-6">
<Card>
<h1 className="text-2xl font-bold">Welcome — React + Tailwind</h1>
<p className="mt-2 text-slate-600 dark:text-slate-300">This project demonstrates components, state, hooks, and API integration as requested.</p>
</Card>


<Card>
<h2 className="font-semibold">What you'll find</h2>
<ul className="mt-2 list-disc pl-5 text-slate-600 dark:text-slate-300">
<li>Task Manager with add/complete/delete and filters</li>
<li>Theme switcher using useContext + localStorage</li>
<li>API Data page with pagination & search</li>
</ul>
</Card>
</div>
)
}