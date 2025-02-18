import { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { getContentfulAuthEnvVariables } from '~/actions/contentful'
import Posts from '~/actions/posts'
import Resources from '~/actions/resources'
import BlogPostsGroup from '~/components/organisms/BlogPostsGroup'
import ResourcesLinkGroup from '~/components/organisms/ResourcesLinkGroup'
import ServicesButtonGroup from '~/components/organisms/ServicesButtonGroup'
import Container from '~/components/templates/Container'
import SidebarLayout from '~/components/templates/SidebarLayout'
import { SITE_DESCRIPTION, SITE_TITLE } from '~/consts'
import { IBlogPost, IResource } from '~/types/contentful'
import MetaUtils from '~/utils/metas'

export async function loader({ context }: LoaderFunctionArgs) {
    const posts = await Posts.latest(4, getContentfulAuthEnvVariables(context))
        .appendHeaderImgUrls()
        .formatDates()
        .get()

    const resources = await Resources.latest(
        8,
        getContentfulAuthEnvVariables(context)
    )
        .formatDates()
        .get()

    return {
        posts,
        resources,
    }
}

export const meta: MetaFunction = () => {
    return [
        ...MetaUtils.getBasic({
            title: `${SITE_TITLE}`,
            description: SITE_DESCRIPTION,
        }),
        {
            'script:ld+json': [MetaUtils.getPersonJsonLd()],
        },
    ]
}

export default function IndexPage() {
    const { posts, resources } = useLoaderData<typeof loader>()

    return (
        <SidebarLayout.Root>
            <SidebarLayout.Left>
                <Container className="space-y-8">
                    <div className="w-full space-y-5">
                        <h1 className="text-4xl font-bold tracking-tighter">
                            Psicólogo Clínico en Málaga Cita Online y Presencial
                        </h1>
                        <div className="space-y-5">
                            <div>
                                ¿Estás buscando un <b>Psicólogo en Málaga?</b>
                            </div>
                            <div>
                                ¿Alguien que realmente pueda ayudarte a sentirte
                                mejor en tu día a día y a darle un giro al timón
                                de tu vida?
                            </div>
                            <div>
                                Soy Carlos, Psicólogo Clínico por la Universidad
                                de Málaga, y estoy especializado en{' '}
                                <b>terapias efectivas y de corta duración</b>
                                &nbsp; que te permitirán convertirte en tu mejor
                                yo.
                            </div>

                            <div>
                                <div>Mi enfoque es directo y honesto:</div>
                                <ul className="mt-2 list-disc px-7">
                                    <li>
                                        Si creo que no necesitas tratamiento te
                                        lo diré
                                    </li>
                                    <li>
                                        {' '}
                                        Si creo que no puedo ayudarte te
                                        derivaré a un compañero
                                    </li>
                                    <li>
                                        {' '}
                                        Si creo que ya no me necesitas, y tú
                                        estás de acuerdo, dejaremos de tener
                                        sesiones.
                                    </li>
                                </ul>
                            </div>
                            <div>¿Trato?</div>
                            <div>
                                Ofrezco sesiones de Psicoterapia tanto Online
                                como Presenciales en mi{' '}
                                <b>clínica en el centro de Málaga</b>.
                            </div>
                            <div>
                                Anímate a cuidar tu salud mental, la{' '}
                                <b>primera consulta es GRATUITA</b>.
                            </div>
                        </div>
                    </div>
                    <div className="w-full space-y-5">
                        <h2 className="text-3xl font-bold tracking-tighter">
                            ¿Cómo te puedo ayudar? Estas son mis especialidades
                        </h2>
                        <ServicesButtonGroup
                            labels={[
                                'Ansiedad',
                                'Depresión',
                                'TOC',
                                'Autoestima',
                                'Rehabilitación Cognitiva',
                                'Adicciones',
                                'Superación Duelo',
                                'Orientación Profesional',
                                'Hipnosis',
                                'Mindfulness',
                            ]}
                        />
                    </div>
                    <div className="w-full space-y-5">
                        <h2 className="text-3xl font-bold tracking-tighter">
                            Recursos para el paciente
                        </h2>
                        <ResourcesLinkGroup
                            resources={resources as IResource[]}
                        />
                    </div>
                    <div className="w-full space-y-5">
                        <h2 className="text-3xl font-bold tracking-tighter">
                            Lo último que he escrito
                        </h2>
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
                    </div>
                </Container>
            </SidebarLayout.Left>
            <SidebarLayout.Right>
                <SidebarLayout.UserPart />
            </SidebarLayout.Right>
        </SidebarLayout.Root>
    )
}
