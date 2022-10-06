const errorType = 'CsvToJsonErrorType';

class FileIsEmptyError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FileIsEmptyError';
        this.type = errorType;
    }
}

class FileHasBlankLinesError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FileHasBlankLinesError';
        this.type = errorType;
    }
}

class FileShouldHasMinimumTwoRecordsError extends Error {
    constructor(message) {
        super(message);
        this.name = 'FileSholudHasMinimumTwoRecordsError';
        this.type = errorType;
    }
}

class HeadersEmptyFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'HeadersEmptyFoundError';
        this.type = errorType;
    }
}

class HeaderSignatureNoMatchError extends Error {
    constructor(message) {
        super(message);
        this.name = 'HeaderSignatureNoMatchError';
        this.type = errorType;
    }
}

class BodyLinesSizeInconsistentError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BodyLinesSizeInconsistentError';
        this.type = errorType;
    }
}

module.exports = {
    FileIsEmptyError,
    FileHasBlankLinesError,
    FileShouldHasMinimumTwoRecordsError,
    HeadersEmptyFoundError,
    HeaderSignatureNoMatchError,
    BodyLinesSizeInconsistentError
}