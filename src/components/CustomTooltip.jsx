import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import PropTypes from 'prop-types'
export default function CustomTooltip({ children, message }) {
    return (
        <Tooltip variant>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent>
                {message}
            </TooltipContent>
        </Tooltip>
    )
};

CustomTooltip.propTypes = {
    children: PropTypes.node.isRequired,
    message: PropTypes.string.isRequired
}
