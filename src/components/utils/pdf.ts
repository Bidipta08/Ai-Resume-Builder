export function downloadResumePDF(content: string) {
  const blob = new Blob([content], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "resume.pdf";
  a.click();

  URL.revokeObjectURL(url);
}
