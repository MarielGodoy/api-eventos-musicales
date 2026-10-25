import { useState, useEffect } from "react";
import { Container, Card, Row, Col, Badge, Button, Modal, Form } from "react-bootstrap";
import {
  obtenerRecursos,
  crearRecurso,
  actualizarRecurso,
  eliminarRecurso,
} from "../services/recursoService";
import type { Recurso, RecursoFormulario } from "../types/Recurso";
import ModalLibro from "./ModalEvento";

const ListaLibros = () => {
  const [datos, setDatos] = useState<Recurso[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [libroEditado, setLibroEditado] = useState<Recurso | null>(null);
  const [libroAEliminar, setLibroAEliminar] = useState<Recurso | null>(null);
  const [errorEliminar, setErrorEliminar] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const data = await obtenerRecursos();
        setDatos(data);
      } catch {
        setError("No se pudieron cargar los eventos");
      } finally {
        setCargando(false);
      }
    };

    cargarEventos();
  }, []);

  // Función inteligente para asignar imágenes musicales automáticas y vistosas
  const obtenerImagenEvento = (nombre: string) => {
    const texto = nombre ? nombre.toLowerCase() : "";
    if (texto.includes("piano")) {
      return "https://images.unsplash.com/photo-1520523839896-5aa633282bc2?auto=format&fit=crop&w=600&q=80";
    } else if (texto.includes("cámara") || texto.includes("camara") || texto.includes("orquesta") || texto.includes("duo")) {
      return "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80";
    } else if (texto.includes("armonía") || texto.includes("taller") || texto.includes("clase")) {
      return "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80";
    }
    return "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80";
  };

  const abrirAgregar = () => {
    setLibroEditado(null);
    setMostrarModal(true);
  };

  const abrirEditar = (libro: Recurso) => {
    setLibroEditado(libro);
    setMostrarModal(true);
  };

  const guardarLibro = async (datosForm: RecursoFormulario) => {
    try {
      if (libroEditado) {
        await actualizarRecurso(libroEditado._id, datosForm);
      } else {
        await crearRecurso(datosForm);
      }
      setMostrarModal(false);
      const data = await obtenerRecursos();
      setDatos(data);
    } catch (err) {
      console.error("Error al guardar:", err);
    }
  };

  const confirmarEliminar = async () => {
    if (!libroAEliminar) return;
    try {
      const idParaEliminar = libroAEliminar._id;
      await eliminarRecurso(idParaEliminar);
      
      setDatos((anteriores) =>
        anteriores.filter((item) => item._id !== idParaEliminar)
      );
      cerrarEliminar();
    } catch (err) {
      console.error("Error al eliminar:", err);
      setErrorEliminar("No se pudo eliminar el evento");
    }
  };

  const cerrarEliminar = () => {
    setLibroAEliminar(null);
    setErrorEliminar(null);
  };

  // Filtrar eventos en tiempo real con la barra de búsqueda
  const eventosFiltrados = datos.filter((evento) =>
    (evento.nombre || "").toLowerCase().includes(busqueda.toLowerCase()) ||
    (evento.lugar || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Eventos Musicales</h2>
          <p className="text-secondary mb-0">Explora la agenda de conciertos y presentaciones.</p>
        </div>
        <Button onClick={abrirAgregar}>+ Agregar evento</Button>
      </div>

      {/* Barra de búsqueda */}
      <Form.Control
        type="text"
        placeholder="Buscar por nombre de evento o lugar..."
        className="mb-4 shadow-sm"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <ModalLibro
        mostrar={mostrarModal}
        libro={libroEditado}
        onCerrar={() => setMostrarModal(false)}
        onGuardar={guardarLibro}
      />

      {/* Modal de confirmación para eliminar */}
      <Modal show={!!libroAEliminar} onHide={cerrarEliminar} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Seguro que querés eliminar "{libroAEliminar?.nombre}"?
          {errorEliminar && (
            <p className="text-danger mt-3 mb-0">{errorEliminar}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarEliminar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {cargando && <p>Cargando ... </p>}
      {error && <p>{error}</p>}
      {!cargando && !error && (
        <Row>
          {eventosFiltrados.map((evento) => (
            <Col md={4} key={evento._id} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={obtenerImagenEvento(evento.nombre)}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold">{evento.nombre}</Card.Title>
                  <Card.Subtitle className="text-secondary mb-2 small">
                    {evento.fecha ? evento.fecha.split("T")[0] : ""} · {evento.lugar}
                  </Card.Subtitle>
                  <Card.Text className="text-secondary small flex-grow-1">
                    {evento.descripcion}
                  </Card.Text>
                  
                  <div className="mb-3">
                    <Badge bg="info" text="dark">
                      Entradas: {evento.entradasDisponibles}
                    </Badge>
                  </div>

                  <div className="d-flex justify-content-between mt-auto">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => abrirEditar(evento)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => setLibroAEliminar(evento)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ListaLibros;