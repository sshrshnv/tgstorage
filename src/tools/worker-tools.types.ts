export type WorkerTools = {
  processBluredImageData(
    data: ImageData,
    topX: number,
    topY: number,
    width: number,
    height: number,
    radius: number
  ): Promise<ImageData>
}
