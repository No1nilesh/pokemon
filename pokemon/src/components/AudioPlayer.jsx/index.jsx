export default function AudioPlayer({sound}){

    return (
    <audio controls  className="hidden">
    <source src={sound} type="audio/ogg" />
    </audio>
    )};