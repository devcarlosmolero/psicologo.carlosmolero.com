import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    json,
    redirect,
    useLoaderData,
} from '@remix-run/react'
//@ts-expect-error idk
import stylesheet from '~/tailwind.css?url'
import Navbar from './components/organisms/Navbar'
import { SITE_BASE_URL } from './consts'

export async function loader({ request }: LoaderFunctionArgs) {
    const pathname = new URL(request.url).pathname
    const hostname = new URL(request.url).hostname
    const hasWWW = new URL(request.url).hostname.includes('www')
    const isLocal = hostname.includes('dev.carlosmolero.com')

    if (!hasWWW && !isLocal) {
        return redirect(`${SITE_BASE_URL}${pathname}`, { status: 301 })
    }

    return json({ url: request.url })
}

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
]

export default function App() {
    const { url } = useLoaderData<typeof loader>()

    return (
        <html lang={'es'}>
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href={`/carlos-molero.png`}
                />
                <link rel="canonical" href={url} />
                <meta property="og:url" content={url} />
                <meta property="og:locale" content={'es'} />
                <Meta />
                <Links />
            </head>
            <body>
                <main>
                    <Navbar />
                    <Outlet />
                    <ScrollRestoration />
                    <Scripts />
                </main>
            </body>
        </html>
    )
}
