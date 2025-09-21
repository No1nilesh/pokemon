import { useSelector } from "react-redux";
import CustomCard from "../../../components/CustomCard";
import PropTypes from 'prop-types';
import { Skeleton } from "../../../components/ui/skeleton";
import { Badge } from "../../../components/ui/badge";
import { colorOnType } from "../../../../utils/utils";

export default function NameCard({ currentPokemon, evolutionCount, isLoading }) {
    const { loading } = useSelector(state => state.pokemon)
    return (
        <CustomCard className="w-full lg:w-auto flex flex-col gap-2">
            {isLoading ? <div className="text-card uppercase text-3xl font-semibold">
                {currentPokemon.name}
            </div> : <Skeleton className='h-9 w-full' />}

            <div className="grid grid-cols-2 gap-y-2 gap-x-8">
                <div className="flex gap-2 uppercase items-center">
                    <span className="text-indigo-600">Type</span>
                    {isLoading ? currentPokemon?.types?.map(type => <Badge variant='type' key={type} className={colorOnType[type]}>{type}</Badge>) : <Skeleton className='h-5 w-full' />}
                </div>

                <div className="flex gap-2 uppercase items-center">
                    <span className="text-red-500">Evolution</span>
                    {(!loading.evolution || isLoading) ?
                        <span className="text-card">{evolutionCount}</span> :
                        <Skeleton className='h-5 w-full' />}
                </div>

                <div className="flex gap-2 uppercase items-center">
                    <span className="text-indigo-600">Height</span>
                    {isLoading ? <span className="text-card">{currentPokemon?.height / 10} M</span> : <Skeleton className='h-5 w-full' />}
                </div>

                <div className="flex gap-2 uppercase items-center">
                    <span className="text-indigo-600">Weight</span>
                    {isLoading ? <span className="text-card">{currentPokemon?.weight / 10} KG</span> : <Skeleton className='h-5 w-full' />}
                </div>
            </div>

        </CustomCard>
    )
};

NameCard.propTypes = {
    currentPokemon: PropTypes.object.isRequired,
    evolutionCount: PropTypes.number,
    isLoading: PropTypes.bool.isRequired
}