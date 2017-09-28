package awt.server.service.auth;



import awt.server.auth.SecretKeyProvider;
import awt.server.auth.SecretKeyProviderImpl;
import awt.server.model.User;
import awt.server.respository.InvalidTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.io.IOException;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import static java.time.ZoneOffset.UTC;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(propagation=Propagation.REQUIRED)
public class JwtServiceImpl implements JwtService {
    private static final String ISSUER = "in.sdqali.jwt";
    public static final String USERNAME = "username";
    @Autowired
    private SecretKeyProvider secretKeyProvider;
    
    @Autowired
    private ProfileService profileService;

    @Autowired
    InvalidTokenRepository invalidTokenRepository;
 
    /*
    @SuppressWarnings("unused")
    public JwtServiceImpl() {
        this(null, null);
    }

    @Autowired
    public JwtServiceImpl(SecretKeyProvider secretKeyProvider, ProfileService profileService) {
        this.secretKeyProvider = secretKeyProvider;
        this.profileService = profileService;
    }*/

    @Override
    public String tokenFor(User user) throws IOException, URISyntaxException {
        byte[] secretKey = secretKeyProvider.getKey();
        Date expiration = Date.from(LocalDateTime.now(UTC).plusHours(5).toInstant(UTC));
        String token =  Jwts.builder()
                .setSubject(user.getUsername())
                .setExpiration(expiration)
                .setIssuer(ISSUER)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
        
        return token;
    }
    
    @Override
    public User verify(String token) throws IOException, URISyntaxException {
        if(invalidTokenRepository.isTokenInvalid(token))
            return null;
        byte[] secretKey = secretKeyProvider.getKey();
        Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
        return profileService.get(claims.getBody().getSubject().toString());
    }
    @Override
    public void logoutToken(String token, String username) {
        //final Date createdDate = timeProvider.now();
       // final Date expirationDate = calculateExpirationDate(createdDate);

       invalidTokenRepository.logoutToken(token, username);
       /* byte[] secret = new byte[20];
        new Random().nextBytes(secret);
        
        Date expiration = Date.from(LocalDateTime.now(UTC).plusHours(1).toInstant(UTC));
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setExpiration(expiration)
                .setIssuer(ISSUER)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();*/
        /*
        final Claims claims = getAllClaimsFromToken(token);
        claims.setIssuedAt(createdDate);
        claims.setExpiration(expirationDate);

        return Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();*/
    }
    /*public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }
    
    private Date calculateExpirationDate(Date createdDate) {
        return new Date(createdDate.getTime() + expiration * 1000);
    }*/
}
