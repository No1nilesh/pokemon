export const colorOnType = {
    normal: "bg-gray-400 text-gray-100 hover:bg-gray-300",
    fire: "bg-red-800 text-red-300 hover:bg-red-700",
    water: "bg-blue-600 text-blue-300 hover:bg-blue-500",
    grass: "bg-green-600 text-green-300 hover:bg-green-500",
    electric: "bg-yellow-400 text-yellow-900 hover:bg-yellow-300",
    ice: "bg-cyan-300 text-cyan-900 hover:bg-cyan-200",
    fighting: "bg-orange-800 text-orange-200 hover:bg-orange-700",
    poison: "bg-purple-900 text-purple-300 hover:bg-purple-800",
    ground: "bg-yellow-800 text-yellow-200 hover:bg-yellow-700",
    flying: "bg-indigo-400 text-indigo-900 hover:bg-indigo-300",
    psychic: "bg-pink-600 text-pink-200 hover:bg-pink-500",
    bug: "bg-lime-700 text-lime-200 hover:bg-lime-600",
    rock: "bg-stone-700 text-stone-200 hover:bg-stone-600",
    ghost: "bg-violet-800 text-violet-300 hover:bg-violet-700",
    dragon: "bg-indigo-800 text-indigo-300 hover:bg-indigo-700",
    dark: "bg-gray-900 text-gray-300 hover:bg-gray-800",
    steel: "bg-slate-600 text-slate-200 hover:bg-slate-500",
    fairy: "bg-pink-300 text-pink-800 hover:bg-pink-200",
}



export const pTypes = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
];



//name Special-attack
export const formatText = (text) => {
    if (!text.includes('-')) return text.charAt(0).toUpperCase() + text.slice(1);
    return text
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const miniName = (name) => {
    if (!name.includes('-')) return name.toUpperCase();
    return name
        .split('-')
        .map(word => word[0].toUpperCase())
        .join('');
};
