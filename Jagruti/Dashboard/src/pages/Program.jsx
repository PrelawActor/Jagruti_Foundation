import React, { useMemo, useState } from "react";
import {
  Container, Row, Col, Button, Modal, Form,
  InputGroup, Table
} from "react-bootstrap";
import {
  FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash,
  FaLayerGroup, FaCalendarAlt
} from "react-icons/fa";
import "../assets/css/Program.css";
import AdminLayout from "../layouts/AdminLayout";

const categories = [
  "Education",
  "Women Empowerment",
  "Healthcare",
  "Environment",
  "Community Development",
  "Skill Development"
];

const initialPrograms = [
  {
    id: 1,
    title: "Education Support Program",
    category: "Education",
    description: "Providing educational resources and academic support to underprivileged children.",
    date: "15 July 2026",
    published: true,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900"
  },
  {
    id: 2,
    title: "Digital Learning Initiative",
    category: "Education",
    description: "Helping students access digital resources and technology-enabled education.",
    date: "20 August 2026",
    published: true,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900"
  },
  {
    id: 3,
    title: "Scholarship Support",
    category: "Education",
    description: "Supporting deserving students with financial assistance for education.",
    date: "10 June 2026",
    published: true,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900"
  },
  {
    id: 4,
    title: "Women Skill Development",
    category: "Women Empowerment",
    description: "Providing women with skills and opportunities for financial independence.",
    date: "25 July 2026",
    published: true,
    image: "https://images.unsplash.com/photo-1573496799515-eebbb63814f2?w=900"
  },
  {
    id: 5,
    title: "Community Health Camp",
    category: "Healthcare",
    description: "Organizing health awareness and medical support camps.",
    date: "05 August 2026",
    published: true,
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900"
  },
  {
    id: 6,
    title: "Tree Plantation Drive",
    category: "Environment",
    description: "Encouraging communities to participate in environmental conservation.",
    date: "12 June 2026",
    published: true,
    image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=900"
  }
];

const emptyForm = {
  title: "",
  category: "Education",
  description: "",
  date: "",
  published: true,
  image: ""
};

const Programs = () => {
  const [programs, setPrograms] = useState(initialPrograms);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [modal, setModal] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredPrograms = useMemo(() =>
    programs.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.category === category)
    ), [programs, search, category]
  );

  const updateForm = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const openAdd = () => {
    setForm(emptyForm);
    setModal("add");
  };

  const openEdit = p => {
    setSelected(p);
    setForm({ ...p });
    setModal("edit");
  };

  const saveProgram = e => {
    e.preventDefault();

    if (modal === "add") {
      setPrograms([
        ...programs,
        {
          ...form,
          id: Date.now(),
          image: form.image || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900"
        }
      ]);
    } else {
      setPrograms(programs.map(p =>
        p.id === selected.id ? { ...p, ...form } : p
      ));
    }

    setModal("");
    setForm(emptyForm);
  };

  const deleteProgram = () => {
    setPrograms(programs.filter(p => p.id !== selected.id));
    setModal("");
    setSelected(null);
  };

  return (
    <AdminLayout>
      <div className="programs-page">
        <Container fluid>
          {/* HEADER */}
          <div className="programs-hero">
            <Row className="align-items-center">
              <Col lg={8}>
                <div className="hero-label">ADMINISTRATION / PROGRAMS</div>
                <h1>Manage Foundation Programs</h1>
                <p>Organize, edit, and monitor all your social programs from one unified table view.</p>
              </Col>
              <Col lg={4} className="text-lg-end">
                <Button variant="danger" className="btn-red-action" onClick={openAdd}>
                  <FaPlus className="me-2" /> Add New Program
                </Button>
              </Col>
            </Row>
          </div>

          <h2 className="section-title mt-4">All Programs</h2>
          <p className="stat-label mb-3">View and manage all programs.</p>

          {/* FILTERS */}
          <div className="filter-box">
            <Row className="g-2">
              <Col lg={6}>
                <InputGroup>
                  <InputGroup.Text><FaSearch /></InputGroup.Text>
                  <Form.Control
                    className="filter-control"
                    placeholder="Search programs..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Col>

              <Col lg={6}>
                <InputGroup>
                  <InputGroup.Text><FaFilter /></InputGroup.Text>
                  <Form.Select
                    className="filter-control"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    {categories.map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Col>
            </Row>
          </div>

          {/* TABLE - NO SCROLLBAR */}
          <div className="table-wrapper no-scroll-wrapper">
            <Table hover className="custom-program-table fit-table mb-0 align-middle">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>Sr.</th>
                  <th style={{ width: "35%" }}>Program Details</th>
                  <th style={{ width: "18%" }}>Category</th>
                  <th style={{ width: "80px" }}>Image</th>
                  <th style={{ width: "15%" }}>Date</th>
                  <th style={{ width: "120px" }} className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrograms.length ? (
                  filteredPrograms.map((p, index) => (
                    <tr key={p.id}>
                      <td className="fw-bold text-muted">{index + 1}</td>
                      <td>
                        <div className="text-truncate-container">
                          <div className="program-table-title text-truncate">{p.title}</div>
                          <div className="program-table-desc text-truncate">{p.description}</div>
                        </div>
                      </td>
                      <td>
                        <span className="category-badge-pill">{p.category}</span>
                      </td>
                      <td>
                        <img src={p.image} alt={p.title} className="program-img-thumb" />
                      </td>
                      <td>
                        <span className="text-nowrap"><FaCalendarAlt className="me-1 text-danger" />{p.date}</span>
                      </td>
                      <td>
                        <div className="actions justify-content-end">
                          <button className="action-btn" title="View" onClick={() => {
                            setSelected(p);
                            setModal("view");
                          }}>
                            <FaEye />
                          </button>

                          <button className="action-btn" title="Edit" onClick={() => openEdit(p)}>
                            <FaEdit />
                          </button>

                          <button className="action-btn delete-btn" title="Delete" onClick={() => {
                            setSelected(p);
                            setModal("delete");
                          }}>
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-5">
                      <FaLayerGroup style={{ fontSize: 35, color: "var(--muted)" }} />
                      <h6 className="mt-3 text-dark font-weight-bold">No programs found</h6>
                      <p className="stat-label mb-0">Try changing your search or filters.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>

      {/* ADD / UPDATE MODAL */}
      <Modal show={modal === "add" || modal === "edit"} onHide={() => setModal("")} centered size="lg">
        <Form onSubmit={saveProgram}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">
              {modal === "add" ? "Add New Program" : "Update Program"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="g-3">
              <Col md={8}>
                <Form.Label className="modal-label">Program Name</Form.Label>
                <Form.Control
                  className="modal-control"
                  name="title"
                  value={form.title}
                  onChange={updateForm}
                  placeholder="Enter program name"
                  required
                />
              </Col>

              <Col md={4}>
                <Form.Label className="modal-label">Category</Form.Label>
                <Form.Select
                  className="modal-control"
                  name="category"
                  value={form.category}
                  onChange={updateForm}
                >
                  {categories.map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </Form.Select>
              </Col>

              <Col md={12}>
                <Form.Label className="modal-label">Program Date</Form.Label>
                <Form.Control
                  className="modal-control"
                  name="date"
                  value={form.date}
                  onChange={updateForm}
                  placeholder="15 July 2026"
                />
              </Col>

              <Col xs={12}>
                <Form.Label className="modal-label">Upload Program Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  className="modal-control"
                  onChange={handleImageUpload}
                />
                {form.image && (
                  <div className="mt-2">
                    <img 
                      src={form.image} 
                      alt="Preview" 
                      style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "6px" }} 
                    />
                  </div>
                )}
              </Col>

              <Col xs={12}>
                <Form.Label className="modal-label">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className="modal-control"
                  name="description"
                  value={form.description}
                  onChange={updateForm}
                  placeholder="Enter detailed description"
                  required
                />
              </Col>

              <Col xs={12}>
                <Form.Check
                  type="switch"
                  name="published"
                  checked={form.published}
                  onChange={updateForm}
                  label="Publish this program on the website"
                />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="light" onClick={() => setModal("")}>Cancel</Button>
            <Button variant="danger" className="btn-red-action" type="submit">
              {modal === "add" ? <><FaPlus className="me-1" /> Add Program</> : <><FaEdit className="me-1" /> Save Changes</>}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* VIEW MODAL */}
      <Modal show={modal === "view"} onHide={() => setModal("")} centered size="lg">
        {selected && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Program Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Row className="g-4">
                <Col md={5}>
                  <img
                    src={selected.image}
                    alt={selected.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "12px"
                    }}
                  />
                </Col>

                <Col md={7}>
                  <h3 className="mt-2 text-dark font-weight-bold">{selected.title}</h3>
                  <p className="text-muted small">{selected.description}</p>

                  <div className="border-top pt-3 mt-3 text-muted small">
                    <p className="mb-0"><FaCalendarAlt className="text-danger me-2" /> <strong>Date:</strong> {selected.date}</p>
                  </div>
                </Col>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="light" onClick={() => setModal("")}>Close</Button>
              <Button variant="danger" className="btn-red-action" onClick={() => openEdit(selected)}>
                <FaEdit className="me-1" /> Update
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* DELETE MODAL */}
      <Modal show={modal === "delete"} onHide={() => setModal("")} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Program</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center p-4">
          <FaTrash style={{ fontSize: 35, color: "#dc3545" }} />
          <h5 className="mt-3">Delete this program?</h5>
          <p className="stat-label">
            Are you sure you want to delete <b>{selected?.title}</b>? This action cannot be undone.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={() => setModal("")}>Cancel</Button>
          <Button
            variant="danger"
            className="btn-red-action"
            onClick={deleteProgram}
          >
            <FaTrash className="me-1" /> Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default Programs;