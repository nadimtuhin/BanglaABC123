export interface GameItem {
  id: number;
  content: string;
  type: "english" | "bengali";
  isMatched: boolean;
  pronunciation?: string;
  animalIcon?: React.ElementType;
  colorTheme: { primary: string; secondary: string; accent: string };
} 