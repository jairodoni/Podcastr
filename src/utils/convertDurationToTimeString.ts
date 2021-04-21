export function convertDurationToTimeString(duration: number) {
  //Math.floor arredonda o numero para baixo
  const hours = Math.floor(duration / 3600);
  // calcula o resto da divisão do tempo em minutos
  const minutes = Math.floor((duration % 3600) / 60);
  // calcula o resto da divisão do tempo em segundos
  const seconds = duration % 60;

  // Se existir somente um caracter o map adiciona um 0 completando 2 digitos
  const timeString = [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");

  return timeString;
}
