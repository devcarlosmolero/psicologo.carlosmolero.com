import { Link } from '@remix-run/react'
import { Fragment, useState } from 'react'
import Hamburger from '../molecules/Hamburguer'
import SocialIcons from '../molecules/SocialIcons'
import SidebarLayout from '../templates/SidebarLayout'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Fragment>
            <nav className="fixed z-10 flex h-[80px] w-full items-center bg-white px-5 py-2 shadow md:hidden">
                <div className="w-full">
                    <Link to={'/'}>
                        <img
                            alt="Carlos Molero"
                            className="h-[50px] w-[50px] rounded-full"
                            src="/carlos-molero.png"
                        />
                    </Link>
                </div>
                <div>
                    <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
            </nav>
            {isOpen && (
                <div className="fixed z-10 mt-[80px] h-[100vh] w-full space-y-5 bg-white px-5 md:hidden">
                    <hr className="my-3 !border-[#E4E4E4]" />
                    <SidebarLayout.BookButton />
                    <SidebarLayout.NavLinks />
                    <hr className="mb-3 !border-[#E4E4E4]" />
                    <SidebarLayout.Map />
                    <SocialIcons />
                </div>
            )}
        </Fragment>
    )
}
