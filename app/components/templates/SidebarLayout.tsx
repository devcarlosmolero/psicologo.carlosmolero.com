import { BookOpen, Calendar, ChevronRight, Folder, Home } from 'lucide-react'
import { Fragment, ReactNode } from 'react'
import { Github } from 'react-bootstrap-icons'
import Button from '../atoms/Button'
import SocialIcons from '../molecules/SocialIcons'

const navLinks = [
    {
        title: 'Inicio',
        url: '/',
        icon: (
            <Home className="size-5 duration-500 group-hover:translate-x-3" />
        ),
    },
    {
        title: 'Blog',
        url: '/blog',
        icon: (
            <BookOpen className="size-5 duration-500 group-hover:translate-x-3" />
        ),
    },
    {
        title: 'Recursos',
        url: '/resources',
        icon: (
            <Folder className="size-5 duration-500 group-hover:translate-x-3" />
        ),
    },
]

function Root({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-[100vh] items-center justify-center bg-gray-100">
            <div className="min-h-[100vh] w-[1366px] rounded-lg bg-white xl:h-[768px] xl:min-h-[768px] xl:shadow-lg">
                <div className="flex h-full w-full">{children}</div>
            </div>
        </div>
    )
}

function Left({ children }: { children: ReactNode }) {
    return (
        <div className="flex w-full flex-col overflow-y-scroll py-6">
            {children}
            <div className="px-5">
                <hr className="my-5 !border-[#E4E4E4]" />
                <div className="flex items-center">
                    <div className="flex w-full flex-col items-start gap-5 md:flex-row">
                        <div className="w-full flex-col">
                            <Github className="mb-2 size-5 text-gray-600" />
                            <p className="text-xs text-gray-600">
                                Carlos Molero. Todos los derechos reservados.
                            </p>
                            <div className="group mt-1 flex w-full flex-col items-start gap-x-2 gap-y-2 md:flex-row md:items-center">
                                <a
                                    target="_blank"
                                    className="text-xs text-gray-600 underline underline-offset-4 group-hover:text-black"
                                    href={
                                        'https://github.com/devcarlosmolero/psicologo.carlosmolero.com'
                                    }
                                    rel="noreferrer"
                                >
                                    El código de este sitio es Open Source y
                                    puede ser consultado en Github.
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Right({ children }: { children: ReactNode }) {
    return (
        <div className="hidden min-h-[100vh] w-auto flex-col gap-y-5 border-l border-[#E4E4E4]/50 px-5 py-6 shadow md:flex lg:shadow-none xl:min-h-full">
            {children}
        </div>
    )
}

function BookButton() {
    return (
        <Button
            url="https://cal.com/psicarlosmolero/psicoterapia?duration=60"
            target="_blank"
            variant="primary"
        >
            <div className="flex w-full items-center gap-x-3 !py-1">
                <div className="rounded-md bg-primary-light p-2">
                    <Calendar className="size-5 text-primary" />
                </div>
                <p className="w-full text-start">Primera Cita GRATUITA</p>
                <ChevronRight className="size-6 text-white" />
            </div>
        </Button>
    )
}

function NavLinks() {
    return (
        <Fragment>
            {' '}
            {navLinks.map(({ url, title, icon }) => {
                return (
                    <Button
                        className="group !py-0"
                        url={url}
                        variant="ghost"
                        target="_self"
                        key={title}
                    >
                        {icon}

                        <p className="w-full text-start text-sm duration-500 group-hover:translate-x-3">
                            {title}
                        </p>
                        <ChevronRight className="size-5 duration-500 group-hover:translate-x-3" />
                    </Button>
                )
            })}
        </Fragment>
    )
}

function Map() {
    return (
        <div className="aspect-h-9 aspect-w-16">
            <iframe
                title="#"
                className="rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.2410530027732!2d-4.427079288015279!3d36.71677157215534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72f796b786aaab%3A0x1f7a5ecf166a3dbe!2sAlameda%20Principal%2C%2045%2C%201B%2C%20Distrito%20Centro%2C%2029001%20M%C3%A1laga!5e0!3m2!1ses!2ses!4v1739276245751!5m2!1ses!2ses"
                width="600"
                height="450"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>{' '}
        </div>
    )
}

function UserPart() {
    return (
        <Fragment>
            <div className="flex min-w-[250px] gap-5 rounded-lg p-5 shadow-lg">
                <img
                    alt="Carlos Molero"
                    className="max-h-[70px] min-h-[70px] min-w-[70px] max-w-[70px]"
                    src={'/carlos-molero.png'}
                />
                <div>
                    <p className="text-lg">Carlos Molero</p>
                    <p className="text-sm">
                        Psicólogo Clínico Cognitivo-Conductual (TCC)
                    </p>
                </div>
            </div>
            <BookButton />
            <NavLinks />
            <hr className="!border-[#E4E4E4]" />
            <Map />
            <SocialIcons />
        </Fragment>
    )
}

const SidebarLayout = {
    Root,
    Left,
    Right,
    NavLinks,
    BookButton,
    Map,
    UserPart,
}

export default SidebarLayout
