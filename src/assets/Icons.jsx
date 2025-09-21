
export const DescriptionIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" {...props}
    >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M4 4h16v16H4z" />
        <path d="M8 8h8M8 12h6" />
    </svg>
)

export const MovesIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" {...props}
    >
        <path d="M14.5 17.5L3 6l3-3 11.5 11.5" />
        <path d="M12 19l2.5-2.5" />
        <path d="M17 22l5-5" />
    </svg>
)

export const EvolutionIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" {...props}
    >
        {/* Pokeball */}
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2" />
        <path d="M3 12h6M15 12h6" />
        {/* Arrows around */}
        <path d="M8 3L6 5l2 2" />
        <path d="M16 21l2-2-2-2" />
    </svg>
)
