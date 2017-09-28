/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.model.User;
import awt.server.model.convenience.TaskInstance;
import java.io.IOException;
import java.net.URISyntaxException;
import org.springframework.stereotype.Service;

/**
 *
 * @author Utente
 */
@Service

public interface TaskInstanceService {
     public TaskInstance getNextTaskInstance(String APIToken, Long taskId) throws IOException, URISyntaxException;
    
    public void setCurrentInstanceResult(String APIToken, Long taskId, String skyline) throws IOException, URISyntaxException;
    public void setCurrentInstanceResult(String APIToken, Long taskId, Boolean accepted) throws IOException, URISyntaxException;
}
