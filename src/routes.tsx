import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

import Home from './pages/Home'
import NewRoom from './pages/NewRoom'
import { Room, AdminRoom } from './pages/Room'


function Routes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route path="/" exact component={ Home } />
                    <Route path="/rooms/new" exact component={ NewRoom } />
                    <Route path="/rooms/:id" component={ Room } />
                    <Route path="/admin/rooms/:id" component={ AdminRoom } />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default Routes
