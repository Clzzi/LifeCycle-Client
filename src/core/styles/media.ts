import { mediaSizes } from 'src/core/constants/media.constants';

type SizeLabels = keyof typeof mediaSizes;
type Media = { [key in SizeLabels]: string }; // SizeLabels의 MappedType
const sizeLabels = Object.keys(mediaSizes) as SizeLabels[];

const mediaQuery = (value: number): string =>
  `@media only screen and (max-width: ${value}px)`;

export const medias: Media = sizeLabels.reduce((acc, label) => {
  acc[label] = mediaQuery(mediaSizes[label]);
  return acc;
}, {} as Media);
