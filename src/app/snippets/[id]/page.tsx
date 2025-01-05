"use client";
import { useParams } from "next/navigation";

function SnippetDetailPage() {
  const snippetId = useParams().id;

  
  return <div>Snippet detail page</div>;
}

export default SnippetDetailPage;
