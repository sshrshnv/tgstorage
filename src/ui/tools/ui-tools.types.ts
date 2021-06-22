// [data: ImageData, topX: number, topY: number, width: number, height: number, radius: number]
export type UITools = {
  processImageDataRGB(
    data: ImageData,
    topX: number,
    topY: number,
    width: number,
    height: number,
    radius: number
  ): Promise<ImageData>
}
