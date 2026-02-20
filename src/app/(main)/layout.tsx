export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav>Navbar</nav>
      <main className="grow container mx-auto px-4 py-8">{children}</main>
      <footer>Footer</footer>
    </div>
  );
}
