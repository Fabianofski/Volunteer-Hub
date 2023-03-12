import React from "react";

function About() {
  document.title = `About - Volunteer-Hub`;

  return (
    <div style={{ maxWidth: "60rem", width: "95vw", height: "100vh", marginTop: "2rem" }}>
      <h1>Willkommen bei VolunteerHub!</h1>
      <p style={{ textAlign: "justify", hyphens: "auto" }}>
        Unsere Plattform bietet Organisationen eine einfache Möglichkeit, Events zu erstellen und
        Freiwillige zu rekrutieren, um ihre Missionen voranzutreiben. Gleichzeitig geben wir
        Freiwilligen die Möglichkeit, sich für Events anzumelden, die ihren Interessen und
        Fähigkeiten entsprechen, um einen positiven Beitrag zu leisten. <br /> <br />
        Unser Ziel ist es, eine Brücke zwischen Organisationen und Freiwilligen zu schlagen und eine
        positive Wirkung auf die Gemeinschaft zu erzielen. Wir glauben daran, dass jeder einen
        Unterschied machen kann, unabhängig davon, ob es um die Unterstützung von lokalen
        gemeinnützigen Organisationen, Umweltschutz oder humanitäre Hilfe geht. <br /> <br />
        VolunteerHub bietet eine benutzerfreundliche Oberfläche, die es Organisationen ermöglicht,
        ihre Events mit wenigen Klicks zu erstellen und anzupassen. Freiwillige können auf einfache
        Weise Events durchsuchen und sich anmelden, um ihre Unterstützung anzubieten. <br /> <br />
        Wir sind stolz darauf, Organisationen und Freiwilligen zu helfen, ihre Ziele zu erreichen
        und einen positiven Beitrag zu leisten. Wir hoffen, dass VolunteerHub dazu beitragen wird,
        die Welt zu einem besseren Ort zu machen.
      </p>
    </div>
  );
}

export default About;
