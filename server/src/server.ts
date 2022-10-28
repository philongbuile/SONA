import App from './app';
import AppRoutes from './api/v1/routes/app.routes';
import AuthRoutes from './api/v1/routes/auth.routes';
import UserRoutes from './api/v1/routes/user.routes';
class Server {
    private app: App;
    
    constructor() {
        this.app = new App([
            new AppRoutes(),
            new AuthRoutes(),
            new UserRoutes()
        ]);
    }
    
    public start(): void {
        this.app.app.listen(this.app.port, () => {
        console.log(`Server listening on port ${this.app.port}`);
        });
    }
}

const server = new Server();
server.start();
