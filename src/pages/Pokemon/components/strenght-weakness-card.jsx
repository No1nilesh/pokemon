import CustomCard from "../../../components/CustomCard";
import PropTypes from "prop-types";
import { Skeleton } from "../../../components/ui/skeleton";
import { PokemonType } from "../../../components/TypeIcons";
import { Badge } from "../../../components/ui/badge";
import { colorOnType } from "../../../../utils/utils";

export default function StrengthWeaknessCard({ description, isLoading, displayType = 'icon' }) {
    return (
        <CustomCard className="min-w-96 min-h-44 p-4">
            <div className="flex flex-col divide-y divide-white/10">
                {Object.keys(description).map((title, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-3 py-2 first:pt-0 last:pb-0"
                    >
                        <div className="w-28 text-card font-semibold uppercase tracking-wide text-sm shrink-0">
                            {title}:
                        </div>

                        {isLoading ? (
                            <div className="flex flex-wrap gap-2">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Skeleton
                                        key={i}
                                        className={`h-7 ${displayType === 'icon' ? 'rounded-full w-7' : 'rounded-md w-16'} bg-white/20`}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {description[title].map((type, i) => (
                                    displayType === 'icon' ? < PokemonType
                                        type={type}
                                        key={i}
                                        shadow={false}
                                        className="w-7 h-7 flex-shrink-0"
                                    /> : <Badge key={type} className={colorOnType[type]}>{type}</Badge>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </CustomCard>
    );
}

StrengthWeaknessCard.propTypes = {
    description: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    displayType: PropTypes.string
};
