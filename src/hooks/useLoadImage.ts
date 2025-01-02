export const useLoadImage = async (e: any) => {
  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((res) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        res(base64);
      };
      reader.readAsDataURL(file);
    });
  };
  const file = e.target.files ? e.target.files[0] : null;
  let imagebase64 = "";
  if (file) {
    try {
      imagebase64 = await readFileAsBase64(file);
    } catch (error) {
      console.error("Error al leer el archivo:", error);
    }
  }
  return imagebase64;
};
