/**
 * This file was generated by the Jeddict
 */
package awt.server.model;

import awt.server.dto.RegistrationDetailsDTO;
import javax.persistence.Basic;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import static javax.persistence.InheritanceType.SINGLE_TABLE;
import javax.persistence.MappedSuperclass;

/**
 * @author Utente
 */
@Inheritance(strategy=SINGLE_TABLE)
@DiscriminatorColumn(name = "Discr")
@MappedSuperclass
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Basic
    private String fullname;

    @Basic
    private String username;
    
    @Basic
    private String password;

    public User() {
    }
    
     
    
    public User(RegistrationDetailsDTO dto){
        this.fullname = dto.getFullname();
        this.username = dto.getUsername();
        this.password = dto.getPassword();
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullname() {
        return this.fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    //@TODO per ora elimina sofisticazione di Login con tutti quei dati (vedi codice commentato sotto)
}
/*
  String username;
    String password;
    String salt;
    String md5;
    String sha1;
    String sha256;

    public Login(String username, String password, String salt, String md5, String sha1, String sha256) {
        this.username = username;
        this.password = password;
        this.salt = salt;
        this.md5 = md5;
        this.sha1 = sha1;
        this.sha256 = sha256;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getMd5() {
        return md5;
    }

    public void setMd5(String md5) {
        this.md5 = md5;
    }

    public String getSha1() {
        return sha1;
    }

    public void setSha1(String sha1) {
        this.sha1 = sha1;
    }

    public String getSha256() {
        return sha256;
    }

    public void setSha256(String sha256) {
        this.sha256 = sha256;
    }
    
*/