"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
  
export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // When mounted on client, now we can show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      className=" flex rounded-full hover:opacity-80 justify-center items-center    "
       onClick={() =>
         theme === "dark" ? setTheme("light") : setTheme("dark")
       }
    > 
       {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="h-[1.2rem]  text-white   w-[1.2rem] rotate-0 scale-100 transition-all" />
      )}   
      </button>
  );
}
