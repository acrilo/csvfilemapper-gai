const {
    FileIsEmptyError,
    FileHasBlankLinesError,
    FileShouldHasMinimumTwoRecordsError,
    HeadersEmptyFoundError,
    HeaderSignatureNoMatchError,
    BodyLinesSizeInconsistentError
} = require('./errors');

const sanitizeCsvFile = (csvFile) => csvFile.replace(/["'\r]+/g, '').trim();

const checkEmptyFile = (file) => {
    if(file.length === 0) {
        throw new FileIsEmptyError('File is empty');
    }
}

const checkBlankLines = (allLines) => {
    let blankLines = [];
    allLines.forEach((line, index) => {
        if(line.length === 0) {
            blankLines.push(index + 1);
        }
    });
    if(blankLines.length > 0){
        throw new FileHasBlankLinesError(
            `Blank lines in position: ${JSON.stringify(blankLines)}`
        );
    }
}

const checkAtLeastOneRecord = (allLines) => {
    if(allLines.length < 2){
        throw new FileShouldHasMinimumTwoRecordsError(
            `File should has minimum two records, one header record and one body record`
        );
    }
}

const buildFileHeaders = (firstLine, columnSeparator) => {
    let headersEmpty = [];
    const headers = firstLine.split(columnSeparator)
        .map((header, index) => {
            if(header.trim().length === 0){
                headersEmpty.push(index + 1);
            }
            return header.trim();
        });
    if(headersEmpty > 0){
        throw new HeadersEmptyFoundError(
            `Headers empty in position: ${JSON.stringify(headersEmpty)}`
        );
    }
    return headers;
}

const checkHeaderSignature = (headers, headerSignature) => {
    const join = [...new Set([...headerSignature, ...headers])];
    const match = join.length === headerSignature.length 
            && headers.length === headerSignature.length;
    if(!match){
        const headerStringfy = JSON.stringify(headers);
        const headerSignatureStringfy = JSON.stringify(headerSignature); 
        throw new HeaderSignatureNoMatchError(
            `${headerStringfy} no match with ${headerSignatureStringfy}`
        );
    }
}

const buildFileBody = (bodyLines, headers, columnSeparator) => {
    let bodyLinesEmpty = [];
    let body = [];
    bodyLines.forEach((bodyLine, index) => {
        const columns = bodyLine.split(columnSeparator);
        if(columns.length !== headers.length){
            bodyLinesEmpty.push(index + 1);
        }
        let item = {};
        columns.forEach((column, index) => {
            item[headers[index]] = column.trim();
        });
        body.push(item);
    });
    if(bodyLinesEmpty.length > 0){
        throw new BodyLinesSizeInconsistentError(
            `Inconsistent size lines: ${JSON.stringify(bodyLinesEmpty)}`
        );
    }
    return body;
}

const buildReport = (headers, body) => {
    return {
        headers,
        body,
        bodySize: body.length
    }
}

module.exports = {
    sanitizeCsvFile,
    checkEmptyFile,
    checkBlankLines,
    checkAtLeastOneRecord,
    buildFileHeaders,
    checkHeaderSignature,
    buildFileBody,
    buildReport
}
