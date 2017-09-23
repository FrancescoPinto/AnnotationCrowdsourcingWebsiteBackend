package awt.server.service.auth;

import awt.server.model.User;
import awt.server.respository.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


@Component
@Transactional
public class ProfileService {
    
    @Autowired
    UserRepository userRepository;
    
    /*private final List<User> profiles;

    private final Path PROFILES_FILE = Paths.get(this.getClass().getResource("/profiles.json").toURI());

    public ProfileService() throws IOException, URISyntaxException {
        ObjectMapper objectMapper = new ObjectMapper();
        profiles = objectMapper.readValue(PROFILES_FILE.toFile(), new TypeReference<List<User>>() {
        });
    }*/

    protected User get(String username) {
        return userRepository.findByUsername(username);
    }

    /*public Optional<User> minimal(String username) {
        return get(username).map(profile -> new MinimalProfile(profile));
    }*/

}
