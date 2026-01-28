import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Palette } from "lucide-react";
import { BG_COLORS, TEXT_COLORS } from "@/lib/utils";

type ColorPopoverProps = {
  color: [string, string];
  setColor: (color: [string, string]) => void;
  onSave: () => void;
  initialColor: [string, string];
};

export function ColorPopover({
  color,
  setColor,
  onSave,
  initialColor = ["yellow", "black"],
}: ColorPopoverProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="h-7 w-7 p-0 rounded-md hover:bg-black/8 dark:hover:bg-white/10 transition-all"
          title="Change colors"
        >
          <Palette className="w-3.5 h-3.5" strokeWidth={2.5} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 z-1001 border-border shadow-lg">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold mb-3" style={{ fontFamily: 'var(--font-body)' }}>Background Color</p>
            <div className="grid grid-cols-5 gap-2">
              {BG_COLORS.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setColor([bg, color[1]])}
                  className={`w-9 h-9 rounded-lg border-2 transition-all hover:scale-110 ${
                    color[0] === bg ? "ring-2 ring-primary ring-offset-2" : "border-border hover:border-primary/50"
                  }`}
                  style={{ backgroundColor: bg }}
                  title={bg}
                />
              ))}
            </div>
          </div>
          <div className="h-px bg-border"></div>
          <div>
            <p className="text-sm font-semibold mb-3" style={{ fontFamily: 'var(--font-body)' }}>Text Color</p>
            <div className="grid grid-cols-5 gap-2">
              {TEXT_COLORS.map((txt) => (
                <button
                  key={txt}
                  onClick={() => setColor([color[0], txt])}
                  className={`w-9 h-9 rounded-lg border-2 transition-all hover:scale-110 ${
                    color[1] === txt ? "ring-2 ring-primary ring-offset-2" : "border-border hover:border-primary/50"
                  }`}
                  style={{ backgroundColor: txt }}
                  title={txt}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between w-full pt-2 gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setColor(initialColor);
                setPopoverOpen(false);
              }}
              className="flex-1 border-border hover:bg-accent/50"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSave();
                setPopoverOpen(false);
              }}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
