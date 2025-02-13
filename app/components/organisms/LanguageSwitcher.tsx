const LanguageSwitcher = ({ currentPathname }: { currentPathname: string }) => {
    const languages = [
        { path: '', flag: 'spain.svg', alt: 'Español' },
        { path: '/en', flag: 'usa.svg', alt: 'English' },
        { path: '/zh', flag: 'china.svg', alt: '中文' },
    ]

    return (
        <div className="bottom-5 right-5 flex w-full gap-2 md:w-fit md:items-center">
            {languages.map((lang, index) => (
                <a
                    href={`${lang.path}${currentPathname}`}
                    key={index}
                    className={`h-6 w-6 rounded-full border-2 transition-all hover:scale-110`}
                >
                    <img
                        src={`/${lang.flag}`}
                        alt={lang.alt}
                        className="h-full w-full rounded-full object-cover"
                    />
                </a>
            ))}
        </div>
    )
}

export default LanguageSwitcher
