import React from 'react';

const teamMembers = [
  {
    name: "SOUSSOU Koffi Desiré",
    role: "Lead Developer",
    bio: "Expert en technologie de traduction du langage des signes, passionnée par l'accessibilité numérique.",
    image: "/api/placeholder/200/200"
  },
  {
    name: "HADDIOUI Hatim",
    role: "Machine Learning Engineer",
    bio: "Spécialiste en intelligence artificielle et apprentissage automatique, concentré sur la reconnaissance des gestes.",
    image: "/api/placeholder/200/200"
  },
  {
    name: "COULIBALY Adama",
    role: "UX/UI Designer",
    bio: "Designer expérimentée créant des interfaces intuitives pour rendre la technologie accessible à tous.",
    image: "/api/placeholder/200/200"
  }
];

function AboutUsPage() {
  return (
    <section className="about-us">
      <h2>Notre Équipe</h2>
      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.name} className="team-member">
            <img 
              src={member.image} 
              alt={member.name} 
              className="team-member-image"
            />
            <h3>{member.name}</h3>
            <p className="team-member-role">{member.role}</p>
            <p className="team-member-bio">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutUsPage;