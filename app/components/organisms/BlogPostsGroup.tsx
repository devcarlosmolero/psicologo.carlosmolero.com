import { Fragment } from 'react/jsx-runtime'
import { IBlogPost } from '~/types/contentful'
import BlogPost from '../molecules/BlogPost'

export interface IBlogPostsGroupProps {
    posts: IBlogPost[]
    showCategories?: boolean
}

export default function BlogPostsGroup({
    posts,
    showCategories = true,
}: IBlogPostsGroupProps) {
    return (
        <Fragment>
            {posts && posts.length > 0 ? (
                <div className="grid gap-5 lg:grid-cols-2">
                    {posts.map((post) => (
                        <BlogPost
                            key={post.seoTitle}
                            showCategories={showCategories}
                            post={post}
                        />
                    ))}
                </div>
            ) : (
                <p>No hay publicaciones... Todavía</p>
            )}
        </Fragment>
    )
}
