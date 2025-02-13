import { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { getContentfulAuthEnvVariables } from '~/actions/contentful'
import Posts from '~/actions/posts'
import Resources from '~/actions/resources'
import BlogPostsGroup from '~/components/organisms/BlogPostsGroup'
import ResourcesLinkGroup from '~/components/organisms/ResourcesLinkGroup'
import SelectableCategoriesGroup from '~/components/organisms/SelectableCategoriesGroup'
import Container from '~/components/templates/Container'
import SidebarLayout from '~/components/templates/SidebarLayout'
import { IBlogPost } from '~/types/contentful'
import { getBasicMetas } from '~/utils/metas'

// @ts-expect-error idk
export const meta: MetaFunction = (payload: { data: { post: IBlogPost } }) => {
    const { post } = payload.data

    return [
        ...getBasicMetas({
            title: post.seoTitle,
            description: post.seoDescription,
            image: `https:${post.headerImgUrl}`,
        }),
    ]
}

export async function loader({ request, context }: LoaderFunctionArgs) {
    const slug = new URL(request.url).pathname.split('/').pop()
    const post = (
        (await Posts.getBySlug(slug!, getContentfulAuthEnvVariables(context))
            .appendHeaderImgUrls()
            .formatDates()
            .get()) as IBlogPost[]
    )[0]

    const postsRelatedByCategory = await Posts.getRelatedByCategory(
        post.categories,
        post.slug!,
        getContentfulAuthEnvVariables(context)
    )
        .appendHeaderImgUrls()
        .formatDates()
        .get()

    const resourcesRelatedByCategory = await Resources.getRelatedByCategory(
        post.categories,
        'null',
        getContentfulAuthEnvVariables(context)
    ).get()

    return { post, postsRelatedByCategory, resourcesRelatedByCategory }
}

export default function BlogPostPage() {
    const { post, postsRelatedByCategory, resourcesRelatedByCategory } =
        useLoaderData<typeof loader>()

    return (
        <SidebarLayout.Root>
            <SidebarLayout.Left>
                <Container className="space-y-5">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter">
                            {post.seoTitle}
                        </h1>
                        <p className="mt-2 text-gray-600">
                            {post.seoDescription}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-x-2">
                            <SelectableCategoriesGroup
                                categories={post.categories}
                                categoryType="blog"
                            />
                        </div>
                    </div>
                    {resourcesRelatedByCategory &&
                        resourcesRelatedByCategory.length > 0 && (
                            <div className="space-y-5">
                                <hr className="!border-[#E4E4E4]" />
                                <h4 className="text-xl font-bold tracking-tighter">
                                    Recursos en esta categoría
                                </h4>
                                <ResourcesLinkGroup
                                    resources={resourcesRelatedByCategory}
                                />
                            </div>
                        )}
                    <hr className="!border-[#E4E4E4]" />

                    <article className="prose-dark prose w-full !max-w-none prose-h2:tracking-tighter prose-h3:tracking-tighter prose-h4:tracking-tighter prose-img:w-full prose-img:rounded-lg [&_h2:first-of-type]:mt-0">
                        <Markdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeSlug, rehypeRaw]}
                        >
                            {(post as unknown as IBlogPost).content}
                        </Markdown>
                    </article>
                    {postsRelatedByCategory &&
                        postsRelatedByCategory.length > 0 && (
                            <div className="space-y-5">
                                <hr className="!border-[#E4E4E4]" />
                                <h4 className="text-xl font-bold tracking-tighter">
                                    También en esta categoría
                                </h4>
                                <BlogPostsGroup
                                    showCategories={false}
                                    posts={
                                        postsRelatedByCategory as IBlogPost[]
                                    }
                                />
                            </div>
                        )}
                </Container>
            </SidebarLayout.Left>
            <SidebarLayout.Right>
                <SidebarLayout.UserPart />
            </SidebarLayout.Right>
        </SidebarLayout.Root>
    )
}
