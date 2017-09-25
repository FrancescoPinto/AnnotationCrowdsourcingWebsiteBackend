package awt.server.exceptions;

import static java.lang.String.format;

public class FailedToLoginException extends RuntimeException {
    public FailedToLoginException(String error) {
        super(error);
    }
}
