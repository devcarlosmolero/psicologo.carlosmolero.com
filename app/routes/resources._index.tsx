import { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { getContentfulAuthEnvVariables } from '~/actions/contentful'
import Resources from '~/actions/resources'
import ResourcesLinkGroup from '~/components/organisms/ResourcesLinkGroup'
import SelectableCategoriesGroup from '~/components/organisms/SelectableCategoriesGroup'
import Container from '~/components/templates/Container'
import SidebarLayout from '~/components/templates/SidebarLayout'
import { SITE_RESOURCES_DESCRIPTION, SITE_RESOURCES_TITLE } from '~/consts'
import { IResource } from '~/types/contentful'
import MetaUtils from '~/utils/metas'

export async function loader({ context, request }: LoaderFunctionArgs) {
    const searchParams = new URL(request.url).searchParams

    const category = searchParams.get('category')

    const resources = await Resources.all(
        20,
        0,
        getContentfulAuthEnvVariables(context),
        category ? [category!] : []
    )
        .formatDates()
        .get()

    const allResources = await Resources.all(
        200,
        0,
        getContentfulAuthEnvVariables(context)
    ).get()

    const allCategories = allResources
        ?.flatMap((resource) => resource.categories)
        .filter(Boolean)
    const categories = [...new Set(allCategories)]?.sort()

    return {
        resources,
        categories,
        category,
    }
}

export const meta: MetaFunction = () => {
    return [
        ...MetaUtils.getBasic({
            title: `${SITE_RESOURCES_TITLE}`,
            description: SITE_RESOURCES_DESCRIPTION,
        }),
    ]
}

export default function ResourcesPage() {
    const { resources, categories, category } = useLoaderData<typeof loader>()

    return (
        <SidebarLayout.Root>
            <SidebarLayout.Left>
                <Container className="space-y-5">
                    <SelectableCategoriesGroup
                        categoryType="resources"
                        categories={categories}
                        selected={category as string}
                    />
                    <hr className="!border-[#E4E4E4]" />
                    <ResourcesLinkGroup resources={resources as IResource[]} />
                </Container>
            </SidebarLayout.Left>
            <SidebarLayout.Right>
                <SidebarLayout.UserPart />
            </SidebarLayout.Right>
        </SidebarLayout.Root>
    )
}
