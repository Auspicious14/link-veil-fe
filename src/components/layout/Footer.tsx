export default function Footer() {
  return (
    <footer className="py-8">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} LinkVeil. All rights reserved.
        </p>
      </div>
    </footer>
  );
}