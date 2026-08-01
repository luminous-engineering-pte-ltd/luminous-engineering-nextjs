export default function StaticContent({ html }) {
  return <div className="legacy-page-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
