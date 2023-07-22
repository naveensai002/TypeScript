import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";

import { HomePage } from "../src/pages/HomePage";
import { Store } from "../src/pages/Store";
import { About } from "../src/pages/About";
import { Navbar } from "../src/components/Navbar";
import { Container } from "react-bootstrap";

export default function App() {
  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </>
  );
}
