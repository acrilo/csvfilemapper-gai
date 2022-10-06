const { 
    sanitizeCsvFile,
    checkEmptyFile,
    checkBlankLines,
    checkAtLeastOneRecord,
    buildFileHeaders,
    checkHeaderSignature,
    buildFileBody,
    buildReport 
} = require('./functions');

class ConversionSetup {
    constructor(columnSeparator) {
        this.columnSeparator = columnSeparator;
    }
}

const convert = (setup, csvFile, headerSignature) => {
    const columnSeparator = setup.columnSeparator;
    const file = sanitizeCsvFile(csvFile);
    checkEmptyFile(file);
    const allLines = file.split('\n').map(line => line.trim());
    checkBlankLines(allLines);
    checkAtLeastOneRecord(allLines);
    const headers = buildFileHeaders(allLines[0], columnSeparator);
    checkHeaderSignature(headers, headerSignature);
    const bodyLines = allLines.splice(1, allLines.length - 1);
    const body = buildFileBody(bodyLines, headers, columnSeparator);
    return buildReport(headers, body);
}

module.exports = {
    ConversionSetup,
    convert
}