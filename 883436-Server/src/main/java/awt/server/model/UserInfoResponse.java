/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.model;

/**
 *
 * @author Utente
 */
public class UserInfoResponse {
    private String fullname;
    private String username;
    private String type;

    public UserInfoResponse() {
    }

    public UserInfoResponse(String fullname, String username, String type) {
        this.fullname = fullname;
        this.username = username;
        this.type = type;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
}
