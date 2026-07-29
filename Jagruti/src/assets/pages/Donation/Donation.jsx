import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from "react-bootstrap";
import "../../css/Donation.css"
import { FaHeart } from "react-icons/fa";
import DonationImage from "../../images/heroimg.png"; // Replace with your image
import axios from "axios";

const DonationFormSection = () => {


  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [amount, setAmount] = useState("");
const [message, setMessage] = useState("");
const handleDonate = async (e) => {

    e.preventDefault();

    try {

        const response = await axios.post(
            "http://localhost:8080/api/donations/create-order",
            {
                name,
                email,
                phone,
                amount,
                message
            }
        );

        alert(response.data.message);

    } catch (error) {

        console.error(error);

    }

};
  return (
    <section className="donation-form-section">

      <Container>

        <div className="donation-box">

          <Row className="g-0">

            {/* LEFT IMAGE */}

            <Col lg={5}>

              <img
                src={DonationImage}
                alt=""
                className="donation-image"
              />

            </Col>

            {/* RIGHT FORM */}

            <Col lg={7}>

              <div className="donation-form">

                <h2>Donate Now</h2>

                {/* Donation Type */}

                <Form onSubmit={handleDonate}>



                  {/* Amount Buttons */}

                  <div className="amount-section">

  <div className="amount-buttons">
    {["500", "1000", "2500", "5000"].map((item) => (
      <button
        type="button"
        key={item}
        className={amount === item ? "amount-btn active" : "amount-btn"}
        onClick={() => setAmount(item)}
      >
        ₹{item}
      </button>
    ))}
  </div>

  <div className="other-amount">
    <Form.Label>Other Amount</Form.Label>
    <Form.Control
      type="number"
      placeholder="₹"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />
  </div>

</div>
                  <Row className="mt-4">

                    <Col md={6}>
                      <Form.Group>

                        <Form.Label>Full Name</Form.Label>

                        <Form.Control
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />

                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>

                        <Form.Label>Email</Form.Label>

                        <Form.Control
                          placeholder="Enter your email"
                           value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />

                      </Form.Group>
                    </Col>

                  </Row>

                  <Row className="mt-3">

                    <Col md={6}>
                      <Form.Group>

                        <Form.Label>Phone Number</Form.Label>

                        <Form.Control
                          placeholder="Enter phone number"
                          value={phone}
  onChange={(e) => setPhone(e.target.value)}
                        />

                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>

                        <Form.Label>Message</Form.Label>

                        <Form.Control
                          placeholder="Write a message..."
                          value={message}
  onChange={(e) => setMessage(e.target.value)}
                        />

                      </Form.Group>
                    </Col>

                  </Row>

                  <button  type="submit" className="donate-submit g-2">

                    Proceed to Donate  

                    <FaHeart />

                  </button>

                </Form>

              </div>

            </Col>

          </Row>

        </div>

      </Container>

    </section>
  );

};

export default DonationFormSection;