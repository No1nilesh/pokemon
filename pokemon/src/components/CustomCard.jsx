
import PropTypes from "prop-types"

export default function CustomCard({ children, className }) {
    return (
        <div className={` rounded-2xl overflow-hidden bg-primary-card h-fit min-w-80 max-w-md p-4 space-y-2 text-left relative before:content[''] before:rounded-tl-sm before:h-1 before:w-1/3 before:bg-card-border before:absolute before:top-0 before:left-0 ${className}`}>
            {children}
        </div>
    )
};

CustomCard.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}