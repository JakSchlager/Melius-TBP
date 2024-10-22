package at.melius.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Set;

@NamedQuery(name = Profile.QUERY_FIND_ALL, query = "SELECT p from Profile p")

@Entity
public class Profile {
    public static final String QUERY_FIND_ALL = "Profile.findAll";

    @Id
    @GeneratedValue
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "password")
    private String password;

    @Column(name = "githubUser")
    private String githubUser;

    @ManyToMany
    @JoinTable(
            name="profile_characteristic",
            joinColumns = @JoinColumn(name="profile_id"),
            inverseJoinColumns = @JoinColumn(name="characteristic_id")
    )
    @JsonIgnoreProperties({"profiles"})
    private Set<Characteristic> characteristics;

    public int getId() {
        return id;
    }

    public String getGithubUser() {
        return githubUser;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getPassword() {
        return password;
    }

    public Set<Characteristic> getCharacteristics() {
        return characteristics;
    }

    public void setCharacteristics(Set<Characteristic> characteristics) {
        this.characteristics = characteristics;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setGithubUser(String githubUser) {
        this.githubUser = githubUser;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
