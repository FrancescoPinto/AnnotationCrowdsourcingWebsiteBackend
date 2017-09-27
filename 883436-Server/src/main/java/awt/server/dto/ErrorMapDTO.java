/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.dto;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonRootName;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Utente
 */

public class ErrorMapDTO {
    
     private Map<String,String> error;

       public ErrorMapDTO(Map<String,String> error) {
           this.error = error;
       }
       public ErrorMapDTO(){
           this.error = new HashMap<String,String>();
       }

       //@JsonAnyGetter
       public Map<String,String>  getError() {
           return error;
       }

       public void setError(Map<String,String> error) {
           this.error = error;
       }

       public void addError(String name, String  error){
           this.error.put(name,error);
       }
    /*private ErrorDescription error;

    public ErrorMapDTO(ErrorDescription error) {
        this.error = error;
    }
    public ErrorMapDTO(){
        this.error = new ErrorDescription();
    }

    //@JsonAnyGetter
    public ErrorDescription getError() {
        return error;
    }

    public void setError(ErrorDescription error) {
        this.error = error;
    }
    
    public void addError(String name, String  error){
        this.error.addError(name,error);
    }
    
    public class ErrorDescription{
    
        private Map<String,String> error;

       public ErrorDescription(Map<String,String> error) {
           this.error = error;
       }
       public ErrorDescription(){
           this.error = new HashMap<String,String>();
       }

       //@JsonAnyGetter
       public Map<String,String>  getError() {
           return error;
       }

       public void setError(Map<String,String> error) {
           this.error = error;
       }

       public void addError(String name, String  error){
           this.error.put(name,error);
       }
    }*/
}

/*
    private String name, message;

    public ErrorDescription(String name, String message) {
        this.name = name;
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }*/
    
