import React, { useMemo, useState } from "react";
import {
  Container, Row, Col, Button, Modal, Form,
  InputGroup, Table
} from "react-bootstrap";
import {
  FaPlus, FaSearch, FaFilter, FaEye, FaEdit, FaTrash,
  FaBlog, FaCalendarAlt
} from "react-icons/fa";
import "../assets/css/Blog.css";
import AdminLayout from "../layouts/AdminLayout";

const categories = [
  "Education",
  "Women Empowerment",
  "Healthcare",
  "Environment",
  "Community Development"
];

const initialBlogs = [
  {
    id: 1,
    title: "Empowering Children Through Education",
    category: "Education",
    description: "Discover how our education initiatives are helping children build a brighter and more confident future.",
    content: "Education is one of the most powerful tools for creating positive change in society. Through our initiatives, we aim to provide children with the resources and opportunities they need to succeed.",
    date: "15 July 2026",
    published: true,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900"
  },
  {
    id: 2,
    title: "Building Stronger Women Leaders",
    category: "Women Empowerment",
    description: "Our women empowerment programs focus on skills, confidence and financial independence.",
    content: "Empowering women creates stronger families and communities. Our skill development initiatives help women discover new opportunities.",
    date: "10 July 2026",
    published: true,
    image: "https://images.unsplash.com/photo-1573496799515-eebbb63814f2?w=900"
  },
  {
    id: 3,
    title: "Community Health Awareness Camp",
    category: "Healthcare",
    description: "A look at our recent health awareness campaign and its impact on the local community.",
    content: "Healthcare awareness plays an important role in building healthier communities. Our health camps provide valuable information and support.",
    date: "05 July 2026",
    published: true,
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=900"
  },
  {
    id: 4,
    title: "Together for a Greener Tomorrow",
    category: "Environment",
    description: "Learn how our environmental initiatives encourage communities to protect nature.",
    content: "Environmental conservation is everyone's responsibility. Our plantation and awareness drives encourage people to take meaningful action.",
    date: "28 June 2026",
    published: false,
    image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=900"
  },
  {
    id: 5,
    title: "Creating Stronger Communities Together",
    category: "Community Development",
    description: "How community participation and collaboration can create lasting positive change.",
    content: "Strong communities are built when people come together and support one another. Our initiatives focus on creating sustainable community development.",
    date: "20 June 2026",
    published: true,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=900"
  }
];

const emptyBlog = {
  title: "",
  category: "Education",
  description: "",
  content: "",
  date: "",
  published: false,
  image: ""
};

const Blog = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyBlog);
  const [modal, setModal] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredBlogs = useMemo(
    () =>
      blogs.filter(
        b =>
          b.title.toLowerCase().includes(search.toLowerCase()) &&
          (category === "All" || b.category === category)
      ),
    [blogs, search, category]
  );

  const updateForm = e => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
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
    setForm(emptyBlog);
    setModal("add");
  };

  const openEdit = blog => {
    setSelected(blog);
    setForm({ ...blog });
    setModal("edit");
  };

  const saveBlog = e => {
    e.preventDefault();

    if (modal === "add") {
      setBlogs([
        ...blogs,
        {
          ...form,
          id: Date.now(),
          image:
            form.image ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=900"
        }
      ]);
    } else {
      setBlogs(
        blogs.map(b => (b.id === selected.id ? { ...b, ...form } : b))
      );
    }

    setModal("");
    setForm(emptyBlog);
  };

  const deleteBlog = () => {
    setBlogs(blogs.filter(b => b.id !== selected.id));
    setSelected(null);
    setModal("");
  };

  return (
    <AdminLayout>
      <div className="blog-page">
        <Container fluid>
          {/* HERO BANNER MATCHED TO DESIGN */}
          <div className="custom-hero-banner mb-4">
            <Row className="align-items-center">
              <Col lg={8}>
                <div className="hero-sublabel">ADMINISTRATION / BLOG MANAGEMENT</div>
                <h1 className="hero-title">Manage Your Stories</h1>
                <p className="hero-desc">
                  Create, publish, and manage foundation stories, news, and community updates from one unified table view.
                </p>
              </Col>
              <Col lg={4} className="text-lg-end mt-3 mt-lg-0">
                <Button className="hero-add-btn" onClick={openAdd}>
                  <FaPlus className="me-2" /> Add New Blog
                </Button>
              </Col>
            </Row>
          </div>

          <h2 className="section-title mt-4">All Blog Posts</h2>
          <p className="stat-label mb-3">
            Manage your foundation's stories and updates.
          </p>

          {/* FILTERS */}
          <div className="filter-box">
            <Row className="g-2">
              <Col lg={6}>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    className="filter-control"
                    placeholder="Search blogs..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </InputGroup>
              </Col>

              <Col lg={6}>
                <InputGroup>
                  <InputGroup.Text>
                    <FaFilter />
                  </InputGroup.Text>
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

          {/* TABLE */}
          <div className="table-wrapper no-scroll-wrapper">
            <Table hover className="custom-blog-table fit-table mb-0 align-middle">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>Sr.</th>
                  <th style={{ width: "40%" }}>Blog Details</th>
                  <th style={{ width: "20%" }}>Category</th>
                  <th style={{ width: "80px" }}>Image</th>
                  <th style={{ width: "15%" }}>Date</th>
                  <th style={{ width: "120px" }} className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.length ? (
                  filteredBlogs.map((blog, index) => (
                    <tr key={blog.id}>
                      <td className="fw-bold text-muted">{index + 1}</td>
                      <td>
                        <div className="text-truncate-container">
                          <div className="blog-table-title text-truncate">{blog.title}</div>
                          <div className="blog-table-desc text-truncate">{blog.description}</div>
                        </div>
                      </td>
                      <td>
                        <span className="category-badge-pill">{blog.category}</span>
                      </td>
                      <td>
                        <img src={blog.image} alt={blog.title} className="blog-img-thumb" />
                      </td>
                      <td>
                        <span className="text-nowrap"><FaCalendarAlt className="me-1 text-danger" />{blog.date}</span>
                      </td>
                      <td>
                        <div className="actions justify-content-end">
                          <button className="action-btn" title="View" onClick={() => {
                            setSelected(blog);
                            setModal("view");
                          }}>
                            <FaEye />
                          </button>

                          <button className="action-btn" title="Edit" onClick={() => openEdit(blog)}>
                            <FaEdit />
                          </button>

                          <button className="action-btn delete-btn" title="Delete" onClick={() => {
                            setSelected(blog);
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
                      <FaBlog style={{ fontSize: 35, color: "var(--muted)" }} />
                      <h6 className="mt-3 text-dark font-weight-bold">No blogs found</h6>
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
      <Modal
        show={modal === "add" || modal === "edit"}
        onHide={() => setModal("")}
        centered
        size="lg"
      >
        <Form onSubmit={saveBlog}>
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">
              {modal === "add" ? "Create New Blog" : "Update Blog"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Row className="g-3">
              <Col md={8}>
                <Form.Label className="modal-label">Blog Title</Form.Label>
                <Form.Control
                  className="modal-control"
                  name="title"
                  value={form.title}
                  onChange={updateForm}
                  placeholder="Enter blog title"
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
                <Form.Label className="modal-label">Publish Date</Form.Label>
                <Form.Control
                  className="modal-control"
                  name="date"
                  value={form.date}
                  onChange={updateForm}
                  placeholder="15 July 2026"
                />
              </Col>

              <Col xs={12}>
                <Form.Label className="modal-label">Upload Blog Image</Form.Label>
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
                <Form.Label className="modal-label">Short Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  className="modal-control"
                  name="description"
                  value={form.description}
                  onChange={updateForm}
                  placeholder="Write a short description..."
                  required
                />
              </Col>

              <Col xs={12}>
                <Form.Label className="modal-label">Blog Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  className="modal-control"
                  name="content"
                  value={form.content}
                  onChange={updateForm}
                  placeholder="Write your complete blog content..."
                  required
                />
              </Col>

              <Col xs={12}>
                <Form.Check
                  type="switch"
                  name="published"
                  checked={form.published}
                  onChange={updateForm}
                  label="Publish this blog on the website"
                />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="light" onClick={() => setModal("")}>
              Cancel
            </Button>
            <Button variant="danger" className="btn-red-action" type="submit">
              {modal === "add" ? <><FaPlus className="me-1" /> Add Blog</> : <><FaEdit className="me-1" /> Save Changes</>}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* VIEW MODAL */}
      <Modal
        show={modal === "view"}
        onHide={() => setModal("")}
        centered
        size="lg"
      >
        {selected && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Blog Preview</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <img
                src={selected.image}
                alt={selected.title}
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "cover",
                  borderRadius: "14px"
                }}
              />

              <div className="mt-3">
                <span className="category-badge-pill">{selected.category}</span>
              </div>

              <h2 className="mt-3 text-dark fw-bold">
                {selected.title}
              </h2>

              <div className="blog-info border-top border-bottom py-2 my-3 text-muted" style={{ fontSize: 13 }}>
                <span><FaCalendarAlt className="text-danger me-1" /> {selected.date}</span>
              </div>

              <p className="blog-description fw-semibold">
                {selected.description}
              </p>

              <p style={{ color: "#334155", fontSize: 14, lineHeight: 1.8 }}>
                {selected.content}
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="light" onClick={() => setModal("")}>
                Close
              </Button>
              <Button variant="danger" className="btn-red-action" onClick={() => openEdit(selected)}>
                <FaEdit className="me-1" /> Update
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        show={modal === "delete"}
        onHide={() => setModal("")}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Blog</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center p-4">
          <FaTrash style={{ fontSize: 35, color: "#dc3545" }} />
          <h5 className="mt-3">Delete this blog?</h5>
          <p className="stat-label">
            Are you sure you want to delete <b>{selected?.title}</b>? This action cannot be undone.
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={() => setModal("")}>
            Cancel
          </Button>
          <Button
            variant="danger"
            className="btn-red-action"
            onClick={deleteBlog}
          >
            <FaTrash className="me-1" /> Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default Blog;