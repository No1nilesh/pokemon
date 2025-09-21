import { Icons, TypeColors } from "../constant";
import PropTypes from 'prop-types'
import CustomTooltip from "./CustomTooltip";
export function PokemonType({ type, className, shadow = true }) {
    const icon = Icons[type];
    const color = TypeColors[type] || "#000";
    return (
        <CustomTooltip message={type}>
            <div
                className={`rounded-full flex justify-center items-center transition-colors aspect-square cursor-pointer ${className}`}
                style={{
                    background: color,
                    boxShadow: shadow ? `0 0 20px ${color}` : 'unset',
                }}
            >
                <img src={icon} alt={type} style={{ width: "60%", height: "60%" }} />
            </div>
        </CustomTooltip>

    );
}

PokemonType.propTypes = {
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    shadow: PropTypes.bool
}

