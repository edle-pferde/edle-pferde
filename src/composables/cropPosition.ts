const positionClasses: Record<string, string> = {
  "top-left": "object-top-left",
  top: "object-top",
  "top-right": "object-top-right",
  left: "object-left",
  center: "object-center",
  right: "object-right",
  "bottom-left": "object-bottom-left",
  bottom: "object-bottom",
  "bottom-right": "object-bottom-right",
}

/** Maps a crop-position value to its `object-*` Tailwind class (defaults to center). */
export function cropPositionClass(position: string | null | undefined): string {
  return position ? positionClasses[position] ?? "object-center" : "object-center"
}

/** Same mapping, but for the first item of a gallery (`first:object-*`). */
export function firstCropPositionClass(position: string | null | undefined): string {
  return cropPositionClass(position).replace("object-", "first:object-")
}
