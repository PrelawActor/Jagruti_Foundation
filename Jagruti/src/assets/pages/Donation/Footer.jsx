import {
  FaEnvelope,
  FaFacebookF,
  FaGraduationCap,
  FaHeart,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegHeart,
  FaUsers,
  FaYoutube,
} from "react-icons/fa";
import logo from "../../logo.png"
import "../../css/Footer.css";

const quickLinks = ["Home", "About Us", "Programs", "Blog & News", "Gallery", "Contact Us"];
const programLinks = ["Education", "Environmental Projects", "Women Empowerment", "Health Initiatives"];
const involvementLinks = ["Donate Us", "Volunteer", "Partner With Us", "Intern With Us"];

function FooterLinks({ title, links }) {
  return (
    <div className="footer-column">
      <h3>{title}</h3>
      <span className="footer-column__line" />
      <ul>
        {links.map((link) => (
          <li key={link}><a href="#">{link}</a></li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__inner">
        <div className="footer-brand">
          <div className="footer-brand__heading">
            <img src={logo} alt="Jagruti Foundation logo" />
            <div>
              <h2>Jagruti Foundation</h2>
              <p>सेवा ही संकल्प</p>
            </div>
          </div>
          <p className="footer-brand__copy">
            Empowering lives through skill development, education, and care.
            Together, we build a better tomorrow for every individual and community.
          </p>
          <div className="footer-causes" aria-label="Our causes">
            <span><FaRegHeart />Skill<br />Education</span>
            <span><FaGraduationCap />Employment<br />Support</span>
            <span><FaUsers />Elderly<br />Care</span>
            <span><FaHeart />Community<br />Welfare</span>
          </div>
        </div>

        <FooterLinks title="Quick Links" links={quickLinks} />
        <FooterLinks title="Our Programs" links={programLinks} />
        <FooterLinks title="Get Involved" links={involvementLinks} />

        <div className="footer-column footer-contact">
          <h3>Contact Us</h3>
          <span className="footer-column__line" />
          <ul>
            <li>
              <FaMapMarkerAlt />
              <span><strong>Address</strong> Anand Chhaya Apartment, Near Satpur Colony, Satpur, Nashik - 422007, Maharashtra</span>
            </li>
            <li><FaPhoneAlt /><span><strong>Phone</strong> +91 12345 67890</span></li>
            <li><FaEnvelope /><span><strong>Email</strong> info@jagrutifoundation.org</span></li>
          </ul>
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;