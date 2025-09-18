
export const colorOnType = (type) => {
    switch (type) {
        case "grass":
            return "bg-green-600 text-green-300";
        case "fire":
            return "bg-red-800 text-red-300";
        case "bug":
            return "bg-green-700 text-green-300";
        case "water":
            return "bg-blue-600 text-blue-300";
        case "poison":
            return "bg-purple-900 text-purple-300";
        case "electric":
            return "bg-yellow-400 text-brown-200";
        case "ground":
            return "bg-brown-800 text-brown-200";
        case "fairy":
            return "bg-pink-300 text-pink-800";
        case "rock":
            return "bg-gray-500 text-pink-200";
        default:
            return "bg-blue-100";
    }
}