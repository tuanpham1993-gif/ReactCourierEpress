import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");

    if (!stored || stored === "undefined") return null;

    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  });

  return( <AppRoutes user={user} />
    
  );
}

export default App;