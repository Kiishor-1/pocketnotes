import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Main from './pages/Main';
import UserChat from './components/UserChat/UserChat';
import { Toaster } from 'react-hot-toast';
// import OTPLogin from './components/Auth/OTPLogin';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Home from './pages/Home';

function App() {
  return (
    <Provider store={store}>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/main" element={<Main />}>
              <Route path="/main/groups/:groupId/chat" element={<UserChat />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;


