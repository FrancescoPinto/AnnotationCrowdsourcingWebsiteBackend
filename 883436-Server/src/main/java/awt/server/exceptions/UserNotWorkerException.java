/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.exceptions;

import static java.lang.String.format;

/**
 *
 * @author Utente
 */
public class UserNotWorkerException extends RuntimeException {
    public UserNotWorkerException() {
        super("The user is not a worker");
    }
}