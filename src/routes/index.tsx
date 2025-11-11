import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  FolderKanban,
  Maximize2,
  MousePointerClick,
  Palette,
  Sparkles,
  Wand2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-8 py-20 flex flex-col gap-8 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-bold text-gray-900 text-balance">
            Your Ideas, <span className="text-blue-600">Organized</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
            Create, organize, and manage your thoughts with beautiful sticky
            notes. Drag, drop, and customize to your heart's content.
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Link to="/board/all">
            <Button size="lg" className="text-lg px-8 bg-blue-600">
              Start Creating
            </Button>
          </Link>
          <Link to="/login">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent"
            >
              Sign In
            </Button>
          </Link>
        </div>

        <div className="mt-12 flex flex-col gap-12">
          <div className="bg-blue-100 rounded-3xl p-12 shadow-lg border border-blue-200/50">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Powerful Features
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to organize your thoughts and boost
                productivity
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12">
              <div className="text-center flex flex-col gap-3 bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto">
                  <MousePointerClick className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Drag & Drop
                </h3>
                <p className="text-gray-600">
                  Effortlessly move notes anywhere on your board with smooth
                  drag and drop interactions
                </p>
              </div>

              <div className="text-center flex flex-col gap-3 bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto">
                  <FolderKanban className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Folder Organization
                </h3>
                <p className="text-gray-600">
                  Create folders and organize your notes by project, topic, or
                  any way you like
                </p>
              </div>

              <div className="text-center flex flex-col gap-3 bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Markdown Support
                </h3>
                <p className="text-gray-600">
                  Write notes in markdown with live preview to format your
                  content beautifully
                </p>
              </div>

              <div className="text-center flex flex-col gap-3 bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Palette className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Custom Colors
                </h3>
                <p className="text-gray-600">
                  Personalize your notes with custom background and text colors
                  to match your style
                </p>
              </div>

              <div className="text-center flex flex-col gap-3 bg-white p-6 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                  <Maximize2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Resizable Notes
                </h3>
                <p className="text-gray-600">
                  Adjust note sizes to fit your content perfectly with easy
                  corner resizing
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900">
                AI-Powered Features
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enhance your notes with intelligent AI assistance that helps you
              work smarter.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Wand2 className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                Expand Content
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AI recognizes your note topics and intelligently expands on
                them, adding relevant details, examples, and insights to enrich
                your content.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                Restyle Text
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Transform plain text into beautifully formatted markdown
                automatically. AI adds headers, bullet points, emphasis, and
                structure to make your notes more readable.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <Sparkles className="w-6 h-6 text-yellow-600 mt-1 shrink-0" />
              <div className="text-left">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  AI Note Creation
                </h4>
                <p className="text-gray-700">
                  Start with a simple prompt and let AI generate comprehensive
                  notes for you. Perfect for brainstorming, or quick summaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
