import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useThemeContext } from "./providers/theme-context";

export function ThemeToggle() {
  const { toggleTheme } = useThemeContext();

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-9 w-9 p-0 hover:bg-blue-600 hover:text-white"
      onClick={toggleTheme}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
