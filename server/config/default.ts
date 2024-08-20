export default {
  port: 1337,
  dbUri: "mongodb://localhost:27017/rest-api-tutorial",
  origin: "http://localhost:3000",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
};
