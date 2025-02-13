import { Link } from '@remix-run/react'
import { Fragment } from 'react/jsx-runtime'
import { IBlogPost } from '~/types/contentful'
import { FakeBackgroundImagePrimitive } from '../atoms/FakeBackgroundImagePrimitive'

export default function BlogPost({
    post,
    showCategories = true,
}: {
    post: IBlogPost
    showCategories?: boolean
}) {
    return (
        <Fragment>
            <div className="grid gap-5 rounded-lg md:grid-cols-2">
                <FakeBackgroundImagePrimitive.Container className="aspect-h-9 aspect-w-16 rounded-md">
                    <Link to={`${post.slug}`}>
                        <FakeBackgroundImagePrimitive.Image
                            alt={post.seoTitle}
                            src={post.headerImgUrl!}
                        />
                    </Link>
                </FakeBackgroundImagePrimitive.Container>

                <div>
                    <Link to={`${post.slug}`}>
                        <p className="mb-3 text-xs text-gray-600">
                            {post.formattedUpdatedAt}
                        </p>
                        <h3 className="text-xl">{post.seoTitle}</h3>
                        <p className="line-clamp-3 text-sm text-gray-600">
                            {post.seoDescription}
                        </p>
                    </Link>
                    {showCategories && (
                        <div className="mt-3 flex flex-wrap gap-x-2">
                            {post.categories.map(
                                (category: string, index: number) => (
                                    <Link
                                        to={`/blog?category=${category}`}
                                        className="text-sm underline"
                                        key={index}
                                    >
                                        {category}
                                    </Link>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    )
}
