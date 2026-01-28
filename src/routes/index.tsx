import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  FileText,
  FolderKanban,
  Maximize2,
  MousePointerClick,
  Palette,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative px-6 pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto animate-in-up">
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-balance tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Your ideas,
              <span className="text-primary hover:text-primary/80 transition-colors">
                {" "}
                organized
              </span>
            </h1>

            <p
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Create, organize, and enhance your thoughts with intelligent
              sticky notes powered by AI. The modern way to capture and develop
              ideas.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
              <Link to="/board/all">
                <Button
                  size="lg"
                  className="text-lg px-10 h-14 rounded-xl font-semibold group shadow-lg bg-primary hover:bg-primary/90 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Get started free
                  <ArrowRight
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    strokeWidth={2.5}
                  />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 h-14 rounded-xl font-semibold border-2 border-border hover:bg-accent/50 transition-all"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Powerful features
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Everything you need to organize your thoughts and boost
              productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#fef9e7] backdrop-blur-sm border-2 border-[#e8dcc4]/50 rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all group">
              <MousePointerClick
                className="w-7 h-7 mb-4 text-[#8b6914] group-hover:scale-110 transition-transform"
                strokeWidth={2}
              />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Drag and drop
              </h3>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Freely position notes anywhere on your board with smooth
                interactions
              </p>
            </div>
            <div className="bg-[#ffe4d6] backdrop-blur-sm border-2 border-[#d4a574]/50 rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all group">
              <FolderKanban
                className="w-7 h-7 mb-4 text-[#c1440e] group-hover:scale-110 transition-transform"
                strokeWidth={2}
              />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Organize with folders
              </h3>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Group related notes together and keep your workspace clean and
                structured
              </p>
            </div>
            <div className="bg-[#fff4e6] backdrop-blur-sm border-2 border-[#d4a574]/50 rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all group">
              <FileText
                className="w-7 h-7 mb-4 text-[#8b6914] group-hover:scale-110 transition-transform"
                strokeWidth={2}
              />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Markdown editing
              </h3>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Format your content with markdown and see it rendered
                beautifully in real-time
              </p>
            </div>
            <div className="bg-[#ffeaa7] backdrop-blur-sm border-2 border-[#c7a882]/50 rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all group">
              <Palette
                className="w-7 h-7 mb-4 text-[#b8956a] group-hover:scale-110 transition-transform"
                strokeWidth={2}
              />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Customizable colors
              </h3>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Choose from existing text and background color presets
              </p>
            </div>
            <div className="bg-[#e6d5c3] backdrop-blur-sm border-2 border-[#c7a882]/50 rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all group">
              <Maximize2
                className="w-7 h-7 mb-4 text-[#6b5d4f] group-hover:scale-110 transition-transform"
                strokeWidth={2}
              />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Resize freely
              </h3>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Adjust note dimensions to fit your content perfectly with easy
                corner dragging
              </p>
            </div>
            <div className="bg-[#e8dcc4] backdrop-blur-sm border-2 border-[#d4a574]/50 rounded-2xl p-8 hover:shadow-xl hover:border-primary/50 transition-all group">
              <Sparkles
                className="w-7 h-7 mb-4 text-[#8b6914] group-hover:scale-110 transition-transform"
                strokeWidth={2}
              />
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                AI-Powered Features
              </h3>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Enhance your notes with intelligent AI assistance that helps you
                work smarter
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 border-t border-border/50 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div
              className="inline-flex items-center gap-2 bg-primary/15 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-3"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <Zap className="w-4 h-4" strokeWidth={2.5} />
              AI-Powered
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-balance"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Enhanced by artificial intelligence
            </h2>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Let AI help you write better notes faster and organize your
              thoughts more effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-6">
            <div className="bg-card border-2 border-border rounded-2xl p-8 space-y-4 hover:shadow-xl hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center">
                <Wand2 className="w-6 h-6 text-primary" strokeWidth={2} />
              </div>
              <h3
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Expand content intelligently
              </h3>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                AI recognizes your topics and intelligently expands them with
                relevant details, insights, and context. Turn brief notes into
                comprehensive documentation.
              </p>
            </div>

            <div className="bg-card border-2 border-border rounded-2xl p-8 space-y-4 hover:shadow-xl hover:border-primary/50 transition-all">
              <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" strokeWidth={2} />
              </div>
              <h3
                className="text-xl font-semibold"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Restyle with formatting
              </h3>
              <p
                className="text-sm text-muted-foreground leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Transform plain text into beautifully formatted markdown with
                headers, lists, and emphasis applied automatically. Make your
                notes more readable instantly.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-card border-2 border-border rounded-2xl p-10 shadow-lg hover:shadow-xl hover:border-primary/50 transition-all">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" strokeWidth={2} />
                </div>
                <div className="space-y-3">
                  <h4
                    className="text-xl font-semibold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Create notes from prompts
                  </h4>
                  <p
                    className="text-sm text-muted-foreground leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Start with a simple text prompt and AI will generate
                    comprehensive, well-structured notes for you. Perfect for
                    brainstorming sessions, meeting preparation, or quick idea
                    capture. Just describe what you need and let AI do the heavy
                    lifting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
