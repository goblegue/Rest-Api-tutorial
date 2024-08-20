import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connect() {
    const dbUri = config.get<string>("dbUri");
    try{ mongoose.set('strictQuery', false)
        await mongoose.connect(dbUri);
        logger.info("Connected to database");
    }catch(error){
        logger.error("could not connect to database", error);
        process.exit(1);
    };
}
export default connect;
