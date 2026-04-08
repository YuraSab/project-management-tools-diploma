export enum Role {
    Admin = 'admin',
    Manager = 'manager',
    Member = 'member'
}
export enum Theme {
    White = 'white',
    Black = 'black',
}
export enum HighlightColor {
    Purple = 'purple',
    Green = 'green',
    Orange = 'orange',
    Blue = 'blue'
}
export enum IconColor {
    Purple = 'purple',
    Green = 'green',
    Orange = 'orange',
    Blue = 'blue'
}

export interface UserProfile {
    uid: string,
    email: string | null,
    displayName: string,
    photoURL: string,
    role: Role,
    createdAt: string
    reservedMembers: string[],
    theme: Theme,
    iconColor: IconColor,
    highlightColor: HighlightColor,
}

export type ColorPalette = IconColor | HighlightColor | Theme;

export const ThemeSet: Theme[] = [Theme.White, Theme.Black] as const;
export const HighlightColorSet: HighlightColor[] = [HighlightColor.Purple, HighlightColor.Green, HighlightColor.Orange, HighlightColor.Blue] as const;
export const IconColorSet: IconColor[] = [IconColor.Purple, IconColor.Green, IconColor.Orange, IconColor.Blue] as const;