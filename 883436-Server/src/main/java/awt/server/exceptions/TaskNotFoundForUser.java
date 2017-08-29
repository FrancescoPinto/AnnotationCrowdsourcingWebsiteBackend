/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.exceptions;

/**
 *
 * @author Utente
 */

import static java.lang.String.format;

public class TaskNotFoundForUser extends RuntimeException {
    public TaskNotFoundForUser() {
        super("Task is not defined for this user");
    }
}
