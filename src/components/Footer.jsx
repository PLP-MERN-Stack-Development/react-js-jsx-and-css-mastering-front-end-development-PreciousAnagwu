import React from 'react'


export default function Footer(){
const year = new Date().getFullYear()
return (
<footer className="mt-8 border-t dark:border-slate-700 py-6">
<div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
<div className="text-sm">© {year} Precious Anangwu. All rights reserved.</div>
<div className="flex gap-4 text-sm">
<a href="#">Privacy</a>
<a href="#">Terms</a>
<a href="#">Contact</a>
</div>
</div>
</footer>
)
}