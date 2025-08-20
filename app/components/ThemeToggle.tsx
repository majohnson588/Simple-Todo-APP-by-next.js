"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();


  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  
  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="gap-2">
        {}
      </Button>
    );
  }

  const isDark = theme === "dark" || theme === undefined; 

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="gap-2"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      {isDark ? "Light" : "Dark"} Mode
    </Button>
  );
};

export default ThemeToggle;
