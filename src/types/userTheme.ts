export type BackgroundModeType = "white" | "black";
export type HighlightModeType = "purple" | "green" | "orange" | "blue";
export type IconColorType = "purple" | "green" | "orange" | "blue";

export interface UserTheme {
    id: string,
    userId: string,
    backgroundMode: BackgroundModeType,
    highlightMode: HighlightModeType,
    iconColor: IconColorType,
}