# `CSVFileMapper`

CSVFileMapper es una utilidad que permite mapear el contenido de un fichero `CSV` a formato `JSON`

## `Uso`

Instalación del paquete
`npm i csvfilemapper-gai`

Código de ejemplo
```js
import { ConversionSetup, convert } from 'csvfilemapper-gai';

const separator = ',';
const setup = new ConversionSetup(separator);
const headersSignature = ['name','surname'];
const csvFileContent = 'name,surname\nAndrés,Acrilo';
const conversion = convert(setup, csvFileContent, headersSignature);
```

El parametro `headersSignature` permite validar que los encabezados del fichero, sean los esperados.

Resultado de la conversión
```js
{
    headers: ['name','surname'],
    body: [
        {
            name: 'Andrés',
            surname: 'Acrilo'
        }
    ],
    bodySize: 1
}
```
Lista de errores
| Error                                  | Descripción              |
| -------------------------------------- | ------------------------ |
| `FileIsEmptyError`                     | El contenido del fichero está vacio |
| `FileHasBlankLinesError`               | El fichero tiene líneas vacias |
| `FileShouldHasMinimumTwoRecordsError`  | El fichero debe tener como minimo dos filas, el encabezado y un registro en el cuerpo |
| `HeadersEmptyFoundError`               | Uno de los encabezados está vacio |
| `HeaderSignatureNoMatchError`          | Los encabezados del fichero no coinciden con la firma suministrada |
| `BodyLinesSizeInconsistentError`       | Todas las filas deben tener la misma cantidad de columnas |