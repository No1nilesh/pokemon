
export const findEvolution = (evolution, name) => {
  for (const form of evolution) {
    const index = form.indexOf(name);
    if (index >= 0) return index + 1;
  }
};

export const getEvolutionOrder = (chain) => {
  const path = [];
  const traverse = (chain, currentPath) => {
    currentPath.push(chain.species.name);
    if (chain.evolves_to.length > 0) {
      chain.evolves_to.forEach((evolution) => traverse(evolution, [...currentPath]));
    } else {
      path.push(currentPath);
    }
  };
  traverse(chain, []);
  return path;
};