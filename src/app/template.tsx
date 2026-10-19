// Remounts on every navigation, so the CSS curtain plays again for each page.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className="curtain" />
      <div className="page-enter">{children}</div>
    </>
  );
}
