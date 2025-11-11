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
          className="h-8 w-8 p-0 hover:bg-black/5"
          title="Change colors"
        >
          <Palette className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 z-1001 mt-12">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-sm font-medium mb-1">Background</p>
            <div className="grid grid-cols-5 gap-2">
              {BG_COLORS.map((bg) => (
                <Button
                  variant="ghost"
                  size="sm"
                  key={bg}
                  onClick={() => setColor([bg, color[1]])}
                  className={`w-6 h-6 rounded-full border ${
                    color[0] === bg ? "ring-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: bg }}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Text</p>
            <div className="grid grid-cols-5 gap-2">
              {TEXT_COLORS.map((txt) => (
                <Button
                  variant="ghost"
                  size="sm"
                  key={txt}
                  onClick={() => setColor([color[0], txt])}
                  className={`w-6 h-6 rounded-full border ${
                    color[1] === txt ? "ring-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: txt }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between w-full mt-2 gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setColor(initialColor);
                setPopoverOpen(false);
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onSave();
                setPopoverOpen(false);
              }}
              className="flex-1"
            >
              Save Colors
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
