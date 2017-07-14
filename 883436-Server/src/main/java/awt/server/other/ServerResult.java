/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.other;

/**
 *
 * @author Utente
 */
public enum ServerResult {
    
    NEW_USER_SUCCESS(0,"New user creation succeded"),
    
    NEW_USER_FAIL(1000,"New user creation failed");
    
    private int code;
    private String description;

    private ServerResult(int code, String description){
        this.code = code;
        this.description = description;
    }
}
