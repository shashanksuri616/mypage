const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur z-50 flex justify-center gap-8 py-4">
    <button onClick={() => document.getElementById("hero").scrollIntoView({ behavior: "smooth" })}>Home</button>
    <button onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}>About</button>
    <button onClick={() => document.getElementById("skills").scrollIntoView({ behavior: "smooth" })}>Skills</button>
    <button onClick={() => document.getElementById("timeline").scrollIntoView({ behavior: "smooth" })}>Timeline</button>
    <button onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}>Projects</button>
    <button onClick={() => document.getElementById("certificates").scrollIntoView({ behavior: "smooth" })}>Certificates</button>
    <button onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>Contact</button>
  </nav>
);

export default Navbar;