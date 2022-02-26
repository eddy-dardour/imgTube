export function ThemeExpander(theme) {
    switch (theme) {
      case "W":
        return "white";
      case "B":
        return "#202020";
      default:
        return "white";
    }
  }
export function ThemeExpanderInversed(theme) {
    switch (theme) {
      case "W":
        return "#202020";
      case "B":
        return "white";
      default:
        return "#202020";
    }
  }

export default function useTheme (theme) {
    const val = ThemeExpander(theme);
    const polval = ThemeExpanderInversed(theme)
    return [ val, polval ];
}