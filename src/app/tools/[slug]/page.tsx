import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ComingSoonView } from "@/components/ComingSoonView";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { MoreToolsStrip } from "@/components/tools/MoreToolsStrip";
import { ChatbotTool } from "@/components/tools/ChatbotTool";
import { TextTool } from "@/components/tools/TextTool";
import { TranslatorTool } from "@/components/tools/TranslatorTool";
import { RomanToUrduTool } from "@/components/tools/RomanToUrduTool";
import { ImageGenTool } from "@/components/tools/ImageGenTool";
import { BackgroundRemoverTool } from "@/components/tools/BackgroundRemoverTool";
import { TranscribeTool } from "@/components/tools/TranscribeTool";
import { VoiceoverTool } from "@/components/tools/VoiceoverTool";
import { VideoEditorTool } from "@/components/tools/VideoEditorTool";
import { ImageUpscalerTool } from "@/components/tools/ImageUpscalerTool";
import { AvatarTool } from "@/components/tools/AvatarTool";
import { CaptionsTool } from "@/components/tools/CaptionsTool";
import { getTool, TOOLS } from "@/lib/tools";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return { title: "Tool not found" };
  return {
    title: tool.name,
    description: tool.description,
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="py-10 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {tool.status === "coming-soon" ? (
              <ComingSoonView slug={tool.slug} />
            ) : (
              <>
                <ToolHeader tool={tool} />
                <div className="mt-10">
                  <ToolBody slug={tool.slug} />
                </div>
                <MoreToolsStrip excludeSlug={tool.slug} />
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ToolBody({ slug }: { slug: string }) {
  switch (slug) {
    case "chatbot":
      return <ChatbotTool />;
    case "translator":
      return <TranslatorTool />;
    case "roman-to-urdu":
      return <RomanToUrduTool />;
    case "image-generator":
      return <ImageGenTool />;
    case "script-generator":
      return (
        <TextTool
          toolSlug="script-generator"
          inputLabel="Video Topic / Niche"
          inputPlaceholder="e.g. Karachi street food review, real estate tips, cricket commentary"
          examples={[
            "Karachi ki best biryani",
            "5 morning habits",
            "iPhone vs Samsung",
          ]}
          cta="Generate Script"
        />
      );
    case "hashtag-generator":
      return (
        <TextTool
          toolSlug="hashtag-generator"
          inputLabel="Topic / Post Description"
          inputPlaceholder="e.g. Pakistani street food, fitness, travel"
          cta="Generate Hashtags"
        />
      );
    case "youtube-title":
      return (
        <TextTool
          toolSlug="youtube-title"
          inputLabel="Video Topic"
          inputPlaceholder="e.g. How I made 1 lakh in 30 days"
          cta="Generate Titles"
        />
      );
    case "caption-writer":
      return (
        <TextTool
          toolSlug="caption-writer"
          inputLabel="Photo / Topic Description"
          inputPlaceholder="Describe what your post is about..."
          cta="Write Caption"
        />
      );
    case "blog-writer":
      return (
        <TextTool
          toolSlug="blog-writer"
          inputLabel="Blog Topic + Keywords"
          inputPlaceholder="e.g. How to start freelancing in Pakistan"
          cta="Write Blog"
        />
      );
    case "summarizer":
      return (
        <TextTool
          toolSlug="summarizer"
          inputLabel="Paste article / long text"
          inputPlaceholder="Paste the article you want summarized..."
          cta="Summarize"
        />
      );
    case "paraphraser":
      return (
        <TextTool
          toolSlug="paraphraser"
          inputLabel="Original Text"
          inputPlaceholder="Paste the text you want rewritten..."
          cta="Paraphrase"
        />
      );
    case "email-writer":
      return (
        <TextTool
          toolSlug="email-writer"
          inputLabel="What's the email about?"
          inputPlaceholder="e.g. Apply for software engineer job at Careem, mention 3 years React experience"
          cta="Write Email"
        />
      );
    case "resume-builder":
      return (
        <TextTool
          toolSlug="resume-builder"
          inputLabel="Your Info"
          inputPlaceholder="Name, contact, education, skills, work history... (rough notes are fine)"
          cta="Build Resume"
        />
      );
    case "cover-letter":
      return (
        <TextTool
          toolSlug="cover-letter"
          inputLabel="Job description + your background"
          inputPlaceholder="Job: Frontend dev at Netsol Technologies. My background: 2 years React, fresh graduate..."
          cta="Write Cover Letter"
        />
      );
    case "story-generator":
      return (
        <TextTool
          toolSlug="story-generator"
          inputLabel="Story Idea / Genre"
          inputPlaceholder="e.g. romance, horror, motivational. Or: 'a young girl in Lahore who finds a magic ring'"
          cta="Write Story"
        />
      );
    case "urdu-poetry":
      return (
        <TextTool
          toolSlug="urdu-poetry"
          inputLabel="Topic / Mood"
          inputPlaceholder="e.g. mohabbat, judaai, watan se mohabbat, baarish"
          cta="Generate Shayari"
          outputClassName="font-urdu text-xl leading-loose text-right"
        />
      );
    case "slogan-generator":
      return (
        <TextTool
          toolSlug="slogan-generator"
          inputLabel="Brand + Niche"
          inputPlaceholder="e.g. 'Karachi Coffee Roasters — premium Pakistani coffee brand'"
          cta="Generate Slogans"
        />
      );
    case "joke-generator":
      return (
        <TextTool
          toolSlug="joke-generator"
          inputLabel="Topic (optional)"
          inputPlaceholder="e.g. teachers, food, family — or leave empty"
          cta="Tell Jokes"
        />
      );
    case "quote-generator":
      return (
        <TextTool
          toolSlug="quote-generator"
          inputLabel="Topic"
          inputPlaceholder="e.g. success, life, struggle, friendship"
          cta="Generate Quotes"
        />
      );
    case "username-generator":
      return (
        <TextTool
          toolSlug="username-generator"
          inputLabel="Niche / Personality"
          inputPlaceholder="e.g. fitness coach, fashion blogger, gamer"
          cta="Generate Usernames"
        />
      );
    case "idea-brainstormer":
      return (
        <TextTool
          toolSlug="idea-brainstormer"
          inputLabel="Goal / Topic"
          inputPlaceholder="e.g. content ideas for fitness Instagram, business ideas for Karachi"
          cta="Brainstorm"
        />
      );
    case "code-generator":
      return (
        <TextTool
          toolSlug="code-generator"
          inputLabel="Describe what code you need"
          inputPlaceholder="e.g. Python function to fetch weather data and cache it for 1 hour"
          cta="Generate Code"
          outputClassName="font-mono text-xs"
        />
      );
    case "code-explainer":
      return (
        <TextTool
          toolSlug="code-explainer"
          inputLabel="Paste your code"
          inputPlaceholder="Paste any code snippet here..."
          cta="Explain Code"
        />
      );
    case "sql-generator":
      return (
        <TextTool
          toolSlug="sql-generator"
          inputLabel="Describe what you want"
          inputPlaceholder="e.g. find top 10 customers by total order value last month"
          cta="Generate SQL"
          outputClassName="font-mono text-xs"
        />
      );
    case "regex-generator":
      return (
        <TextTool
          toolSlug="regex-generator"
          inputLabel="What do you want to match?"
          inputPlaceholder="e.g. Pakistani phone numbers like 03XX-XXXXXXX"
          cta="Generate Regex"
          outputClassName="font-mono text-xs"
        />
      );
    case "readme-generator":
      return (
        <TextTool
          toolSlug="readme-generator"
          inputLabel="Project Info"
          inputPlaceholder="Project name + tech stack + main features..."
          cta="Generate README"
          outputClassName="font-mono text-xs"
        />
      );
    case "background-remover":
      return <BackgroundRemoverTool />;
    case "transcription":
      return <TranscribeTool />;
    case "ai-voiceover":
      return <VoiceoverTool />;
    case "image-upscaler":
      return <ImageUpscalerTool />;
    case "captions":
      return <CaptionsTool />;
    case "video-editor":
      return <VideoEditorTool />;
    case "ai-avatar":
      return <AvatarTool />;
    default:
      return <BetaPlaceholder name="Tool" />;
  }
}

function BetaPlaceholder({ name }: { name: string }) {
  return (
    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-10 text-center">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs uppercase tracking-wider text-blue-300">
        Beta · Active development
      </span>
      <h2 className="mt-4 font-display text-xl font-bold">
        {name} interface aa raha hai
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
        Backend ready hai, UI iss week launch ho rahi hai. Aap chahein to
        notify me list pe sign up kar lein.
      </p>
    </div>
  );
}
