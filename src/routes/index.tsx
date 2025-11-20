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
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-cyan-50">
      <section className="relative px-6 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-balance tracking-tight">
              Your ideas,
              <span className="text-blue-600 hover:text-blue-700">
                {" "}
                organized
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Create, organize, and enhance your thoughts with intelligent
              sticky notes powered by AI. The modern way to capture and develop
              ideas.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
              <Link to="/board/all">
                <Button
                  size="lg"
                  className="text-lg px-10 h-14 rounded-xl font-medium group shadow-lg bg-blue-600 hover:bg-blue-700"
                >
                  Get started free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 h-14 rounded-xl font-medium bg-transparent"
                >
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Powerful features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to organize your thoughts and boost
              productivity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-yellow-100 backdrop-blur-sm border rounded-2xl p-8 hover:shadow-xl hover:border-blue-600/30 transition-all group">
              <MousePointerClick className="w-7 h-7 mb-4 text-yellow-600 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Drag and drop</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Freely position notes anywhere on your board with smooth
                interactions
              </p>
            </div>
            <div className="bg-pink-100 backdrop-blur-sm border rounded-2xl p-8 hover:shadow-xl hover:border-blue-600/30 transition-all group">
              <FolderKanban className="w-7 h-7 mb-4 text-pink-600 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">
                Organize with folders
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Group related notes together and keep your workspace clean and
                structured
              </p>
            </div>
            <div className="bg-blue-100 backdrop-blur-sm border rounded-2xl p-8 hover:shadow-xl hover:border-blue-600/30 transition-all group">
              <FileText className="w-7 h-7 mb-4 text-blue-600 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Markdown editing</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Format your content with markdown and see it rendered
                beautifully in real-time
              </p>
            </div>
            <div className="bg-purple-100 backdrop-blur-sm border rounded-2xl p-8 hover:shadow-xl hover:border-blue-600/30 transition-all group">
              <Palette className="w-7 h-7 mb-4 text-purple-600 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">
                Customizable colors
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Choose from existing text and background color presets
              </p>
            </div>
            <div className="bg-green-100 backdrop-blur-sm border rounded-2xl p-8 hover:shadow-xl hover:border-blue-600/30 transition-all group">
              <Maximize2 className="w-7 h-7 mb-4 text-green-600 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">Resize freely</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Adjust note dimensions to fit your content perfectly with easy
                corner dragging
              </p>
            </div>
            <div className="bg-slate-100 backdrop-blur-sm border rounded-2xl p-8 hover:shadow-xl hover:border-blue-600/30 transition-all group">
              <Sparkles className="w-7 h-7 mb-4 text-slate-600 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">
                AI-Powered Features
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Enhance your notes with intelligent AI assistance that helps you
                work smarter
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-200 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-2">
              <Zap className="w-4 h-4" />
              AI-Powered
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Enhanced by artificial intelligence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let AI help you write better notes faster and organize your
              thoughts more effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-6">
            <div className="bg-card border rounded-2xl p-8 space-y-4 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <Wand2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">
                Expand content intelligently
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI recognizes your topics and intelligently expands them with
                relevant details, insights, and context. Turn brief notes into
                comprehensive documentation.
              </p>
            </div>

            <div className="bg-card border rounded-2xl p-8 space-y-4 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Restyle with formatting</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Transform plain text into beautifully formatted markdown with
                headers, lists, and emphasis applied automatically. Make your
                notes more readable instantly.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-card border rounded-2xl p-10 shadow-lg">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold">
                    Create notes from prompts
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
