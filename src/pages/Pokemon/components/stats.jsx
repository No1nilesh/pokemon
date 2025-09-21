import PropTypes from 'prop-types';
import StatsSkeleton from '../../../components/Skeletons/stats-skeleton';
import { miniName, formatText } from '../../../../utils/utils'
import CustomTooltip from '../../../components/CustomTooltip';

export default function Stats({ currentPokemon, isLoading }) {
    return (
        <div className="flex p-4 items-end gap-2 min-h-60">
            {isLoading ?
                currentPokemon?.stats?.map((stat) => (
                    <CustomTooltip message={formatText(stat.name)} key={stat.name}>
                        <div className="text-card flex flex-col gap-2 cursor-pointer" >
                            <div className="stat-bar flex flex-col-reverse justify-center items-center gap-1">
                                {Array.from({ length: Math.floor(stat.base_stat / 10) }).map((_, index) => (
                                    <div key={index} className="bg-card-border w-10 h-2 opacity-80"></div>
                                ))}
                                <span>{stat.base_stat}</span>
                            </div>
                            <div className="uppercase text-xs text-center">{miniName(stat.name)}</div>
                        </div>
                    </CustomTooltip>
                )) : <StatsSkeleton />}
        </div>
    )
};


Stats.propTypes = {
    currentPokemon: PropTypes.object.isRequired,
    isLoading: PropTypes.bool
}