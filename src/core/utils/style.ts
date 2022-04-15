class StyleUtil {
  constructor() {}

  pxToRem(px: number): string {
    return `${px / 16}rem`;
  }
}

export default StyleUtil;
