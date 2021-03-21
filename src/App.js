import logo from './logo.svg';
import './App.css';
import { 
  LoginButton,
  LogoutButton,
  Text,
  useSession,
  CombinedDataProvider 
} from '@inrupt/solid-ui-react';
import { useState } from 'react';

const authOptions = {
  clientName: 'Lista de Tareas - Solid'
};

function App() {
  const { session } = useSession();
  const [oidcIssuer, setOidcIssuer] = useState("");
  const handleChange = (event) => {
    setOidcIssuer(event.target.value);
  };

  return (
    <div>
      {session.info.isLoggedIn ? (
        <CombinedDataProvider 
          datasetUrl={session.info.webId}
          thingUrl={session.info.webId}
        >
          <div>
            <span>Iniciaste sesión como: </span>
            <Text 
              properties={[
              "http://www.w3.org/2006/vcard/ns#fn",
              "http://xmlns.com/foaf/0.1/name",]}
            />
            <LogoutButton />
          </div>
        </CombinedDataProvider>
      ) : 
      (
      <div>
        <span>
          Inicia Sesión con:
          <input 
            className="oidc-issuer-input"
            type="text"
            name="oidcIssuer"
            list="providers"
            value={oidcIssuer}
            onChange={handleChange}
          />
          <datalist id="providers">
            <option value="https://broker.pod.inrupt.com/" />
            <option value="https://inrupt.net/" />
          </datalist>
        </span>
        <LoginButton 
          oidcIssuer={oidcIssuer}
          redirectUrl={window.location.href}
          authOptions={authOptions}
        />
      </div>
    )}
  </div>
  );
}

export default App;
