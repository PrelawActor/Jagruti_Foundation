import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { FaChild } from "react-icons/fa6";
import "../../css/Paragraph.css"

const Paragraph = () => {
  return (
    <>
      <section className="support-section">
      <Container>

        <h2 className="section-title">
          SUPPORT EDUCATION. TRANSFORM LIVES.
        </h2>

        <div className="title-line"></div>

        <Row className="align-items-center mt-5">

          <Col lg={3} md={4} className="text-center mb-4 mb-md-0">

            <div className="support-icon">
              <FaChild />
            </div>

          </Col>

          <Col lg={9} md={8}>

            <p>
              Education is every child's right — it's the foundation for a
              secure, dignified, and fulfilling life. But for countless
              children in India, this simple dream remains out of reach.
              Poverty, lack of awareness, and social inequalities often force
              children out of classrooms and into child labour, early
              marriages, or other unsafe situations.
            </p>

            <p>
              At Jagruti Foundation, we believe that no child should have to
              choose between survival and school. Through our initiatives, we
              are making sure that learning never stops, even in the toughest
              of times. We are empowering children and communities in Nashik
              and surrounding areas, helping them step confidently into a
              future full of hope and opportunities.
            </p>

            <p>
              Our programs are much more than education. They include
              healthcare, skill development, women empowerment, environmental
              awareness, and community participation. Together, we create an
              environment where every individual can grow with dignity and
              become a responsible citizen.
            </p>

            <p>
              These children are resilient dreamers—they continue to study and
              grow despite hardships that no child should ever face. But they
              can't do it alone. Your support can make all the difference in
              keeping them in school and building a brighter future.
            </p>

          </Col>

        </Row>

      </Container>
    </section>
    </>
  )
}

export default Paragraph
