import { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import TEST_CONFIGS from 'testConfigs'
import { getContentfulAuthEnvVariables } from '~/actions/contentful'
import Resources from '~/actions/resources'
import Test from '~/components/organisms/Test'
import Container from '~/components/templates/Container'
import SidebarLayout from '~/components/templates/SidebarLayout'
import { IResource } from '~/types/contentful'
import MetaUtils from '~/utils/metas'

export async function loader({ context, request }: LoaderFunctionArgs) {
    const slug = new URL(request.url).pathname.split('/').pop()

    const resource = (
        (await Resources.getBySlug(
            slug!,
            getContentfulAuthEnvVariables(context)
        )
            .formatDates()
            .get()) as IResource[]
    )[0]

    return { resource }
}

//@ts-expect-error idk
export const meta: MetaFunction = (payload: {
    data: { resource: IResource }
}) => {
    const { resource } = payload.data

    return [
        ...MetaUtils.getBasic({
            title: resource.seoTitle,
            description: resource.seoDescription,
        }),
    ]
}

export default function TestPage() {
    const { resource } = useLoaderData<typeof loader>()
    return (
        <SidebarLayout.Root>
            <SidebarLayout.Left>
                <Container className="space-y-5">
                    <Test
                        resource={resource}
                        //@ts-expect-error idk
                        config={TEST_CONFIGS[resource.slug!]}
                    />
                </Container>
            </SidebarLayout.Left>
            <SidebarLayout.Right>
                <SidebarLayout.UserPart />
            </SidebarLayout.Right>
        </SidebarLayout.Root>
    )
}
