import { useRef, useState } from "react";
import "./App.css";
import providers from "./providers.json";

function App() {
  // par défault on affiche les 3 principaux prestataires
  const [displayedProviders, setDisplayedProviders] = useState(
    providers.slice(0, 3)
  );
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef();

  const handleChange = (e) => {
    setInputValue(e.target.value);

    if (!e.target.value.includes("@")) {
      // tant qu'il n'y a pas d'@, on affiche les 3 prestataires par défaut
      setDisplayedProviders(providers.slice(0, 3));
    } else if (e.target.value.toLowerCase().match(emailRegex)) {
      // si une adresse mail correcte est saisie, on n'affiche pas de prestataire
      setDisplayedProviders([]);
    } else if (e.target.value.includes("@")) {
      // s'il y a un @, on cherche les prestaires qui correspondent au mieux (3 max)
      const bestMatches = getBestMatches(e.target.value.split("@", 2)[1]);
      if (bestMatches.length > 0) {
        setDisplayedProviders(bestMatches);
      } else {
        // si aucun prestataire ne correspond à la saisie, on affiche les 3 par défaut
        setDisplayedProviders(providers.slice(0, 3));
      }
    }
  };

  const getBestMatches = (value) => {
    let bestMatches = [];
    if (value !== "") {
      // si quelque chose est saisi après l'@, on recherche les meilleures correspondances
      providers.forEach((provider) => {
        if (provider.includes(value) && bestMatches.length < 3) {
          bestMatches.push(provider);
        }
      });
    }
    return bestMatches;
  };

  const handleClick = (e) => {
    // concatenation de la saisie jusqu'à l'@, et du prestataire
    const completedInput =
      inputValue.substring(0, inputValue.indexOf("@") + 1) + e.target.innerHTML;
    setInputValue(completedInput);
    // on garde le focus sur l'input
    inputRef.current.focus();
  };

  return (
    <div className="App">
      <h1>Frontend Junior</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        ref={inputRef}
      />
      {displayedProviders.map((provider) => (
        <p key={provider} onClick={handleClick}>
          {provider}
        </p>
      ))}
    </div>
  );
}

export default App;

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
