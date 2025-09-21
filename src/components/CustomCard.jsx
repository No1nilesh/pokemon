
import PropTypes from "prop-types"
import {
    Card
} from "@/components/ui/card"
import { cn } from "../lib/utils"
export default function CustomCard({ children, className }) {
    return (

        <Card className={cn("rounded-2xl min-w-80 overflow-hidden text-left p-4 bg-primary-card relative before:content[''] before:rounded-tl-sm before:h-1 before:w-1/3 before:bg-card-border before:absolute before:top-0 before:left-0", className)}>
            {children}
        </Card>
    )
};

CustomCard.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}

