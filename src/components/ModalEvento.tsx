import { Modal, Button, Form } from "react-bootstrap";
import type { Recurso, RecursoFormulario } from "../types/Recurso";

interface ModalEventoProps {
  mostrar: boolean;
  libro: Recurso | null;
  onCerrar: () => void;
  onGuardar: (datosForm: RecursoFormulario) => void;
}

const ModalEvento = ({
  mostrar,
  libro,
  onCerrar,
  onGuardar,
}: ModalEventoProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onGuardar({
      nombre: formData.get("nombre") as string,
      descripcion: formData.get("descripcion") as string,
      fecha: formData.get("fecha") as string,
      lugar: formData.get("lugar") as string,
      capacidadMaxima: Number(formData.get("capacidadMaxima")),
      entradasDisponibles: Number(formData.get("entradasDisponibles")),
    } as RecursoFormulario);
  };

  return (
    <Modal show={mostrar} onHide={onCerrar} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{libro ? "Editar evento" : "Agregar evento"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del evento</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              defaultValue={libro?.nombre || ""}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="descripcion"
              defaultValue={libro?.descripcion || ""}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              defaultValue={libro?.fecha ? libro.fecha.split("T")[0] : ""}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lugar</Form.Label>
            <Form.Control
              type="text"
              name="lugar"
              defaultValue={libro?.lugar || ""}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Capacidad Máxima</Form.Label>
            <Form.Control
              type="number"
              name="capacidadMaxima"
              defaultValue={libro?.capacidadMaxima ?? 50}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Entradas Disponibles</Form.Label>
            <Form.Control
              type="number"
              name="entradasDisponibles"
              defaultValue={libro?.entradasDisponibles ?? 50}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCerrar}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalEvento;