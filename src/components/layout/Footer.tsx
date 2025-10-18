export default function Footer() {
  return (
    <footer className="py-8">
      <div className="container mx-auto text-center ">
        <p>
          Made by{" "}
          <a
            href="https://x.com/_auspy_"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            Auspicious
          </a>{" "}
        </p>
        <a
          href="https://github.com/Auspicious14"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-primary"
        >
          GitHub
        </a>

        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} LinkVeil. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
