import logo from './logo.svg';
import './App.css';
import ContactTable from './ContactList'
import ContactTableRedesign from './ContactList redesign';
function App() {
  return (
    <div className="App container">
      <h1>My Address Book</h1>
      {/* <ContactTable /> */}
      <ContactTableRedesign />
    </div>
  );
}

export default App;
