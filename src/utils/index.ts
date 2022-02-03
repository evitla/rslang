export const getAll = async <T>(url: string, queryParams = ''): Promise<T> => {
  const response = await fetch(`${url}${queryParams}`);
  const data = await response.json();
  return data;
};

export const playAudio = (src: string) => {
  return new Promise((res) => {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();

    audio.onended = () => {
      audio.currentTime = 0;
      res('ended');
    };
  });
};
