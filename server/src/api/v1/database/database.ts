import { DBConfig } from "../../../config/config";

export const dbConnection = {
    url: `mongodb+srv://${DBConfig.user}:${DBConfig.password}@${DBConfig.cluster}.mongodb.net/${DBConfig.database}?retryWrites=true&w=majority`,
    options: {}
};