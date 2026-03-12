"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Action = "summarize" | "bullets";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [selectedAction, setSelectedAction] = useState<Action>("summarize");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit() {
    if (!inputText.trim() || isLoading) return;
    setIsLoading(true);
    setOutputText("");
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, action: selectedAction }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      setOutputText(data.result);
    } catch (err) {
      setOutputText(
        `Error: ${err instanceof Error ? err.message : "Something went wrong. Please try again."}`,
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-background px-4 py-16">
      <main className="flex w-full max-w-2xl flex-col gap-8">
        <h1 className="text-3xl font-bold tracking-tight">Text Summarizer</h1>

        <Textarea
          placeholder="Paste your text here..."
          className="min-h-48 resize-y"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className="flex items-center gap-4">
          <ToggleGroup
            type="single"
            variant="outline"
            value={selectedAction}
            onValueChange={(v) => {
              if (v) setSelectedAction(v as Action);
            }}
          >
            <ToggleGroupItem value="summarize">Summarize</ToggleGroupItem>
            <ToggleGroupItem value="bullets">
              Extract Bullet Points
            </ToggleGroupItem>
          </ToggleGroup>

          <Button
            onClick={handleSubmit}
            disabled={!inputText.trim() || isLoading}
          >
            {isLoading ? "Processing..." : "Submit"}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
            {outputText && (
              <CardAction>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </CardAction>
            )}
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground animate-pulse">Processing…</p>
            ) : outputText ? (
              <p className="whitespace-pre-wrap">{outputText}</p>
            ) : (
              <p className="text-muted-foreground">
                Your result will appear here.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
