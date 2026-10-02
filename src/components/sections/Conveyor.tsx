/** Conveyor belt carrying the tech stack across the cover. Pauses on hover. */
const Conveyor = ({ items }: { items: string[] }) => (
  <div className="conveyor">
    <p className="kicker mb-4">Medfølgende komponenter</p>
    <div className="conveyor-window">
      <ul className="conveyor-track" aria-label="Teknologier og verktøy">
        {[...items, ...items].map((item, i) => (
          <li key={`${item}-${i}`} className="conveyor-box" aria-hidden={i >= items.length ? true : undefined}>
            {item}
          </li>
        ))}
      </ul>
    </div>
    <div className="conveyor-belt" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={i} className="conveyor-roller" />
      ))}
    </div>
  </div>
);

export default Conveyor;
