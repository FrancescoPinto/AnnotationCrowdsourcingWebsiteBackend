package awt.server.service;


import awt.server.dto.LoginDetailsDTO;
import awt.server.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public class LoginService {

    private ProfileService profileService;

    @SuppressWarnings("unused")
    public LoginService() {
        this(null);
    }

    @Autowired
    public LoginService(ProfileService profileService) {
        this.profileService = profileService;
    }

    public User login(LoginDetailsDTO credentials) {
        User temp =  profileService.get(credentials.getUsername());
        if(temp.getPassword().equals(credentials.getPassword()))
            return temp;
        else
            return null; 
    }
    
    //NEL LOGOUT ANNULLA LE TASK WORKING SESSION APERTE DALL'UTENTE!!
}
