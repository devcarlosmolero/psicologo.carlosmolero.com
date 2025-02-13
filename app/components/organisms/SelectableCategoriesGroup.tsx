import { Link } from '@remix-run/react'
import SelectableBadge from '../atoms/SelectableBadge'

export default function SelectableCategoriesGroup({
    categories,
    categoryType,
    selected,
}: {
    categories: string[]
    categoryType: 'resources' | 'blog'
    selected?: string
}) {
    return (
        <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
                <Link
                    key={category}
                    to={
                        category === selected
                            ? `/${categoryType}`
                            : `/${categoryType}?category=${category}`
                    }
                >
                    <SelectableBadge
                        variant={selected === category ? 'dark' : 'ghost'}
                    >
                        {category}
                    </SelectableBadge>
                </Link>
            ))}
        </div>
    )
}
