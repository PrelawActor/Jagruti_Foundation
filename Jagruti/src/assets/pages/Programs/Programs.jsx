import { FaBookOpen, FaHeartbeat, FaLeaf, FaVenus } from "react-icons/fa";
import "../../ProgramsCSS/Programs.css";
import ProgramCard from "./ProgramCard";

const programs = [
  {
    title: "Education",
    icon: FaBookOpen,
    tone: "red",
    image: "src/assets/images/education.jpeg",
    description:
      "We believe education is the foundation of a brighter tomorrow. Our education programs focus on improving access to quality learning, supporting school infrastructure, and nurturing young minds.",
    highlights: [
      "Support for school education",
      "Scholarships for deserving students",
      "Skill development and learning support",
      "Promoting digital literacy and life skills",
    ],
  },
  {
    title: "Environmental Projects",
    icon: FaLeaf,
    tone: "navy",
    image: "src/assets/images/environment.jpeg",
    description:
      "We are committed to protecting our planet for future generations. Our environmental initiatives promote sustainability, conservation, and responsible living.",
    highlights: [
      "Tree plantation and green cover drives",
      "Water conservation and waste management",
      "Clean and green community awareness",
      "Promoting sustainable living practices",
    ],
  },
  {
    title: "Women Empowerment",
    icon: FaVenus,
    tone: "navy",
    image: "src/assets/images/women-empowerment.jpeg",
    description:
      "We empower women to lead independent and dignified lives by providing opportunities, resources, and a supportive environment.",
    highlights: [
      "Vocational training and skill development",
      "Awareness on health, rights and hygiene",
      "Support for self-help groups and small businesses",
      "Building confidence and leadership",
    ],
  },
  {
    title: "Health Initiatives",
    icon: FaHeartbeat,
    tone: "red",
    image: "src/assets/images/health.jpeg",
    description:
      "We promote good health and well-being for all through awareness, medical support, and preventive healthcare services.",
    highlights: [
      "Health camps and medical check-ups",
      "Awareness on nutrition, hygiene and sanitation",
      "Support for maternal and child health",
      "Emergency assistance and care support",
    ],
  },
];

function Programs() {
  return (
    <section className="programs-section" id="programs" aria-labelledby="programs-title">
      <div className="section-heading">
        <h2 id="programs-title">Our Programs</h2>
        <span aria-hidden="true" />
      </div>

      <div className="programs-list">
        {programs.map((program) => (
          <ProgramCard key={program.title} program={program} />
        ))}
      </div>
    </section>
  );
}

export default Programs;  