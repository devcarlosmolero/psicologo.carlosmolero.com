import { Link } from '@remix-run/react'
import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react/jsx-runtime'
import { IResource } from '~/types/contentful'

export default function ResourcesLinkGroup({
    resources,
}: {
    resources: IResource[]
}) {
    return (
        <Fragment>
            {resources && resources.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                    {resources.map(
                        ({ seoTitle, slug }: IResource, index: number) => (
                            <Link
                                className="flex items-center gap-x-1 font-bold text-primary hover:underline"
                                key={index}
                                to={`/resources/${slug}`}
                            >
                                <ChevronRight className="size-4" />
                                <p className="w-full">{seoTitle}</p>
                            </Link>
                        )
                    )}
                </div>
            ) : (
                <p>No hay recursos... Todavía</p>
            )}
        </Fragment>
    )
}
