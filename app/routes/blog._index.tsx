import { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import cn from 'classnames'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getContentfulAuthEnvVariables } from '~/actions/contentful'
import Posts from '~/actions/posts'
import BlogPostsGroup from '~/components/organisms/BlogPostsGroup'
import SelectableCategoriesGroup from '~/components/organisms/SelectableCategoriesGroup'
import Container from '~/components/templates/Container'
import SidebarLayout from '~/components/templates/SidebarLayout'
import { SITE_BLOG_DESCRIPTION, SITE_BLOG_TITLE } from '~/consts'
import { IBlogPost } from '~/types/contentful'
import { getBasicMetas } from '~/utils/metas'

export async function loader({ request, context }: LoaderFunctionArgs) {
    const searchParams = new URL(request.url).searchParams

    const page = searchParams.get('page')
        ? parseInt(searchParams.get('page')!)
        : 0
    const category = searchParams.get('category')

    const postsCount = await Posts.count(
        getContentfulAuthEnvVariables(context),
        category ? [category!] : []
    )
    const hasNext = postsCount > page * 8 + 8

    const posts = await Posts.all(
        8,
        page * 8,
        getContentfulAuthEnvVariables(context),
        category ? [category!] : []
    )
        .appendHeaderImgUrls()
        .formatDates()
        .get()

    const allPosts = await Posts.all(
        200,
        0,
        getContentfulAuthEnvVariables(context)
    ).get()

    const allCategories = allPosts
        ?.flatMap((post) => post.categories)
        .filter(Boolean)
    const categories = [...new Set(allCategories)]?.sort()

    return {
        posts,
        categories,
        page,
        hasNext,
        category,
    }
}

export const meta: MetaFunction = () => {
    return [
        ...getBasicMetas({
            title: `${SITE_BLOG_TITLE}`,
            description: SITE_BLOG_DESCRIPTION,
        }),
    ]
}

export default function BlogPage() {
    const { posts, categories, category, page, hasNext } =
        useLoaderData<typeof loader>()

    return (
        <SidebarLayout.Root>
            <SidebarLayout.Left>
                <Container className="space-y-5">
                    {(hasNext || page > 0) && (
                        <div className="flex items-center gap-x-3">
                            <Link
                                className={cn(
                                    page < 1 && 'pointer-events-none'
                                )}
                                to={`?page=${page - 1}${category ? `&category=${category}` : ''}`}
                            >
                                <ChevronLeft
                                    className={cn(
                                        'size-4',
                                        page < 1 && 'text-gray-300'
                                    )}
                                />
                            </Link>
                            <span className="text-sm">{page + 1}</span>
                            <Link
                                className={cn(
                                    !hasNext && 'pointer-events-none'
                                )}
                                to={`?page=${page + 1}${category ? `&category=${category}` : ''}`}
                            >
                                <ChevronRight
                                    className={cn(
                                        'size-4',
                                        !hasNext && 'text-gray-300'
                                    )}
                                />
                            </Link>
                        </div>
                    )}
                    <SelectableCategoriesGroup
                        categoryType="blog"
                        selected={category as string}
                        categories={categories}
                    />

                    <hr className="!border-[#E4E4E4]" />
                    <BlogPostsGroup
                        posts={
                            posts?.map((post) => {
                                return {
                                    ...post,
                                    slug: `/blog/${post.slug}`,
                                }
                            }) as IBlogPost[]
                        }
                    />
                </Container>
            </SidebarLayout.Left>
            <SidebarLayout.Right>
                <SidebarLayout.UserPart />
            </SidebarLayout.Right>
        </SidebarLayout.Root>
    )
}
