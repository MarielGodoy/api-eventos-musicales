import { Routes, Route } from "react-router-dom";
import BarraNavegacion from "./components/BarraNavegacion";
import PaginaInicio from "./pages/PaginaInicio";
import PaginaLibros from "./pages/PaginaEventos"; // O puedes dejarlo así mientras renderiza tus eventos musicales

function App() {
  return (
    <>
      <BarraNavegacion />
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/eventos" element={<PaginaLibros />} />
      </Routes>
    </>
  );
}

export default App;