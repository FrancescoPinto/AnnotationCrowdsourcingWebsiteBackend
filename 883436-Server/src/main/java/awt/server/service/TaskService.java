/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package awt.server.service;

import awt.server.dto.TaskDTO;
import awt.server.dto.TaskInfosDTO;
import awt.server.model.User;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author Utente
 */
@Service
@Transactional
public interface TaskService {
    List<TaskDTO> getTasks(User u);
    TaskInfosDTO getTaskInfo(User user,Long taskId);
}
