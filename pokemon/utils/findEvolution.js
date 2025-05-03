
export const findEvolution = (evolution, name) => {
    for (const form of evolution) {
      const index = form.indexOf(name);
      if (index >= 0) return index + 1;
    }
  };