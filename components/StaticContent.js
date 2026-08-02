export default function StaticContent({ html }) {
  return <div className="legacy-page-content" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />;
}
