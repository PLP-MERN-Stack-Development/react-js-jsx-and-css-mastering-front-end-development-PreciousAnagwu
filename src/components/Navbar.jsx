import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import Button from './Button'


export default function Navbar(){
const { theme, toggle } = useTheme()
return (
<nav className="w-full border-b dark:border-slate-700 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
<div className="max-w-5xl mx-auto flex items-center justify-between p-4">
<Link to="/" className="font-bold text-lg">Precious Anagwu UI</Link>
<div className="flex items-center gap-3">
<Link to="/tasks" className="hidden sm:inline">Tasks</Link>
<Link to="/api" className="hidden sm:inline">API Data</Link>
<Button variant="secondary" onClick={toggle} aria-label="Toggle theme">
{theme === 'dark' ? 'Light' : 'Dark'}
</Button>
</div>
</div>
</nav>
)
}