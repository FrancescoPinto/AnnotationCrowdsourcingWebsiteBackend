

import awt.server.model.User;
import awt.server.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;



public class ProfileServiceImpl implements ProfileService{
    
    @Autowired
    UserRepository userRepository;
    
    /*private final List<User> profiles;

    private final Path PROFILES_FILE = Paths.get(this.getClass().getResource("/profiles.json").toURI());

    public ProfileServiceImpl() throws IOException, URISyntaxException {
        ObjectMapper objectMapper = new ObjectMapper();
        profiles = objectMapper.readValue(PROFILES_FILE.toFile(), new TypeReference<List<User>>() {
        });
    }*/

    public User get(String username) {
        return userRepository.findByUsername(username);
    }

    /*public Optional<User> minimal(String username) {
        return get(username).map(profile -> new MinimalProfile(profile));
    }*/

}
