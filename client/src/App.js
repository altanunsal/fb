import { Form } from "./Components/Form/Form";
import { Header } from "./Components/Header/Header";
import { SocketContext, socket } from "./Contexts/Socket";

export function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Header />
      <Form />
    </SocketContext.Provider>
  );
}
