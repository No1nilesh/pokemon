import AudioPlayer from "../../../components/AudioPlayer";
import { Skeleton } from "../../../components/ui/skeleton";
import PropTypes from 'prop-types';

export default function ImageBox({ currentPokemon, isLoading }) {
    return (
        isLoading ? (<>
            <img src={currentPokemon.image} alt={`${currentPokemon.name} sprite`} className="w-full h-auto object-contain drop-shadow-2xl" />
            <AudioPlayer sound={currentPokemon.sound} autoPlay={true} />
        </>) : <Skeleton className={'w-full aspect-square rounded-full'} />
    )
};

ImageBox.propTypes = {
    currentPokemon: PropTypes.object.isRequired,
    isLoading : PropTypes.bool.isRequired
}