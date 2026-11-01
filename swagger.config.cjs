const { generateApi } = require("swagger-typescript-api");
const path = require("path");

const apiUrl = process.env.NG_APP_API_URL;

if (!apiUrl) {
  console.error("ОШИБКА: NG_APP_API_URL не найден в .env");
  process.exit(1);
}

generateApi({
  url: `${apiUrl}/swagger/v1/swagger.json`,
  output: path.resolve(__dirname, "./src/api/models"),
  generateClient: false,
  modular: true,
  singleHttpClient: false,
  extractRequestParams: true,
  extractRequestBody: true,
  extractEnums: true,
  generateUnionEnums: true,
  typePrefix: "",
  typeSuffix: "",
  toJS: false,
});
