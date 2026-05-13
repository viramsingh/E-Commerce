import { Link } from 'react-router-dom'
import { Button } from '../components/Button'

export function NotFoundPage() {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-black">Page not found</h1>
      <p className="mt-2 text-slate-600">The page you are looking for does not exist.</p>
      <Button className="mt-5">
        <Link to="/">Back to catalog</Link>
      </Button>
    </section>
  )
}
