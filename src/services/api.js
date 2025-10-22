const BASE = 'https://jsonplaceholder.typicode.com'


export async function fetchPosts(page=1, limit=10) {
const start = (page-1)*limit
const res = await fetch(`${BASE}/posts?_start=${start}&_limit=${limit}`)
if(!res.ok) throw new Error('Failed to fetch posts')
return res.json()
}


export async function searchPosts(q){
const res = await fetch(`${BASE}/posts`)
if(!res.ok) throw new Error('Failed to fetch posts')
const data = await res.json()
return data.filter(p => p.title.includes(q) || p.body.includes(q))
}