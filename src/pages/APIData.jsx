import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { fetchPosts, searchPosts } from '../services/api'

export default function APIData() {
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [hasMore, setHasMore] = useState(true)

  // Load posts on page change
  useEffect(() => {
    loadPage(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  // Function to load a page of posts
  async function loadPage(p) {
    setLoading(true)
    setError('')
    try {
      const data = await fetchPosts(p, 10)
      setPosts(prev => [...prev, ...data])
      if (data.length < 10) setHasMore(false)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  // Handle search
  async function handleSearch(e) {
    e.preventDefault()
    if (!query.trim()) {
      // Reset to default state
      setPosts([])
      setPage(1)
      setHasMore(true)
      return
    }
    setLoading(true)
    setError('')
    try {
      const results = await searchPosts(query.trim())
      setPosts(results)
      setHasMore(false)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-semibold">Posts (JSONPlaceholder)</h2>
        <form className="mt-4 flex gap-2" onSubmit={handleSearch}>
          <input
            className="flex-1 rounded p-2 border dark:border-slate-700"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search posts"
          />
          <Button type="submit">Search</Button>
          <Button
            variant="secondary"
            onClick={() => {
              setQuery('')
              setPosts([])
              setPage(1)
              setHasMore(true)
            }}
          >
            Reset
          </Button>
        </form>
      </Card>

      {posts.length === 0 && (
        <Card>
          <p className="text-slate-600 dark:text-slate-300">
            No posts loaded yet. Click load more to fetch.
          </p>
        </Card>
      )}

      <div className="grid gap-4">
        {posts.map(p => (
          <Card key={p.id} className="p-4">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm mt-2 text-slate-600 dark:text-slate-300">{p.body}</p>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center">
        {error && <div className="text-red-500 mr-4">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : hasMore ? (
          <Button onClick={() => setPage(prev => prev + 1)}>Load more</Button>
        ) : (
          <div className="text-sm text-slate-500">No more posts</div>
        )}
      </div>
    </div>
  )
}
